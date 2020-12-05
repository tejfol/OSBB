const express = require('express')
const SliderImages = require('../models/sliderImages')
const router = express.Router()
const createStorage  = require('../middleware/storageMiddleware')

const storageMiddleware = createStorage('')

router.get('/', async(req, res) => {
    const data = await SliderImages.find({});
    res.render('sliderImages/index', {sliders: data});
})

router.get('/new', (req, res) => {
    res.render('sliderImages/new', {sliders: new SliderImages()})
})

router.post('/', storageMiddleware, async (req, res) => {
    let myfiles = []
    req.files.forEach(file => {
        console.log(file.path);
        myfiles.push(file.path)
    });


    const data = await new SliderImages({
        title: req.body.title,
        subscription: req.body.subscription,
        imgPath: myfiles
    })
    const newSliderShow = await data.save();

    res.render('sliderImages/index')
})

module.exports = router
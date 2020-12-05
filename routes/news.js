const express = require('express')
const SliderImages = require('../models/news')
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
    try {
        const newSliderShow = await data.save();
        res.redirect('sliderimages')
    } catch (error) {
        console.log(error);
        res.render('sliderImages/new', {
            sliders: data,
            errorMessage: 'Error creating sliderShow'
        })
    }
})

router.get('/:id', async (req, res) => {
    const data = await SliderImages.findById(req.params.id)
   res.render('sliderImages/show', {slider: data})
})

router.get('/:id/del', async(req,res) => {
    const data = await SliderImages.findById(req.params.id)
    await data.remove()
    res.redirect('/sliderimages')
})

module.exports = router
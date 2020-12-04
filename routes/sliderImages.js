const express = require('express')
const SliderImages = require('../models/sliderImages')
const router = express.Router()

router.get('/', async(req, res) => {
    const data = await SliderImages.find({});
    res.render('sliderImages/index', {sliders: data});
})

router.get('/new', (req, res) => {
    res.render('sliderImages/new', {sliders: new SliderImages()})
})

router.post('/', async (req, res) => {
    
})

module.exports = router
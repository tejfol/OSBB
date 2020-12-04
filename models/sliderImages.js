const mongoose = require('mongoose')

const SliderImagesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subscription: [{
        type: String,
    }],
    imgPath: [{
        type: String,
        required: true
    }],
    
});

module.exports = mongoose.model('SliderImages', SliderImagesSchema)
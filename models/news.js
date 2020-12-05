const mongoose = require('mongoose')

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subscription: {
        type: String,
    },
    imgPath: [String],
    
});

const News = mongoose.model('News', newsSchema)

module.exports = News;
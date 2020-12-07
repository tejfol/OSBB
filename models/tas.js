const mongoose = require('mongoose')

const tasSchema = new mongoose.Schema({
    tas: {
        type: String
    }
})

let Tas = mongoose.model('Tas', tasSchema)

module.exports = Tas;
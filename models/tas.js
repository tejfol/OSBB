const mongoose = require('mongoose')

const tasSchema = new mongoose.Schema({
    name: {
        type: String
    },
    cost: {
        type: String
    }
})

let Tas = mongoose.model('Tas', tasSchema)

module.exports = Tas;
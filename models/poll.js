const mongoose = require('mongoose')

const pollSchema = new mongoose.Schema({
    name: {
        type: String
    },
    subject: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    votingOpions: [{
        option: {
            type: String
        }
    }]
})

let Poll = mongoose.model('Poll', pollSchema)

module.exports = Poll;
const mongoose = require('mongoose')

const announcementsSchema = new mongoose.Schema({
    title:{type: String},
    text:{type: String},
    date:{type: Date, default: Date.now}
})

let Announcements = mongoose.model('Announcements', announcementsSchema)

module.exports = Announcements;
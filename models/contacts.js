const mongoose = require('mongoose')

const contactsSchema = new mongoose.Schema({
    titul:{type: String},
    name:{type: String},
    phoneNumber:{type: String}
})

let Contacts = mongoose.model('Contacts', contactsSchema)

module.exports = Contacts;
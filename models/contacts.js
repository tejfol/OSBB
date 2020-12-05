const mongoose = require('mongoose')

const contactsSchema = new mongoose.Schema({
    titul:{String},
    name:{String},
    phoneNumber:{String}
})

let Contacts = mongoose.model('Contacts', contactsSchema)

module.exports = {Contacts, contactsSchema};
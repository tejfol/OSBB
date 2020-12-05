const mongoose = require('mongoose')

const apartmentSchema = new mongoose.Schema({
    owner:{String},
    accountNumber:{Number},
    area:{String},
    adress:{String},
    phoneNumber:{String},
    services:[String],
    residents:[String]
})

let Apartment = mongoose.model('Apartment', apartmentSchema)

module.exports = Apartment;
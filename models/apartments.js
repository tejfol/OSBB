const mongoose = require('mongoose')

const apartmentSchema = new mongoose.Schema({
    owner:{type:String},
    accountNumber:{type:Number},
    area:{type:String},
    adress:{type:String},
    phoneNumber:{type:String},
    services:[String],
    residents:[String]
})

let Apartment = mongoose.model('Apartment', apartmentSchema)

module.exports = Apartment;
const mongoose = require('mongoose')

const apartmentSchema = new mongoose.Schema({
    owner:{type:String},
    accountNumber:{type:String},
    area:{type:String},
    adress:{type:String},
    benefits:[String],
    phoneNumber:{type:String},
    services:[String],
    residents:[{type: mongoose.Schema.Types.ObjectId,
        ref: 'residents'}]
})

let Apartments = mongoose.model('Apartments', apartmentSchema)

module.exports = Apartments;
const mongoose = require('mongoose');

const osbbSchema = new mongoose.Schema({
    osbbname:{type:String},
    adress:{type:String},
    edrpoy:{type:String},
    bank:{type:String},
    mfo:{type:String},
    accountnumber:{type:String},
    iban:{type:String},
    apartments:{type:Number}
});

let Osbb = mongoose.model('Osbb', osbbSchema)

module.exports = Osbb;
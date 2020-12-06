const mongoose = require('mongoose');

const osbbSchema = new mongoose.Schema({
    osbbname:{type:String},
    adress:{type:String},
    edrpoy:{type:Number},
    bank:{type:String},
    mfo:{type:Number},
    accountnumber:{type:Number},
    iban:{type:String},
    apartments:{type:Number}
});

let Osbb = mongoose.model('Osbb', osbbSchema)

module.exports = Osbb;
const mongoose = require('mongoose');

const osbbSchema = new mongoose.Schema({
    name:{String},
    adress:{String},
    edrpoy:{Number},
    bank:{String},
    mfo:{Number},
    accountnumber:{Number},
    iban:{String},
    apartments:{Number}
});

let OSBB = mongoose.model('OSBB', osbbSchema)

module.exports = OSBB;
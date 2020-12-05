const mongoose = require('mongoose')
const bcrypt = require("bcryptjs");

const residentsSchema = new mongoose.Schema({
    pib: {
        type: String,
        require: true
    },
    birthday: {
        type: Date,
        required: true
    },
    idc:{type:Number},
    birthPlace: {
        type: String
    },
    imgPath: [{
        type: String
    }],
    phoneNumber: {
        type: String
    },
    role: {
        type: String,
        enum: ['Админ', 'Житель', 'Бухалтер']
    },
    password:{type:String}
});

// let passHash = generatePasswordHash = (password) => {
//     const saltRounds = 10;
//     var salt = bcrypt.genSaltSync(saltRounds);
//     var hash = bcrypt.hashSync(password, salt);
//     return hash;
// };

// let passValidation = validatePassword = (password, hashedPassword) => {
//     let res = bcrypt.compareSync(password, hashedPassword);
//     return res;
// };

let Residents = mongoose.model('Resident', residentsSchema)

module.exports = Residents;
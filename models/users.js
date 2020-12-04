const mongoose = require('mongoose')
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        required: true
    },
    number: {
        type: String,
        require: true
    },
    password: {
        type: String,
        required: true
    },
    owner: {
        type: String
    },
    receplents: [String],
    bill: {
        type: Number
    },
    area: {
        type: String,
        required: true
    },
    adress: {
        type: String,
        required: true
    },
    benefits: {
        type: String
    },
    role: {
        type: String,
        enum: ['Админ', 'Житель', 'Бухалтер'],
        required: true
    },
    imgPath: [{
        type: String,
        required: true
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

let passHash = generatePasswordHash = (password) => {
    const saltRounds = 10;
    var salt = bcrypt.genSaltSync(saltRounds);
    var hash = bcrypt.hashSync(password, salt);
    return hash;
};

let passValidation = validatePassword = (password, hashedPassword) => {
    let res = bcrypt.compareSync(password, hashedPassword);
    return res;
};

let Users = mongoose.model('Users', userSchema)

module.exports = {Users, passHash, passValidation};
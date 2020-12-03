const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        // require: true
    },
    email: {
        type: String,
        // required: true
    },
    number: {
        type: String,
        // require: true
    },
    encryptedPassword: {
        type: String,
        // required: true
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
        // required: true
    },
    adress: {
        type: String,
        // required: true
    },
    benefits: {
        type: String
    },
    role: {
        type: String,
        enum: ['Админ', 'Житель', 'Бухалтер'],
        // required: true
    },
    imgPath: [{
        type: String,
        // required: true
    }]
});

module.exports = mongoose.model('Users', userSchema)
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        required: true
    },
    number: {
        type: String,
        require: true
    },
    encryptedPassword: {
        type: String,
        required: true
    },
    owner: {
        type: String
    },
    receplents: [{
        Name: String
    }],
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
    profilePhotoLocation: {
        type: String
    },

})

module.exports = mongoose.model('Users', UserSchema)
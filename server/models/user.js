const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    profilePic: {
        required: true,
        type: String,
        trim: true
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User
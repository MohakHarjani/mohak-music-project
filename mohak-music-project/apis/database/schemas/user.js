const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 25
    },
    email: {
        type: String,
        required: true
    },
    isAdmin: {
        type : String,
    },
    playlist : {
        type : [{}]
    }
})
const UserModel = mongoose.model('User', userSchema)  
module.exports = {UserModel}

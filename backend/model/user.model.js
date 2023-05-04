const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const mongodb = require('../config/mongodb_connection');

const { Schema } = mongoose

// Schema is just a prototype of model
const userSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})

// perform before save() function of mongoDB
userSchema.pre('save', async function () {
    try {
        const user = this

        const salt = await bcrypt.genSalt(10)
        const hashpass = await bcrypt.hash(user.password, salt)

        user.password = hashpass
    } catch (error) {
        throw error
    }
})

// Here don't use arrow function
// user defined methods using schema
userSchema.methods.comparePassword = async function (userPassword) {
    try {
        const isPasswordsMatch = await bcrypt.compare(userPassword, this.password)
        // console.log(isPasswordsMatch);
        return isPasswordsMatch
    } catch (error) {
        throw error
    }
}


// Then we need to create the schema in our database as model
const userModel = mongodb.model('user', userSchema)

module.exports = userModel
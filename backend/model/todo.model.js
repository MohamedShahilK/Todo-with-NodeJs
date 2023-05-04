const mongodb = require('../config/mongodb_connection')
const mongoose = require('mongoose');

const userModel = require('./user.model')

const { Schema } = mongoose

const todoSchema = new Schema({

    userId: {
        type: Schema.Types.ObjectId,//Mention type as ObjectId
        ref: userModel.modelName, //Refering to UserModel
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
})

// connect schema to our database as model
const todoModel = mongodb.model('todo', todoSchema)

module.exports = todoModel
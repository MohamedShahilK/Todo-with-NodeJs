// Here, we use expressJS to create routing,middleware etc 

const express = require('express');
const body_parser = require('body-parser')
const cors = require("cors");

// Just for loading collection
// const userModel = require('./model/user.model')
// const todoModel = require('./model/todo.model')

const userRouter = require('./routes/user.route')
const todoRouter = require('./routes/todo.route')

const app = express();

app.use(cors());
// body_parser.json() is used to check whatever data that comes from our request body in our route

// Body Parser is a middleware of Node JS used to handle HTTP POST request. Body Parser can parse string based client request body into 
// JavaScript Object which we can use in our application.
// Basically  to convert data into JSON
app.use(body_parser.json())

app.use('/', userRouter)
app.use('/', todoRouter)

module.exports = app;

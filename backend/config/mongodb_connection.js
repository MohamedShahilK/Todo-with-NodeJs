const mongoose = require('mongoose')

// mongoose.connect("mongodb+srv://<username>:<password>@cluster0.eyhty.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

// mongoose.createConnection('mongodb://127.0.0.1:27017')
// const connection = mongoose.createConnection('mongodb://localhost:27017').on('open', () => {

// When we add database name at last of the url "todoDB".It will create or use a database when we start our application
const connection = mongoose.createConnection('mongodb://localhost:27017/todoDB').on('open', () => {
    console.log('MongoDB Connected');
}).on('error', () => {
    console.log('MongoDB Connected Error');
})
module.exports = connection
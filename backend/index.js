// Starting point of our node js application

const app = require('./app');
const db = require('./config/mongodb_connection')
const userModel = require('./model/user.model')

const port = 3000;

app.get('/', (req, res) => {
    res.send("Hello World!!!")
})

app.listen(port, () => {
    console.log('Server is listening on Port http://localhost:' + port);
})
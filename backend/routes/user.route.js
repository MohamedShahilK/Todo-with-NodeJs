const router = require('express').Router()

const userController = require('../controllers/user.controller')

router.post('/registration', userController.registerUser)
router.post('/login', userController.loginUser)

module.exports = router



// Define this api on app.js

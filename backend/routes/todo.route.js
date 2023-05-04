// we are going to create todo route that will be used by our front-end to add, delete or edit data in our database  

const router = require('express').Router()
const todoController = require('../controllers/todo.controller')

router.post('/createTodo', todoController.createNewTodo)

// router.post('/getUserTodoList', todoController.getUserTodo)
router.get('/getUserTodoList', todoController.getUserTodo)

router.post('/deleteTodo', todoController.deleteTodo)

module.exports = router 

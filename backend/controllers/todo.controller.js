// To fetch the data that is requested from user and give response to user

const todoServices = require('../services/todo.services')

exports.createNewTodo = async (req, res, next) => {
    try {
        const { userId, title, description } = req.body

        const todo = await todoServices.createTodo(userId, title, description)

        res.json({
            status: true,
            success: todo
        })

    } catch (error) {
        next(error) //show any error found in the block
    }
}

exports.getUserTodo = async (req, res, next) => {
    try {
        // Both are Ok
        const userId = req.query.userId
        // const { userId } = req.query

        // Only if we use Post request method instead of Get
        // const { userId } = req.body

        const todo = await todoServices.getTodoData(userId)

        res.json({
            status: true,
            success: todo
        })

    } catch (error) {
        next(error) //show any error found in the block
    }
}

exports.deleteTodo = async (req, res, next) => {
    try {
        
        const { docId } = req.body
        const deletedTodo = await todoServices.deleteTodo(docId)
        res.json({
            status: true,
            success: deletedTodo,
        })
        
    } catch (error) {
        next(error) //show any error found in the block
    }
}
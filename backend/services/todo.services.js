// To store or perform operation on data entered via flutter by user in our database

const todoModel = require('../model/todo.model')

class TodoServices {
    static async createTodo(userId, title, description) {
        const newTodo = new todoModel({ userId, title, description })
        return await newTodo.save()
    }
    static async getTodoData(userId) {
        const allTodo = todoModel.find({ userId })
        return allTodo
    }
    static async deleteTodo(docId) {
        const deletedTodo = todoModel.findOneAndRemove({  docId })
        return deletedTodo
    }
}

module.exports = TodoServices
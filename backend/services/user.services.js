const userModel = require('../model/user.model')

const jwt = require('jsonwebtoken')

class UserService {
    static async userRegistration(email, password) {
        try {
            const createUser = new userModel({ email, password })    //passing above email and pass
            return await createUser.save()
        } catch (error) {
            throw error
        }
    }

    static async userLogin(email) {
        try {
            return await userModel.findOne({ email })
        } catch (error) { 
            throw error
        }
    }

    static async generateToken(tokenData, secretKey, jwt_expire) {
        return jwt.sign(tokenData, secretKey, { expiresIn: jwt_expire })
    }
}

module.exports = UserService 
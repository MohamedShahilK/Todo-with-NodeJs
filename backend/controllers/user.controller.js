const UserService = require('../services/user.services')

// create function that handle request and response from the frontend
exports.registerUser = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const sucessResponse = await UserService.userRegistration(email, password)

        res.json({
            status: true,
            success: "User Registered Sucessfully"
        })
    } catch (error) {
        throw error
    }
}

exports.loginUser = async function (req, res, next) {
    try {
        const { email, password } = req.body

        const user = await UserService.userLogin(email)
        console.log(user)

        if (!user) {
            throw new Error('user doesn\'t exist');
        }
        const isPasswordsMatch = await user.comparePassword(password)

        if (isPasswordsMatch == false) {
            throw new Error('password invalid');
        }

        let tokenData = { _id: user._id, email: user.email, }

        const token = await UserService.generateToken(tokenData, "secretKey", '1h')

        res.status(200).json({
            status: true,
            token: token,
        })
    } catch (error) {
        throw error
    }
}
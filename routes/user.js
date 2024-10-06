const { Router } = require("express");
const { userModel } = require("../db");
const  jwt  = require("jsonwebtoken");
const {JWT_USER_PASSWORD} = require("../config")
const userRouter = Router()

userRouter.post('/signup', function (req, res) {
    const { email, password, firstName, lastName } = req.body;
    try {
        userModel.create({
            email,
            password,
            firstName,
            lastName
        })
    } catch (error) {
        console.error("error is", error)
    }


    res.json({
        message: "Signup succed"
    })
})

userRouter.post('/signin', async function (req, res) {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({
            email,
            password
        })

        if (user) {
            const token = jwt.sign({
                id: user._id
            }, JWT_USER_PASSWORD);

            res.json({
                token: token
            })
        }
    } catch (error) {
        res.status(403).json({
            message: "incorrect credentials"
        })
    }

    res.json({
        message: "you are signin"
    })
})

userRouter.get('/purchases', function (req, res) {
    res.json({
        message: "purchased courses"
    })
})

module.exports = {
    userRouter
}
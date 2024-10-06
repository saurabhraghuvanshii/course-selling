const { Router } = require('express')

const adminRouter = Router();
const { adminModel} = require("../db");
const jwt = require('jsonwebtoken')
const {JWT_ADMIN_PASSWORD} = require("../config")
  
adminRouter.post('/signup', function (req, res) {
    const { email, password, firstName, lastName } = req.body;
    try {
        adminModel.create({
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

adminRouter.post('/signin', async function (req, res) {
    const { email, password } = req.body;

    try {
        const admin = await adminModel.findOne({
            email,
            password
        })

        if (admin) {
            const token = jwt.sign({
                id: admin._id
            }, JWT_ADMIN_PASSWORD);

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

adminRouter.post('/', function (req, res) {
    res.json({
        message: "you are signup"
    })
})

adminRouter.post('/', function (req, res) {
    res.json({
        message: "you are signup"
    })
})

adminRouter.post('/bulk', function (req, res) {
    res.json({
        message: "you are signup"
    })
})

module.exports = {
    adminRouter
}
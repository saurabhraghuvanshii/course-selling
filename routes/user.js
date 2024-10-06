const { Router } = require("express");
const { userModel, purchaseModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");
const { userMiddleware } = require("../middleware/user");
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

userRouter.get('/purchases', userMiddleware, async function (req, res) {
    const userId = req.userId
    

    const purchases = await purchaseModel.find({
        userId
       
    })
     
    const  courseData = await courseModel.find({
        _id: {$in: purchases.map(x=> x.courseId)}
    })

    res.json({
        purchases,
        courseData
    })
})

module.exports = {
    userRouter
}
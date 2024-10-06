const { Router } = require('express')

const adminRouter = Router();
const { adminModel, courseModel } = require("../db");
const jwt = require('jsonwebtoken')
const { JWT_ADMIN_PASSWORD } = require("../config");
const { adminMiddleware } = require('../middleware/admin.');

adminRouter.post('/signup', async function (req, res) {
    const { email, password, firstName, lastName } = req.body;
    try {
        await adminModel.create({
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

adminRouter.post('/course', adminMiddleware, async function (req, res) {
    const adminId = req.adminId;

    const { title, description, imageUrl, price } = req.body

    const course = await courseModel.create({
        title, description, imageUrl, price, creatorId: adminId
    })


    res.json({
        message: "Course created",
        courseId: course._id
    })
})


adminRouter.put('/course', adminMiddleware, async function (req, res) {
    const adminId = req.adminId;

    const { title, description, imageUrl, price, courseId } = req.body

    const course = await courseModel.updateOne({
        _id: courseId,
        creatorId: adminId
    }, {
        title, description, imageUrl, price
    })


    res.json({
        message: "Course created",
        courseId: course._id
    })
})



adminRouter.get('/course/bulk',adminMiddleware, async function (req, res) {
    const adminId  = req.adminId;

    const courses = await courseModel.find({
        creatorId: adminId
    })

    res.json({
        message: "Course updated",
        courses
    })
})

module.exports = {
    adminRouter
}


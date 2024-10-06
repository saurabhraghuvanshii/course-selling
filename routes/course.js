const {Router} = require('express')

const courseRouter = Router()


courseRouter.post('/purchase', function(req,res){
    res.json({
        message: "you are signup"
    })
})

courseRouter.get('/preview', function(req,res){
    res.json({
        message: "you are signup"
    })
})

module.exports = {
    courseRouter
}
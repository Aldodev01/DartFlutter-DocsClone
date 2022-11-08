const express = require('express')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

const authRouter = express.Router()

authRouter.post('/api/signup', async  (req, res) => {
    try {
        const {name, email, profilePic} =  req.body
        let user = await User.findOne({email: email,})
        if(!user) {
            user = new User({
                email, 
                name,
                profilePic
            })
            user = await user.save()
        }

        const token = jwt.sign({id: user._id}, 'passwordKey')
        res.json({user, token}) // 404
        
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

authRouter.get('/', auth, async (req, res) => {
    // const user = await User.findOne({_id: req.user})
    const user = await User.findById(req.user)
    const token = req.token
    res.json({user, token})
})
module.exports = authRouter
const User = require('../models/users')
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        let user = await User.findOne({ Username: req.body.Username })
        if (user) {
            return res.status(409).json({
                message: 'UserName Already Exists',
            })
        }
        user = await User.create({
            Username: req.body.Username,
            Password: req.body.Password,
            Name: req.body.Name,
            isDoctor: true
        });
        return res.status(201).json({
            message: 'User created successfully',
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            Error: 'Internal server error',
        })
    }
}

const login = async (req, res) => {
    try {
        let user = await User.findOne({ Username: req.body.Username });
        if (!user || user.Password != req.body.Password) {
            return res.status(422).json({
                message: "Invalid UserName or Password"
            })
        }
        return res.status(200).json({
            message: "Log In successful. Here is your token, it expires in 30 minutes",
            data: {
                token: jwt.sign(user.toJSON(), 'Alert1234', { expiresIn: '30m' })
            }
        })
    } catch (error) {
        console.log('Error', error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

module.exports = {
    login, register
}
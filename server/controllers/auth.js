const User = require("../models/users")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require("dotenv").config();

exports.signUp = async(req, res) => {
    try{
        const { username, password, role } = req.body;

        const hashpassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username, password:hashpassword, role
        })
        res.status(201).json({
            success: true,
            data: user,
            message: "User registered successfully"
        })
    }catch(error){
        console.log(error);
        res.status(500).json({ 
            success: false,
            message: 'Registration failed' 
        });
    }
}


exports.login = async(req, res) => {
    try{
        const {username, password} = req.body;
        const userMe = await User.findOne({username})
        if(!userMe){
            res.status(401).json({
                success: false,
                message: "user not found"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, userMe.password);

        if(!isPasswordValid){
            res.status(401).json({ 
                success: false,
                message: "password not found" 
            });
        }

        const token = jwt.sign({UserId: userMe._id}, process.env.SECRET_KEY, {
            expiresIn: "1h"
        })
        res.status(201).json({
            success: true,
            data: username,
            token: token,
            message: "successfully login"
        })
    }catch(error){
        res.status(500).json({ 
            success: false,
            error: 'login failed' 
        });
    }
}
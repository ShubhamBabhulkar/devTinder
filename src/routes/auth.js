const express = require('express');
 const authRouter = express.Router();
 const User = require('../models/user');
 const bcrypt = require("bcrypt");
 const jwt = require('jsonwebtoken');
 const validator = require("validator");
const { validatedSignupData } = require('../utils/validtion');


authRouter.post("/signup", async (req, res) => {
    
    try{
        validatedSignupData(req);
        const { firstName, 
            lastName, 
            gender, 
            age, 
            emailId,
            about,
            photoUrl,
            password} = req.body;
        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({
            firstName, 
            lastName, 
            gender, 
            age, 
            emailId,
            about,
            photoUrl,
            password: passwordHash
        });
        await user.save(user);
        res.send("User Added Successfully!!");
   } catch(err) {
        res.status(400).send('ERROR : '+ err.message);
   }
})


authRouter.post('/login', async (req, res) => {
    try{
        const {emailId, password} = req.body;
        console.log('emailId, password', emailId, password);
        if(!validator.isEmail(emailId)) {
            throw new Error("Invalid Credentials");
        }

        const user = await User.findOne({emailId: emailId});

        if(!user) {
            throw new Error('User is not present in the Database');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            throw new Error('Invalid Credentials')
        } else {
            const token = await jwt.sign({ _id: user._id }, 'Dev@Tinder@2025', {expiresIn: "1d"});
            res.cookie("token", token);
            // res.send({message:'User login Successfully', toke: token});
            res.send('User login Successfully');

        }

    } catch(err) {
        res.status(401).send('ERROR :' + err.message);
    }
})

authRouter.post('/logout', async (req, res) => {
    res.cookie('token', null, {
        'expires': new Date(Date.now())
    });
    res.send('User Logout Sucessfully');
})


module.exports = authRouter;

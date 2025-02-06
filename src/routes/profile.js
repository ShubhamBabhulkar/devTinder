const express = require('express');
const profileRouter = express.Router();
const {jwtAuth} = require("../middleware/auth");
const {validateEditProfileData} = require("../utils/validtion");
const User = require("../models/user");
profileRouter.get("/profile/view", jwtAuth, async (req, res) => {
    try {
        const user = req.user; // user is set the middleware
        if(user) {
            res.send(user);
        } else {
            throw new Error('User not found.')
        }
    } catch(err) {
        res.status(400).send("ERROR : " + err.message);
    }
})

profileRouter.patch("/profile/edit", jwtAuth, async (req, res) => {
    try{
        validateEditProfileData(req);
        const userId = req.user?._id;
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, {returnDocument: "after"});
        res.send(updatedUser);
    }catch(err) {
        res.status(400).send("ERROR : "+ err.message);
    }
})


module.exports = profileRouter;
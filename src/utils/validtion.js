const validator = require("validator");

const validatedSignupData = (req) => {
    const user = req.body;
    if(!user.firstName || !user.lastName) {
        throw new Error("Name is not valid.");
    } else if(!validator.isEmail(user.emailId)) {
        throw new Error("Email is not valid.");
    } else if(!validator.isStrongPassword(user.password)){
        throw new Error("Password is not strong");
    }
}

const validateEditProfileData = (req) => {
    const userData = req.body;
    const allowedFields = ["firstName", "lastName", "age", "about", "photoUrl", "skills", "gender"];
    const isEditAllowed =  Object.keys(userData).every((field) => {
        return allowedFields.includes(field);
    });
    
    if(!isEditAllowed) {
        throw new Error("Edit not allowes!!");
    }
    if(userData?.skills?.length > 10) {
        throw new Error ("Skills should not more than 10");
    }
}

module.exports = {validatedSignupData, validateEditProfileData};
const mongoose = require('mongoose');
// const { Schema } = mongoose;
const validator = require('validator');

const userSchema = new mongoose.Schema({
  firstName: {
    type:String,
    required: true,
    minLength: 4,
    maxLength: 50
  },
  lastName: {
    type:String,
  },
  emailId: {
    type:String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate(value) {
      if(!validator.isEmail(value)) {
        throw new Error('Email Id is not valid');
    }
    }
  },
  password: {
    type:String,
    required: true,
    validate(value) {
      if(!validator.isStrongPassword(value)) {
        throw new Error("Please add strong password");
      }
    }
  },
  age:{
    type:Number,
    min: 18
  },
  gender: {
    type:String,
    enum: {
      values: ["male", "female", "other"],
      message: "{VALUE} is not a valid gender type."
    },
    validate(value) {
      if(!["male", "female", "other"].includes(value)) {
        throw new Error("Gender data is not valid");
      }
    }
  },
  about: {
    type: String,
    default: "this is default about of the User!!!"
  },
  photoUrl: {
    type: String,
    default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTseF8KZL2hHobMM6IsjiHUXSMWntcK9Fk4KA&s",
    validate(value) {
      if(!validator.isURL(value)) {
        throw new Error("Not a Valid Photo url");
      }
    }
  },
  skills: {
    type: [String]
  },
  status: {
    type: String,
    enum: {
      values: ["ignore", "intrested", "accepted", "rejected"],
      message: "{VALUES} is incorrect status type."
    }

  }
},
{
   timestamps: true
}
);

//creating index is help to search result will come very fast
userSchema.index({firstName:1})
userSchema.index({gender:1})

module.exports = mongoose.model('User', userSchema);
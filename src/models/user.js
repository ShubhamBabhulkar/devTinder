const mongoose = require('mongoose');
// const { Schema } = mongoose;

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
    trim: true
  },
  password: {
    type:String,
    required: true
  },
  age:{
    type:Number,
    min: 18
  },
  gender: {
    type:String,
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
    type: String
  },
  skills: {
    type: [String]
  }
},
{ timestamps: true });

module.exports = mongoose.model('User', userSchema);
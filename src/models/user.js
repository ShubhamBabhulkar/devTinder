const mongoose = require('mongoose');
// const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  firstName: String, // String is shorthand for {type: String}
  lastName: String,
  emailId: String,
  password: String,
  age:Number,
  gender: String
});

module.exports = mongoose.model('User', userSchema);
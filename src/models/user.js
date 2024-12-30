const mongoose = require("mongoose");

//! 23:00 - 40:00

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },

  emailId: {
    type: String,
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
});

//  schema tell you what type of data user storing data into your database

const UserModel = new mongoose.model("User", userSchema);

module.exports = UserModel;

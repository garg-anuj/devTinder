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

/* 
    Mongoose model schema ke basis par MongoDB ki collections 
    ke saath interact karta hai. Model ka use karke hum database
     me documents create, read, update aur delete kar sakte hain."

     or yeah kind of instances create krta hai schemaModel ke 
     yaa unhe update / delete bhi kar skta hai 

*/

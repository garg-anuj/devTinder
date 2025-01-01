const mongoose = require("mongoose");
const validator = require("validator");
// schema level validation
//  route handler validation
//! 23:00 - 40:00

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      lowercase: true,
      minLength: 4,
      maxLength: 55,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      lowercase: true,
      minLength: 4,
      maxLength: 55,
      trim: true,
    },

    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      immutable: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Not A VAlid Email " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 8,
      maxLength: 55,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Not A Strong Password " + value);
        }
      },
    },
    age: {
      type: Number,
      min: [14, "user is {VALUE} right now should have at least 14 years age"],
      max: 70,
    },
    gender: {
      type: String,
      trim: true,
      // tolowercase: true,
      // enum: {
      //   tolowercase: true,
      //   values: ["Male", "Female"],
      //   message: "{VALUE} is not supported",
      // },

      // validate(value) {
      //   if (!["Male", "Female"].includes(value)) {
      //     throw new Error("Gender dta is not valid");
      //   }
      // },

      validate: {
        validator: function (value) {
          return ["Male", "Female"].includes(value);
        },
        message: `not correct value {VALUE}`,
      },
    },
    photoUrl: {
      default:
        "https://c0.klipartz.com/pngpicture/49/613/gratis-png-iconos-de-computadora-avatar-perfil-de-usuario-avatar.png",
      type: String,
    },
    skills: {
      type: [String],
      default: null,
      //  we can do this from our api logics/ using route handlers
      validate: {
        validator(skillsArr) {
          return skillsArr.length <= 10;
        },
        message: "you can't add more then 10 skills",
      },
    },
  },
  {
    timestamps: true,
  }
);

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

// !----------------Pre Hooks -----------------
// // Pre-hook for update operations
// userSchema.pre("findOneAndUpdate", async function (next) {
//   const update = this.getUpdate();

//   // Check if emailId is being updated
//   if (update.emailId) {
//     return next(new Error("Email ID cannot be updated!"));
//   }

//   next();
// });

// // Pre-hook for save operations
// userSchema.pre("save", async function (next) {
//   if (this.isModified("emailId") && !this.isNew) {
//     return next(new Error("Email ID cannot be updated!"));
//   }

//   next();
// });

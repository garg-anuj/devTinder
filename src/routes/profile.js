const express = require("express");
const validator = require("validator");

const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");
const profileRouter = express.Router();

// !------------------------------------------------------------------------------

// profileRouter.get("/profile", async (req, res) => {
//   const cookie = req.cookies.myTokenKey;
//   //if(checkCookies)then we will validate / authenticated the token if the token is valid the we will allow to access the data

//   try {
//     if (!cookie) {
//       throw new Error("Session Has Been Expired Login Again");
//     } else {
//       const decodedToken = jwt.verify(cookie, PRIVATE_KEY);
//       const user = await User.findOne({ _id: decodedToken._id }).exec();
//       console.log(user);
//       res.send(user);
//     }
//   } catch (err) {
//     throw new Error("Something is wrong " + err.message);
//   }
// });

//

// !--------------------Using userAuth-Middleware in /profile----------------------------------

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    res.send(req.users);
  } catch (err) {
    throw new Error("Something is wrong " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    await validateProfileEditData(req);
    const loggedUser = req.users; // yeah hme userAuth middleware se mil rha hai

    // !METHOD 1
    // const loggedUserUpdated = await User.findByIdAndUpdate(loggedUser._id,req.body,{runValidators: true  });
    //   // runValidators is important hai existing user ke liye bhi schemaLevel validation allow krta hai
    // res.send(loggedUserUpdated);

    // !METHOD 2  //Not underStand this MEthod not working properly for me
    // Object.keys(loggedUser) yeah glt tha  iski jge body me hai uski keys ayegi
    Object.keys(req.body).forEach((key) => (loggedUser[key] = req.body[key]));

    await loggedUser.save();

    res.send(loggedUser);
  } catch (err) {
    res.send("Error Wile Edit Profile " + err.message);
  }
});

module.exports = profileRouter;

async function validateProfileEditData(req) {
  const EDITABLE_FIELDS = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "photoUrl",
    "skills",
  ];
  const user = req.body;
  const isFieldEditable = Object.keys(user).every((currentField) => {
    return EDITABLE_FIELDS.includes(currentField);
  });
  if (!isFieldEditable) {
    throw new Error("Invalid Edit Request");
  }
  const { firstName, lastName, age, gender, skills } = req.body;

  if (!firstName || !lastName) {
    throw new Error("First Name and Last Name are required");
  } else if (firstName.length < 4 || firstName.length > 55) {
    throw new Error("First Name should be between 5 - 70 words");
  } else if (age <= 14 || age >= 70) {
    throw new Error("age should be between 14 to 70 ");
  } else if (skills && skills.length > 10) {
    throw new Error("Skills should be between 1 to 10 ");
  }
  //   else if (!validator.isURL(photoUrl)) {
  //     throw new Error("Invalid Photo URL");
  //   }
  //   return isFieldEditable;
  console.log(user);
  return user;
}

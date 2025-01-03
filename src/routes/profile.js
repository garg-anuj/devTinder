const express = require("express");
const { userAuth } = require("../middlewares/auth");
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

module.exports = profileRouter;

const express = require("express");
const ConnectionRequestsModel = require("../models/connectionRequest");
const { userAuth } = require("../middlewares/auth");
const userRouter = express.Router();

// ! Cornaer cases to find connections

/* 
 1. user logged in hona chaiye 
 2. connections finde krne ke liye (status : intrested/accepted or khud ki 
    id us document me match hona chaiye joh ki toUserId / forMuserId me milegi )
    yaa toh req send ki hgai yaa toh req ayi hogi 

*/

userRouter.get("/user/connections", userAuth, async (req, res) => {
  // kind of following list
  try {
    const loggedUser = req.users;

    const userConnections = await ConnectionRequestsModel.find({
      $or: [{ toUserId: loggedUser._id }, { fromUserId: loggedUser._id }],
      //   $or: [{ status: "interested" }, { status: "ignored" }],
    })
      .populate("fromUserId", "firstName")
      .populate("toUserId", "firstName");

    res.send(userConnections);
  } catch (err) {
    res.send("Error " + err.message);
  }
});

//

// !---------------------------------------------------------------------------------------

// isme reques kiise ayi hai yeah dekhna hai toh isme hm toUserId honge[]

userRouter.get("/user/requests", userAuth, async (req, res) => {
  // kind of pending request list conformTo accept list
  try {
    const loggedUser = req.users; //yha toUserId wala login hai
    const userConnections = await ConnectionRequestsModel.find({
      $or: [{ toUserId: loggedUser._id }],
      status: "interested",
    })
      .populate("fromUserId", "firstName")
      .populate("toUserId", "firstName");

    res.send(userConnections);
  } catch (err) {
    res.send("Error " + err.message);
  }
});

module.exports = userRouter;

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

 3 all connection me hme dusre user ki info ko populate karwana hai naa ki hme khudki
    toh hm froUserId ko populate karwa denge lekin tb kya jb use khudh khudh hi fromId se hoo
    mtlb usne kisi ko request send ki hai toh wo fromUserId me ayeg tb kese handle krenge

*/
const POPULATE_FIELDS = ["firstName", "lastName", "age"];
userRouter.get("/user/connections", userAuth, async (req, res) => {
  // kind of following list
  try {
    const loggedUser = req.users._id;

    const userConnections = await ConnectionRequestsModel.find({
      $or: [{ toUserId: loggedUser }, { fromUserId: loggedUser }],
      //   $or: [{ status: "interested" }, { status: "accepted" }],
    })
      .populate("fromUserId", POPULATE_FIELDS)
      .populate("toUserId", POPULATE_FIELDS);

    const data = userConnections.map((data) => {
      const { status, toUserId, fromUserId } = data;
      if (data.toUserId._id.equals(loggedUser)) {
        return { fromUserId, status };
      }
      if (data.fromUserId._id.toString() === loggedUser.toString()) {
        return { toUserId, status };
      }
    });

    // res.send(userConnections);
    res.json({ data });
    // res.json({ userConnections });
  } catch (err) {
    res.send("Error " + err.message);
  }
});

//

// !---------------------------------------------------------------------------------------

// isme reques kiise ayi hai yeah dekhna hai toh isme hm toUserId honge[]

userRouter.get("/user/requests/review", userAuth, async (req, res) => {
  // kind of pending request list conformTo accept list
  try {
    const loggedInUser = req.users; //yha toUserId wala login hai
    const connectionRequests = await ConnectionRequestsModel.find({
      $or: [{ toUserId: loggedInUser._id }],
      status: "interested",
    }).populate("fromUserId", POPULATE_FIELDS);
    //   .populate("toUserId", "firstName");

    res.send(connectionRequests);
  } catch (err) {
    res.send("Error " + err.message);
  }
});

module.exports = userRouter;

const express = require("express");
const ConnectionRequestsModel = require("../models/connectionRequest");
const { userAuth } = require("../middlewares/auth");
const UserModel = require("../models/user");
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
      $or: [
        {
          toUserId: loggedUser, // $or: [{ status: "accepted" }, { status: "interested" }],
        },
        {
          fromUserId: loggedUser, // $or: [{ status: "accepted" }, { status: "interested" }],
        },
      ],
      status: "accepted",
    })
      .populate("fromUserId", POPULATE_FIELDS)
      .populate("toUserId", POPULATE_FIELDS);

    const data = userConnections.map((userConnection) => {
      const { status, toUserId, fromUserId } = userConnection;

      if (userConnection.toUserId._id.equals(loggedUser)) {
        return { fromUserId, status };
      }
      if (userConnection.fromUserId._id.toString() === loggedUser.toString()) {
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

// !Corner cases :- isme hme feed pr joh user ayenge wo dikhana hai
/* 
    kind of friend suggestion
    ["interested", "ignored", "accepted", "rejected"] yeah wale log hai wo show nhi 
    hoga ,  member show nhi honge or khudh wo users hai show nhi hoga

    what we will do for this ?
    logged userKi id lenge or connectIonRequest ke colloection me findOut krenge 
    un logo ko jinhe show nhi karwana   ["interested", "ignored", "accepted", "rejected"]

    then db me se hiderUsers ke alawa sare dikha denge 15 -20 krke

*/

userRouter.get("/user/feed", userAuth, async (req, res) => {
  const DEFAULT_PAGE = 1;
  const DEFAULT_PER_PAGE_LIMIT = 10;
  const DEFAULT_MAX_LIMIT = 50;
  try {
    const loggedUser = req.users._id;
    let pageNo = parseInt(req.query.page) || DEFAULT_PAGE;
    let pageLimit = parseInt(req.query.limit) || DEFAULT_PER_PAGE_LIMIT; //validate otherWise hacker can misuse this limit size
    const skip = (pageNo - 1) * pageLimit; // skip 0,

    if (pageLimit > DEFAULT_MAX_LIMIT) pageLimit = DEFAULT_PER_PAGE_LIMIT;
    if (pageNo < 1) pageNo = DEFAULT_PAGE;

    const excludesConnections = await ConnectionRequestsModel.find({
      $or: [{ fromUserId: loggedUser }, { toUserId: loggedUser }],
      status: { $in: ["interested", "ignored", "accepted", "rejected"] },
    });

    const hiddenUsers = hideUsers(excludesConnections, loggedUser);

    const feedUsers = await UserModel.find({
      _id: { $nin: Array.from(hiddenUsers) },
    })
      .populate(POPULATE_FIELDS)
      .skip(skip)
      .limit(pageLimit)
      .lean();

    const totalUsers = await UserModel.countDocuments({
      _id: { $nin: Array.from(hiddenUsers) },
    });

    res.json({
      success: true,
      allUsers: feedUsers,
      pagination: {
        currentPage: pageNo,
        totalPage: Math.ceil(totalUsers / pageLimit),
        limit: pageLimit,
        totalUsers,
      },
    });
  } catch (err) {
    res.json({
      success: false,
      message: "Error " + err.message,
    });
  }
});

module.exports = userRouter;

function hideUsers(excludesConnectionList, loggedUser) {
  const hiddenUsers = new Set();
  excludesConnectionList.forEach((connection) => {
    hiddenUsers.add(connection.fromUserId.toString());
    hiddenUsers.add(connection.toUserId.toString());
    hiddenUsers.add(loggedUser.toString());
  });

  return hiddenUsers;
}

const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequestsModel = require("../models/connectionRequest");
const User = require("../models/user");
const requestRouter = express.Router();

// ! note down the Corner Cases
//status must be these[interested, ignored]
// fromUser id wala means joh send kar rha hai authenticated user hona chaiye
//  user/toUserId must be present means devTinder Application kaa user hona chaiye
// one user can not send request to it self
//ek baar a ne b user ko request send kr di toh dubara send naa kar paye or
//  b user bhi a ko request send naa kar paye [schemaLevel and apiLevel validation ]

// /request/send/:status[interested, ignored]/:userId
requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    const fromUserId = req.users._id; // loggedUser
    const toUserId = req.params.toUserId;
    const allowedStatus = ["interested", "ignored"];
    const status = req.params.status;

    try {
      if (!allowedStatus.includes(status)) {
        // return res.status(400).json({ error: "Invalid status" });
        throw new Error("Invalid status");
      }

      if (fromUserId === toUserId) {
        throw new Error("you cant request to your self");
      }

      const isRequestUserValid = await User.findById(toUserId);
      if (!isRequestUserValid) {
        throw new Error("");
      }
      const toUserFirstName = isRequestUserValid.firstName;
      const fromUserFirstName = req.users.firstName;

      const isAlreadyConnectionExist = await ConnectionRequestsModel({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (isAlreadyConnectionExist) {
        throw new Error(
          `connectionRequest between ${fromUserFirstName} & ${toUserFirstName} is already exist`
        );
      }
      const connectionRequest = new ConnectionRequestsModel({
        fromUserId,
        toUserId,
        status,
      });

      await connectionRequest.save();
      //   res.send("request sending ");
      res.json({
        message: "request has been send successfully",
        data: connectionRequest,
      });
    } catch (err) {
      res.send("ERROR " + err.message);
    }
  }
);

module.exports = requestRouter;

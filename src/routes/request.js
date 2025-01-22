const express = require("express");

const { userAuth } = require("../middlewares/auth");
const ConnectionRequestsModel = require("../models/connectionRequest");
const User = require("../models/user");
const sendEmail = require("../utils/ses_sendemail");

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

      if (fromUserId.toString() === toUserId.toString()) {
        throw new Error("you cant request to your self");
      }

      const isRequestUserValid = await User.findById(toUserId);
      if (!isRequestUserValid) {
        throw new Error("");
      }
      const toUserFirstName = isRequestUserValid.firstName;
      const fromUserFirstName = req.users.firstName;

      const isAlreadyConnectionExist = await ConnectionRequestsModel.findOne({
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
      const connectionRequestSave = await connectionRequest.save();

      const emailRes = await sendEmail.run(
        `A new friend request from ${fromUserFirstName}`,
        `${fromUserFirstName} is ${status} in ${toUserFirstName}`
      );

      //   res.send("request sending ");
      res.json({
        message: "request has been send successfully",
        data: connectionRequestSave,
      });
    } catch (err) {
      res.send("ERROR " + err.message);
    }
  }
);

// ! note down the Corner Cases

/* 
    1 yeah joh intrested log hai unki api ayegi one by one krke unhe accept / reject karna hai 
    2 finde kese krenge requestId se 
    3 ha hm hm toUser honge  means (logo ne hmme intresetd dikaya hai fromUserId se toUserId se)
      Ex: - Dhoni(fromUserId) ne kohli(toUserId) ko request send ki 
    4 toh request accept krne ke liye hme toUserId(kohli) ko login krna hoga wha pr wo dekh skta hai 
      kon usme interested hai   
    5  connectionRequest ke collection me joh intreseted hai uski id(fromUserId) mil jayegi us
       id se hm user ki name - details populate karwa lenge
    6 [accepted, rejected] (validation ) yhi do status option aa skte hai   
    
    validation : requestId to koi si bhi hoo skti hai isliye hm match krenge ki yeah requestId 
    ke toUserId me authenticate userKi id hai yaa nhi mathc krti haii yaa nhi usi se find krenge
*/

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const allowStatus = ["accepted", "rejected"];
      const requestId = req.params.requestId; //connectionId apiLevel validation kro check coorectMongoose id and present hai yaa nhi
      const loggedUser = req.users._id;
      const status = req.params.status;

      const isValidStatus = allowStatus.includes(status);
      if (!isValidStatus) {
        throw new Error("Status Is INVALID");
      }

      const userConnectionRequest = await ConnectionRequestsModel.findOne({
        _id: requestId,
        toUserId: loggedUser,
        status: "interested",
      })
        .populate("fromUserId", "firstName")
        .populate("toUserId", "firstName");

      if (!userConnectionRequest) {
        throw new Error(
          "Request not found or you are not authorized to modify it"
        );
      }

      userConnectionRequest.status = status;
      await userConnectionRequest.save();

      res.json({ message: "request progress", data: userConnectionRequest });
    } catch (err) {
      res.send("ERROR " + err.message);
    }
  }
);

module.exports = requestRouter;

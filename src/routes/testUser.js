const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");
// !--------------------------- 26:00 - 36:00---------------------------------
userRouter.get("/users", async (req, res) => {
  // const emailId = req.body.emailId
  try {
    // const users = await User.findOne(req.body);
    // const users = await User.findOne({emailId});

    const users = await User.find({});
    if (users.length === 0) {
      res.status(404).send("No users found");
    }
    res.send(users);
  } catch (err) {
    res.status(400).send("Error get users " + err.message);
  }
});
// !------------------------------commit-3 patch method 1hr:05 - 1hr:05-----------------------------------

userRouter.patch("/update-user/:userId", async (req, res) => {
  const ALLOW_UPDATES = [
    "firstName",
    "lastName",
    "password",
    "age",
    "gender",
    "skills",
  ];

  // const users = await User.findOne(req.body);
  // const userId = req.body._id;
  const userId = req.params.userId;
  const updatedUserData = req.body;

  const isFieldChangeable = Object.keys(updatedUserData).every((field) =>
    ALLOW_UPDATES.includes(field)
  );

  try {
    if (!isFieldChangeable) {
      throw new Error("updates are not allowed ");
    }

    if (updatedUserData?.skills.length >= 10) {
      throw new Error("you can add 10 skills only");
    }

    const isUserExist = await User.findById(userId);

    if (!isUserExist) {
      res.status(404).send("Existing User Not Found To Update");
    } else {
      await User.findByIdAndUpdate({ _id: userId }, updatedUserData, {
        returnDocument: "before",
        runValidators: true,
      });

      res.send("user Update successfully");
    }
  } catch (err) {
    res
      .status(400)
      .send("Something is wrong while updating user " + err.message);
  }
});

// !------------------------------commit-2 delete method 57:00- 1hr:05------------------------------------
userRouter.delete("/del-user", async (req, res) => {
  // const users = await User.findOne(req.body);
  const userId = req.body.userId;

  try {
    // const user = await User.deleteOne({ _id: userId });
    // const user = await User.findOneAndDelete({ _id: userId });
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      res.status(404).send("Existing User Not Found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something is wrong while deleting user");
  }
});

module.exports = userRouter;

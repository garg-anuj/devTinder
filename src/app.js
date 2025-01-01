// ! Never Trust req.body isme kuch bhi vurnable aa skta hai
const express = require("express");
const PORT = 3000;
const app = express();
const { connectDB } = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");

app.use(express.json());

app.post("/signup", async (req, res) => {
  // const userObj = req.body; // don't send complete req.body  in db Send what needed manually
  const { firstName, lastName, password, emailId } = req.body;

  try {
    validateSignUpData(req); // if fields are not validate it will throw the error
    const hashPassword = await bcrypt.hash(password, 10);
    // const user = new User(userObj); //creating a new instance of user model
    const user = new User({
      firstName,
      lastName,
      password: hashPassword,
      emailId,
    });
    await user.save();
    res.send(user);
  } catch (err) {
    res.status(400).send("Error while signup " + err.message);
  }
});

app.post("/login", async (req, res) => {
  const { emailId, password } = req.body;
  try {
    const isUserExist = await User.findOne({ emailId }).exec();
    if (!isUserExist) {
      res.send("Invalid Credentials");
    } else {
      const hashPassword = isUserExist.password;
      bcrypt.compare(password, hashPassword, (err, isMatch) => {
        if (err) {
          throw new Error("Error comparing hash:");
        } else if (isMatch) {
          res.send("You can Login The plain text matches the hash!");
        } else {
          res.send("Wrong password plz check");
        }
      });
    }
  } catch (err) {
    res.status(400).send("Error while login " + err.message);
  }
});
// !--------------------------- 26:00 - 36:00---------------------------------
app.get("/users", async (req, res) => {
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

// !------------------------------commit-2 delete method 57:00- 1hr:05------------------------------------
app.delete("/del-user", async (req, res) => {
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

// !------------------------------commit-3 patch method 1hr:05 - 1hr:05-----------------------------------

app.patch("/update-user/:userId", async (req, res) => {
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

//  pehle dbConnect kro then app ko listen kro kisi port pr
connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => console.log(`server listening ${PORT} port`));
  })
  .catch((err) => console.log("Database can not be connected"));

// app.listen(PORT, () => {
//   console.log("server successfully  listening on the port " + PORT);
// });

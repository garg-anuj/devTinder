const express = require("express");
const PORT = 3000;
const app = express();
const { connectDB } = require("./config/database");
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  const userObj = req.body;
  try {
    const user = new User(userObj); //creating a new instance of user model
    await user.save();
    res.send(user);
  } catch (err) {
    res.status(400).send("Error Saving the user " + err.message);
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

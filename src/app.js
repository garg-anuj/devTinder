const express = require("express");
const PORT = 3000;
const app = express();
const { connectDB } = require("./config/database");
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "Anuj",
    lastName: "Garg",
    emailId: "anuj@gmail.com",
    password: 12345678,
    age: 23,
    gender: "male",
  };

  try {
    const user = new User(userObj); //creating a new instance of user model
    await user.save();
    res.send(user);
  } catch (err) {
    res.status(400).send("Error Saving the user " + err.message);
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

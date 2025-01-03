const express = require("express");
const authRouter = express.Router();

const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
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

authRouter.post("/login", async (req, res) => {
  const { emailId, password } = req.body;
  // token = jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256' })
  try {
    const isUserExist = await User.findOne({ emailId }).exec();

    if (!isUserExist) {
      res.send("Invalid Credentials");
    } else {
      const hashPassword = isUserExist.password;
      // const isPasswordValid = await  isUserExist.validatePassword(password)
      bcrypt.compare(password, hashPassword, async (err, isMatch) => {
        if (err) {
          throw new Error("Error comparing hash:");
        } else if (isMatch) {
          // const token = jwt.sign({ _id: isUserExist._id }, PRIVATE_KEY, {expiresIn: "1d"});
          const token = await isUserExist.getJWT(); //offloaded this logic into the schema

          // Adds the token to cookies ans send the response back to user
          res.cookie("myTokenKey", token, {
            expires: new Date(Date.now() + 24 * 3600000),
          });
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

module.exports = authRouter;

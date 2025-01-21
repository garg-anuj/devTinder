const jwt = require("jsonwebtoken");
const User = require("../models/user");

const isAdminAuthorized = (req, res, next) => {
  const authToken = "12345678";
  // const isAdminAuthorized = authToken === "12345678";
  if (authToken === "12345678") {
    next();
  } else {
    res.status(401).send("You are not admin");
  }
};

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const userAuth = async (req, res, next) => {
  try {
    const cookie = req.cookies.myTokenKey;
    if (!cookie) {
      // throw new Error("you have to login / signUp");
      return res.status(401).send({
        success: false,
        message: "Please Login!",
      });
    }

    const decodedObj = jwt.verify(cookie, PRIVATE_KEY);
    const { _id } = decodedObj;

    const user = await User.findById(_id);
    if (!user) {
      // throw new Error("User No Found");
      res.status(404).json({
        success: false,
        message: "User No Found",
      });
    }

    req.users = user; // iise hm req.user ke anadar data store karwa denge jiise ki nextRouteHandler me hm yeah data get kar paye cookie kaa decoded data
    // req.users = isUserTokenValid; yeah bhi kar skte hai
    // req.newToken = isUserTokenValid;
    next();
  } catch (err) {
    res.json({
      success: false,
      message: "Something is Wrong " + err.message,
    });
  }
};

module.exports = { isAdminAuthorized, userAuth };

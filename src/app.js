// ! Never Trust req.body isme kuch bhi vurnable aa skta hai
const express = require("express");
const PORT = 3000;
const app = express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { connectDB } = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const { userAuth } = require("./middlewares/auth");

const bcrypt = require("bcrypt");

app.use(express.json());
app.use(cookieParser());
/*
  !yeah hm use nhi krenge toh hme always undefined ayega 
  !server pr jb hm client se cookie get krenge
*/

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

// !------------------------------------------------------------------------------

// app.get("/profile", async (req, res) => {
//   const cookie = req.cookies.myTokenKey;
//   //if(checkCookies)then we will validate / authenticated the token if the token is valid the we will allow to access the data

//   try {
//     if (!cookie) {
//       throw new Error("Session Has Been Expired Login Again");
//     } else {
//       const decodedToken = jwt.verify(cookie, PRIVATE_KEY);
//       const user = await User.findOne({ _id: decodedToken._id }).exec();
//       console.log(user);
//       res.send(user);
//     }
//   } catch (err) {
//     throw new Error("Something is wrong " + err.message);
//   }
// });

//

// !--------------------Using userAuth-Middleware in /profile----------------------------------

app.get("/profile", userAuth, async (req, res) => {
  try {
    res.send(req.users);
  } catch (err) {
    throw new Error("Something is wrong " + err.message);
  }
});

//

// !--------------------Feed Using userAuth-Middleware-----------------------------------------

/*  
   abhi me chata huu ki login user /feed bhi access kar paye lekin hme same 
   code agin again likhna hoga jwt verrify ke liye har route pr tb hmare 
   routeHandler work krenge iske liye hm yeah jwt vrify kaa logic ek middleware 
   me daal denger next() jisse verfiy hone ke badd routeHandler work krega 

*/

app.get("/feed", userAuth, async (req, res) => {
  try {
    res.send("You can check Feed");
  } catch (err) {
    res.status(400).send("Error while fetching feed " + err.message);
  }
});

//

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

//

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

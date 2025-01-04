// ! Never Trust req.body isme kuch bhi vurnable aa skta hai
const express = require("express");
const PORT = 3000;
const app = express();
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/database");
const { userAuth } = require("./middlewares/auth");

const authRouter = require("./routes/auth");
const testUserRouter = require("./routes/testUser");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use(express.json());
app.use(cookieParser());
/*
  !yeah hm use nhi krenge toh hme always undefined ayega 
  !server pr jb hm client se cookie get krenge
*/

app.use("/", authRouter);
app.use("/", testUserRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

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

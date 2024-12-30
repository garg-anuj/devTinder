const express = require("express");
const PORT = 3000;

//! FACTS
// 1 we can add multiple handlers inside it
// 2 ek baar client ko request send krdi toh wo change nhi kar skte

const app = express();
// const arrRouterHandlers = [
//   (req, res) => res.send("handler 1 response"),
//   (req, res) => res.send("handler 2 response"),
//   (req, res) => res.send("handler 3 response"),
// ];

// -------------------we can add multiple handlers----------------------------------
// we can add multiple handlers inside it
app.use(
  "/user",
  (req, res) => res.send("handler 1 response"),
  (req, res) => res.send("handler 2 response"),
  (req, res) => res.send("handler 3 response")
);

// ek baar client ko request send krdi toh wo change nhi kar skte

app.listen(PORT, () => {
  console.log("server successfully  listening on the port " + PORT);
});

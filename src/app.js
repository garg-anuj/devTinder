const express = require("express");
const PORT = 3000;

const app = express();

// app.use("/", (req, res) => {
//   console.log("chla ab chla");
//   res.send("helllo world use");
// });

// joh bhi test ke baad ayega usme yeah a..use sbko overWrite kar dega
//  TEST response me milega
app.use("/test", (req, res) => res.send("Test"));
app.use("/hello", (req, res) => res.send("hello"));
app.use("/hello/2", (req, res) => res.send("hello hello 2"));
app.use("/", (req, res) => res.send("Home Page /"));

app.get("/new", (req, res) => {
  console.log("chla ab chla");
  res.send("new worldd get");
});

app.listen(PORT, () => {
  console.log("server successfully  listening on the port " + PORT);
});

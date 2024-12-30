const express = require("express");
const PORT = 3000;

const app = express();

// ------comment-2------------------------------------

app.use("/user", (req, res) => res.send("show anything"));

//This will only handle GET call to /user
app.get("/user", (req, res) =>
  res.send({
    name: "Anuj",
    lastName: "Garg",
  })
);
app.post("/user", (req, res) =>
  res.send("Data Successfully saved to database")
);

app.delete("/user", (req, res) => res.send("Deleted Successfully"));

// this will match all the HTTP method API calls /test
app.use("/test", (req, res) => res.send("Test"));

// ------comment-1------------------------------------
// // app.use("/", (req, res) => {
// //   console.log("chla ab chla");
// //   res.send("helllo world use");
// // });

// // joh bhi test ke baad ayega usme yeah a..use sbko overWrite kar dega
// //  TEST response me milega
// app.use("/test", (req, res) => res.send("Test"));
// app.use("/hello", (req, res) => res.send("hello"));
// app.use("/hello/2", (req, res) => res.send("hello hello 2"));
// app.use("/", (req, res) => res.send("Home Page /"));

// app.get("/new", (req, res) => {
//   console.log("chla ab chla");
//   res.send("new worldd get");
// });

app.listen(PORT, () => {
  console.log("server successfully  listening on the port " + PORT);
});

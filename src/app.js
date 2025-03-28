const express = require("express");
const PORT = 3000;

const app = express();
const userObj = {
  name: "Anuj",
  lastName: "Garg",
};
// ------comment-3-Advanced Routing Concept using  regex in routes------------------------------------
// app.get("/ab?c", (req, res) => res.send(userObj));
// app.get("/ab+c", (req, res) => res.send(userObj));
// app.get("/ab*cd", (req, res) => res.send(userObj));
// app.get("/a(bc)?d", (req, res) => res.send(userObj));
// app.get("/a(bc)+d", (req, res) => res.send(userObj));
// app.get("/ae(bc)?hd", (req, res) => res.send(userObj));
// app.get("anyRegex", (req, res) => res.send(userObj));
// app.get("/a/", (req, res) => res.send(userObj));
// app.get("/.*fly$/", (req, res) => res.send(userObj));

app.get("/user/:userId/:name", (req, res) => {
  console.log(req.params, req.query);
  res.send(userObj);
});
app.get("/user", (req, res) => res.send(userObj));

// ------comment-2------------------------------------

// app.use("/user", (req, res) => res.send("show anything"));

// //This will only handle GET call to /user
// app.get("/user", (req, res) =>
//   res.send({
//     name: "Anuj",
//     lastName: "Garg",
//   })
// );
// app.post("/user", (req, res) =>
//   res.send("Data Successfully saved to database")
// );

// app.delete("/user", (req, res) => res.send("Deleted Successfully"));

// // this will match all the HTTP method API calls /test
// app.use("/test", (req, res) => res.send("Test"));

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

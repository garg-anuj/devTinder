const express = require("express");
const PORT = 3000;

const app = express();

app.use((req, res) => {
  console.log("chla ab chla");
  res.send("helllo world use");
});

app.use("/test", (req, res) => {
  res.send("Test");
});

app.get("/", (req, res) => {
  console.log("chla ab chla");
  res.send("hello worldd get");
});

app.listen(PORT, () => {
  console.log("server successfully  listening on the port " + PORT);
});

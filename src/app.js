const express = require("express");
const PORT = 3000;
const app = express();
const { connectDB } = require("./config/database");

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

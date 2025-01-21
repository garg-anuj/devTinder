const mongoose = require("mongoose");

const connectDB = async () => await mongoose.connect(process.env.DB_CONNECTION);

// connectDB()
//   .then(() => console.log("Database connected successfully"))
//   .catch((err) => console.log("Database can not be connected"));

module.exports = { connectDB };

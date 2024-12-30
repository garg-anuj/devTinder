const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://anujgargyt2023:9HkI2DyZdzjyryp6@namastenode.ecoyv.mongodb.net/devTinder"
  );
};

// connectDB()
//   .then(() => console.log("Database connected successfully"))
//   .catch((err) => console.log("Database can not be connected"));

module.exports = { connectDB };

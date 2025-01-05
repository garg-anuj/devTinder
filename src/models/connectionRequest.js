const mongoose = require("mongoose");
const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    status: {
      type: String,
      enum: {
        values: ["interested", "ignored", "accepted", "rejected"],
        message: "{VALUE}  is not correct status Type",
      },
    },
  },
  { timestamps: true }
);

connectionRequestSchema.index(
  {
    fromUserId: 1,
    toUserId: 1,
  },
  { unique: true } // Prevents duplicate connection requests
);

connectionRequestSchema.pre("save", function (next) {
  // middleware hai yeah ek type kaa jb bhi yeah save hota hai toh save hone se pehle yeah run / check  hota hai
  const connectionRequest = this;
  const { fromUserId, toUserId } = connectionRequest;

  if (fromUserId.equals())
    if (fromUserId === toUserId) {
      throw new Error("You cant send request to your self");
    }
  next();
});

const ConnectionRequestsModel = new mongoose.model(
  "ConnectionRequests",
  connectionRequestSchema
);
module.exports = ConnectionRequestsModel;

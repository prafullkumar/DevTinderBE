const mongoose = require("mongoose");
const { validate } = require("./user");

const connectionReqestSchema = new mongoose.Schema(
  {
    fromUserID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    toUserID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "rejected", "accepted", "interested"],
        message: `{VALUE} is not a valid status`,
      },
    },
  },
  { timestamps: true }
);

connectionReqestSchema.index({ fromUserId: 1, toUserId: 1 });

connectionReqestSchema.pre("save", async function (next) {
  const connectionRequest = this;

  // Only hash the password if it's new or has been modified
  if (this.fromUserID.equals(this.toUserID)) {
    throw new Error("Cannot send connection request to yourself!");
  }
  next();
});
const ConnectionRequest = new mongoose.model(
  "ConnectionRequest",
  connectionReqestSchema
);

module.exports = ConnectionRequest;

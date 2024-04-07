const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PolicySchema = new Schema(
  {
    authorName: {
      type: String,
      required: true,
    },
    policyName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create Mongoose model dynamically based on role
const PolicyModel = mongoose.model("Policy", PolicySchema);
module.exports = PolicyModel;

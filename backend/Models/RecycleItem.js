const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RecycleItemSchema = new Schema(
  {
    itemName: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    pointsEarned: {
      type: Number,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create Mongoose model dynamically based on role
const RecycleModel = mongoose.model("Recycle Item", RecycleItemSchema);
module.exports = RecycleModel;

const mongoose = require("mongoose");

// Define the schema for the Product model
const feedbackSchema = new mongoose.Schema(
  {
    feedbackBy: {
      type: String,
      required: true,
    },
    feedback: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create and export the Product model
module.exports = mongoose.model("Feedbacks", feedbackSchema);

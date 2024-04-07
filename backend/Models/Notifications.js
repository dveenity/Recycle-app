const mongoose = require("mongoose");

// Define the schema for the Product model
const notificationsSchema = new mongoose.Schema(
  {
    messageOwner: {
      type: String,
      required: true,
    },
    adminMessage: {
      type: String,
      required: true,
    },
    userMessage: {
      type: String,
    },
    timeMessage: {
      type: String,
    },
  },
  { timestamps: true }
);

// Create and export the Product model
module.exports = mongoose.model("Notifications", notificationsSchema);

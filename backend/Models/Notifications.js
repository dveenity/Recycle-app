const mongoose = require("mongoose");

// Define the schema for the Notifications model
const notificationsSchema = new mongoose.Schema(
  {
    messageOwner: {
      type: String,
      required: true,
    },
    adminMessage: {
      message: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
        enum: ["read", "unread"],
        default: "unread", // Default status is unread
      },
    },
    userMessage: {
      message: {
        type: String,
      },
      status: {
        type: String,
        enum: ["read", "unread"],
      },
    },
  },
  { timestamps: true }
);

// Create and export the Notifications model
module.exports = mongoose.model("Notifications", notificationsSchema);

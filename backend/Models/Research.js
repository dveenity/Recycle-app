const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ResearchSchema = new Schema(
  {
    authorName: {
      type: String,
      required: true,
    },
    researchName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create Mongoose model dynamically based on role
const ResearchModel = mongoose.model("Research", ResearchSchema);
module.exports = ResearchModel;

const mongoose = require("mongoose");

const searchSchema = new mongoose.Schema(
  {
    query: {
      type: String,
      required: true,
      trim: true,
    },

    count: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Search",
  searchSchema
);
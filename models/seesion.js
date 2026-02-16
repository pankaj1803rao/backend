const mongoose = require("mongoose");

const session = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 3600,
    },
    productID: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  {
    strict: "throw",
  },
);

module.exports = mongoose.model("Session", session);

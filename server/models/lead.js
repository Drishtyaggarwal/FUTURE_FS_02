const mongoose = require("mongoose");

const LeadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    status: {
      type: String,
      default: "New",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lead", LeadSchema);
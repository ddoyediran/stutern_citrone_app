const mongoose = require("mongoose");

const assignmentsSchema = mongoose.Schema({
  number: {
    type: Number,
  },
  tutor: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Get tutor from User model
    },
  ],
  module: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Module", // Ref the module model
  },
  due_date: {
    type: Date,
  },
  date_submitted: {
    type: Date,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["In progress", "Completed", "Pending", "Graded"],
    default: "In progress",
  },
  submission_link: {
    type: String,
  },
});

module.exports = mongoose.model("Assignment", assignmentsSchema);

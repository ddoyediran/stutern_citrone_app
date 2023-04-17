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
  created_at: {
    type: Date,
    default: Date.now(),
  },
  date_submitted: {
    type: Date,
  },
  description: {
    type: String,
  },
  grade: {
    type: Number,
  },
  status: {
    type: String,
    enum: ["In progress", "Completed", "Pending", "Graded"],
    default: "In progress",
  },
  submission_field: {
    type: String,
  },
  submitted_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Student that submitted this assignment
  },
  all_students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // List of all students that have access to this assignment
    },
  ],
});

module.exports = mongoose.model("Assignment", assignmentsSchema);

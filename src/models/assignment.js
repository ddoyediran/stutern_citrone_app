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
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  grade: {
    type: Number,
  },
  status: {
    type: String,
    enum: ["Open", "Awaiting Grade", "Graded"],
    default: "Open",
  },
  submission_field: {
    type: String,
  },
  submitted_file: {
    type: String,
  },
  tutor_comment: {
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

const Assignment = require("../models/assignment");
const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const Joi = require("joi");

/**
 * Helper method to validate client input
 * @param {params} inputObj
 * @returns {object}
 */

const schema = Joi.object({
  submission_field: Joi.string().min(3).required(),
});

function validate(inputObj) {
  const value = schema.validate(inputObj);
  return value;
}

/**
 *
 * @desc submitAssignment function to Submit Assignment
 * @param {req, res, next}
 * @output {res} Json response
 */
const submitAssignment = async (req, res, next) => {
  try {
    // determine who is trying to submit the assignment
    const user = req.user;

    // We can validate their input
    const submission_field = req.body.submission_field;

    // check if the field is not empty
    if (!submission_field) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Field cannot be empty!" });
    }

    const validationResult = validate({ submission_field });

    if (validationResult.error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: validationResult.error.details[0].message });
    }

    const assignment = await Assignment.create({
      ...validationResult.value,
      status: "Awaiting Grade",
      date_submitted: Date.now(),
      submitted_by: user.userId,
    });

    // update the submitted_assignments field (id) in user model/ collection
    const student = await User.findByIdAndUpdate(
      user.userId,
      {
        $addToSet: { submitted_assignments: assignment._id },
      },
      { new: true }
    );

    // if no assignment is submitted successfully
    if (!assignment) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Assignment not submitted successfully!" });
    }

    res.status(StatusCodes.CREATED).json({
      submitted: {
        due_date: assignment.due_date,
        date_submitted: assignment.date_submitted,
        status: assignment.status,
        submission_field: assignment.submission_field,
      },
    });
  } catch (err) {
    //res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    next(err);
  }
};

/**
 * @desc deleteAssignment function to Delete submitted assignment
 * @param {req, res, next}
 * @output {res} Json response
 */
const deleteAssignment = async (req, res, next) => {
  try {
    const user = req.user;

    // get the id of the assignment the use is trying to delete
    const assignmentId = req.params.id;

    // check if it the user that owns the assignment
    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Can't find the assignment!" });
    }

    if (!assignment.submitted_by.equals(user.userId)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "You can't delete an assignment that doesn't belongs to you!",
      });
    }

    // find if the assignment has been submitted or exist in the user collection.
    const updated = await User.findByIdAndUpdate(
      user.userId,
      {
        $pull: { submitted_assignments: assignmentId },
      },
      { new: true }
    );

    // Find and delete the assignment from the assignment collections
    const deletedAssignment = await Assignment.findByIdAndRemove(assignmentId);

    // return a response
    res
      .status(StatusCodes.ACCEPTED)
      .json({ message: "Assignment deleted successfully!" });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc getAllAssignments function to Get all assignments for a student
 * @param {req, res, next}
 * @output {res} Json response
 */
const getAllAssignments = async (req, res, next) => {
  try {
    const user = req.user;

    const userDetails = await User.findById(user.userId);

    const assignments = await Assignment.find({
      _id: { $in: userDetails.submitted_assignments },
    });

    if (!assignments) {
      return res
        .status(StatusCodes.NotFound)
        .json({ message: "User does not have any assignment!" });
    }

    res.status(StatusCodes.OK).json({ assignments: assignments });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc getOneAssignment function to Get a single assignment for a student
 * @param {req, res, next}
 * @output {res} Json response
 */
const getOneAssignment = async (req, res, next) => {
  try {
    user = req.user;

    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Can't find the assignment!" });
    }

    if (!assignment.submitted_by.equals(user.userId)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "You can't get an assignment that doesn't belongs to you!",
      });
    }

    res.status(StatusCodes.OK).json({ assignment });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc getAssignmentGrade function to Get display a grade for an assignment for a student
 * @param {req, res, next}
 * @output {res} Json response
 */

const getAssignmentGrade = async (req, res, next) => {
  try {
    const user = req.user;

    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Can't find the assignment!" });
    }

    if (!assignment.submitted_by.equals(user.userId)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "You can't get an assignment that doesn't belongs to you!",
      });
    }

    if (assignment.status !== "Graded") {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Assignment has not been graded!" });
    }

    res.status(StatusCodes.OK).json({ assignment });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  submitAssignment,
  deleteAssignment,
  getAllAssignments,
  getOneAssignment,
  getAssignmentGrade,
};

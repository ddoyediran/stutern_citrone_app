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
      status: "Completed",
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

module.exports = {
  submitAssignment,
};

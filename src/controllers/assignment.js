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
  submission_link: Joi.string().min(3).required(),
});

function validate(inputObj) {
  const value = schema.validate(inputObj);
  return value;
}

/**
 *
 * @desc getAllAssignments function to Submit Assignment
 * @param {req, res, next}
 * @output {*}
 */
const getAllAssignments = async (req, res, next) => {
  const users = req.user;

  const findUser = await User.findById(users.userId);

  if (!findUser) {
    return res.status(StatusCodes.NotFound).json({ msg: "User not found!" });
  }

  const allAssignments = await findUser.assignments;

  res.status(StatusCodes.OK).json({ assignments: allAssignments });
};

/**
 *
 * @desc createAssignment function to Submit Assignment
 * @param {req, res, next}
 * @output {*}
 */
const createAssignment = async (req, res, next) => {
  const assignmentDesc = req.body.assignmentDesc;

  const assignment = await Assignment.findByIdAndUpdate(
    req.body.id,
    {
      description: assignmentDesc,
    },
    { new: true }
  );

  res.status(StatusCodes.CREATED).json({ assignment: assignment });
};

/**
 *
 * @desc submitAssignment function to Submit Assignment
 * @param {req, res, next}
 * @output {*}
 */
const submitAssignment = async (req, res, next) => {
  try {
    const user = req.user;

    // check if user details exist
    // find user in the database and check if user has access to this assignment
    const findUser = await User.findById(user.userId);

    if (!findUser) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found!" });
    }

    const result = validate({ submission_link: req.body.submission_link });

    if (result.error) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: result.error.details[0].message });
    }

    const findAssignment = await Assignment.findById(req.body.assId);

    findAssignment.submission_link = req.body.submission_link;

    const submit = await findAssignment.save();

    res.status(StatusCodes.Success).json({ submit: submit });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  submitAssignment,
  createAssignment,
};

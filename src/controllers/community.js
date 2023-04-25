const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");

/**
 * @desc getAllUsers function to get users to display in the community section
 * @param {req, res, next}
 * @output {res} Json response
 */

const getAllUsers = async (req, res, next) => {
  try {
    const user = req.user;

    const users = await User.find(
      {},
      { password: 0, confirmPassword: 0, email: 0 }
    );

    if (!users) {
      return res
        .status(StatusCodes.NotFound)
        .json({ message: "Users not found!" });
    }

    res.status(StatusCodes.OK).json({ users });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllUsers,
};

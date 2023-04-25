const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");

/**
 * @desc getUserDetails function to get user details for dashboard
 * @param {req, res, next}
 * @output {res} Json response
 */
const getUserDetails = async (req, res, next) => {
  try {
    const user = req.user;

    const userDetails = await User.findById(user.userId, {
      password: 0,
      confirmPassword: 0,
    });

    if (!userDetails) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found!" });
    }

    res.status(StatusCodes.OK).json({ user: userDetails });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUserDetails,
};

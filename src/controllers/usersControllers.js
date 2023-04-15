const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

//@desc Getting all users
//@route GET method - /api/v1/users

const getAllUsers = async (req, res) => {
  try {
      /** Validating to check for users */
      const users = await User.find().sort("firstname");
      if (users.length === 0) {
          throw new BadRequestError("No usesr currently registered");
      };
       
      res.status(StatusCodes.OK).json(users);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ message: error.message })
  }
};


module.exports = { getAllUsers };
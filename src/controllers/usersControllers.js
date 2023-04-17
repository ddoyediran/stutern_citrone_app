const User = require("../models/user");

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
    }

    res.status(StatusCodes.OK).json(users);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
  }
};

//@desc Get a user
//@route GET /api/v1/users/user/:id
const getUser = async (req, res) => {

    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            throw new BadRequestError("This user does not exist");
        }
        res.status(StatusCodes.OK).json({ 
            firstName: user.firstName, 
            lastName: user.lastName,
            email: user.email
        });

    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

//@desc Deleting a User
//@route DELETE /api/v1/users/delete/:id
const deleteUser = async (req, res) => {
    try {
        //checking if a user exists
        const user = await User.findById(req.params.id);
        if (!user) {
            throw new BadRequestError("This user does not exist");
        }
        await User.deleteOne();
        res.status(StatusCodes.OK).json({ message: "user was successfully deleted" });
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).json({ error: err.message });
    }
};

module.exports = { getAllUsers, deleteUser, getUser };

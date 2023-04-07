const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const { createUserPayload, attachCookiesToResponse } = require("../utils");

//@desc Register a user
//@route POST method - /api/v1/users/register
const registerUser = async (req, res) => {
  try {
    //validation input fields
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(StatusCodes.BAD_REQUEST);
      throw new BadRequestError("All fields are mandatory");
    }

    //checking for an already existing user with the email
    const emailAreadyExists = await User.findOne({ email });
    if (emailAreadyExists) {
      res.status(StatusCodes.BAD_REQUEST);
      throw new BadRequestError("This user already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
    });
    res.status(StatusCodes.CREATED).json({ _id: user.id, email: user.email });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

//@desc Login a user
//@route POST method - /api/v1/users/login
const login = async (req, res, next) => {
  try {
    // check if user type something in the password and email field
    const { email, password } = req.body;

    // tell them to type their email and password
    if (!email || !password) {
      throw new BadRequestError("Please enter your email and password!");
    }

    // check (email) the database if the user exist
    const user = await User.findOne({ email });

    if (!user) {
      throw new UnauthenticatedError("Username or password incorrect!");
    }

    // comparing the hashed-password from request-body with
    //the password stored in the database
    const isPasswordCorrect = await user.comparePassword(password);
    // email and password is not correct
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError("Username or password incorrect!");
    }
    // add token to the user's payload
    const userPayload = createUserPayload(user);
    // send the user detail/ payload to the frontend folks.
    attachCookiesToResponse({ res, user: userPayload });

    res.status(StatusCodes.OK).json({ user: userPayload });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

//@ Desc logout a user
//@route GET method - /api/v1/users/logout
const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out" });
};

module.exports = {
  registerUser,
  login,
  logout,
};

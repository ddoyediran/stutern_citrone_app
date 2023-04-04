const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const { createUserPayload, attachCookiesToResponse } = require("../utils");

// To login user
const login = async (req, res, next) => {
  // check if user type something in the password and email field
  const { email, password } = req.body;

  // tell them to type their email and password
  if (!email || !password) {
    throw new BadRequestError("Please enter your email and password!");
  }

  // check (email) the database if the user exist
  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("Credentials not valid!");
  }

  // check compare the hash password with what we have in the database
  const isPasswordCorrect = await user.comparePassword(password);
  // email and password is not correct
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Credentials not valid!");
  }
  // add token to the user's payload 
  const userPayload = createUserPayload(user);
  // send the user detail/ payload to the frontend folks.
  attachCookiesToResponse({ res, user: userPayload });

  res.status(StatusCodes.OK).json({ user: userPayload });
};

// logout user
const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out" });
};

module.exports = {
  login,
  logout,
};

// login user

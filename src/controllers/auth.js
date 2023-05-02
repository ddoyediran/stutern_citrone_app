const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const { createUserPayload, attachCookiesToResponse } = require("../utils");

//@desc Register a user
//@route POST method - /api/v1/users/register
const registerUser = async (req, res) => {
  try {
    //validation input fields

    const {
      picture,
      avatar,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      gender,
      phoneNumber,
      pronouns,
      track,
      bio,
      portfolio,
    } = req.body;

    if (!email || !password) {
      res.status(StatusCodes.BAD_REQUEST);
      throw new BadRequestError("All fields are mandatory");
    }

    //checking for an already existing user with the email
    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists) {
      res.status(StatusCodes.BAD_REQUEST);
      throw new BadRequestError("User already exists!");
    }

    const user = await User.create({
      picture,
      avatar,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      gender,
      phoneNumber,
      pronouns,
      track,
      bio,
      portfolio,
    });
    res.status(StatusCodes.CREATED).json({ message: "User successfuly created",
      _id: user.id,
      email: user.email,
    });

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
      throw new BadRequestError("Enter your email and password!");
    }

    // check (email) the database if the user exist
    const user = await User.findOne({ email });

    if (!user) {
      throw new UnauthenticatedError("username or password incorrect!");
    }

    // comparing the hashed-password from request-body with
    //the password stored in the database
    const isPasswordCorrect = await user.comparePassword(password);
    
    // email and password is not correct
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError("username or password incorrect!");
    }
    // add token to the user's payload 
    const userPayload = createUserPayload(user);
    // send the user detail/ payload to the frontend folks.
    const token = attachCookiesToResponse({ res, user: userPayload });

    res.status(StatusCodes.OK).json({ user: userPayload, token: token }); // user: userPayload
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
  }
};

//@ Desc current logged in  user
//@route GET method - /api/v1/users/current

const currentUser = async (req, res) => {
  res.json(req.user);
};

//@ Desc logout a user
//@route GET method - /api/v1/users/logout
const logout = async (req, res, next) => {
  try {
    res.cookie("token", "logout", {
      httpOnly: true,
      expires: new Date(Date.now() + 1000),
    });
    res.status(StatusCodes.OK).json({ message: "User logged out" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  registerUser,
  login,
  currentUser,
  logout,
};



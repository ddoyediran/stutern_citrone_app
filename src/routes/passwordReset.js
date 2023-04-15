const User = require("../models/user.js");
const Token = require("../models/token.js");
const sendEmail = require("../utils/sendEmails.js");
const Joi = require("joi");
const crypto = require("crypto");
const express = require("express");
const { StatusCodes } = require("http-status-codes");
const router = express.Router();

/** This is the implementation for sending password reset link  */
//@route PUT method - /api/v1/settings/profile/:id
router.post("/sendresetmail", async (req, res) => {
  try {
    const schema = Joi.object({ email: Joi.string().email().required() });
    const { error } = schema.validate(req.body);
    if (error)
      return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

    const user = await User.findOne({ email });
    if (!user)
      return res.status(StatusCodes.BAD_REQUEST).send("user does not exist");

    const token = await Token.findOne({ userId: user._id });
    if (!token) {
      token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
    }
  } catch (error) {}
});

module.exports = router;

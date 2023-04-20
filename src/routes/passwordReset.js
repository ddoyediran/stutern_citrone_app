const User = require("../models/user.js");
//const { isTokenValid } = require("../utils/jwt");
const Token = require("../models/token.js");
const sendEmail = require("../utils/sendEmails.js");
const Joi = require("joi");
const crypto = require("crypto");
const express = require("express");
const { StatusCodes } = require("http-status-codes");
const router = express.Router();

/** This is the implementation for sending password reset link  */
//@route POST method - /api/v1/users/password-reset
router.post("/password-reset", async (req, res) => {
    try {
        const schema = Joi.object({ email: Joi.string().email().required() });
        const { error } = schema.validate(req.body);
        if (error)
            return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

        const user = await User.findOne({ email: req.body.email });

        console.log(user)
        if (!user)
            return res.status(StatusCodes.BAD_REQUEST).send("user does not exist");

           let token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        //let token = await Token.findOne({ userId: user._id });
        //console.log("Token check: ", token)
        // if (!token) {
        //     token = await new Token({
        //         userId: user._id,
        //         token: crypto.randomBytes(32).toString("hex"),
        //     }).save();
        // };
        //${user.firstName} ${user.lastName}
        const link = `Dear Subscriber, 
        You recently requested to reset your password. 
        Please click on the link below to reset your password:
        ${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`; //http://${req.headers.host}
        await sendEmail(user.email, "PASSWORD RESET", link);
        res.status(StatusCodes.OK).json("Password reset link has been sent to your email address");
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(error.message);
    }
});

/** This is the implementation for reseting the password */
//@route POST method - /api/v1/users/password-reset/:userId/:token

router.post("/password-reset/:userId/:token", async (req, res) => {
    try {
        /** If you're using a custom password() function in the 
         * Joi schema validation, you'll need to define the 
         * function separately and add it to the Joi object. */
        Joi.password = () => Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'));
        const schema = Joi.object({
            password: Joi.password().required(),
            confirmPassword: Joi.string().valid(Joi.ref('password')).required()
        }).with('password', 'confirmPassword');
        const { error } = schema.validate(req.body);
        if (error)
            return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

        const user = await User.findById(req.params.userId);
        if (!user)
            return res.status(StatusCodes.BAD_REQUEST).send("user does not exist");

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token
        });

        if (!token)
            return res.status(StatusCodes.BAD_REQUEST).send("The link is invalid or expired");

        user.password = req.body.password;
        user.confirmPassword = req.body.confirmPassword;
        await user.save();
        /** the if (token.delete) { await token.delete(); } code is a 
         * defensive programming technique that prevents a TypeError from 
         * occurring if the token object is null or undefined */
        if (token.delete) {
            await token.delete();
        }

        res.status(StatusCodes.OK).json("Password was successfully reset");

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({message: "An error occured", error: error.message});
        console.log(error);
    }
})

module.exports = router;
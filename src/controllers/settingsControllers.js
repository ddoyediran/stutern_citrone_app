const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");




//@desc Updarting user's Profile 
//@route PUT method - /api/v1/settings/profile/:id 
const profileSetting = async (req, res) => {
    try {
        /** validation for user existence */
        const user = await User.findById(req.params.id);
        if(!user) {
            throw new BadRequestError("This user does not exist");
        }
        /** Updating the existing user */
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
          res.status(StatusCodes.OK).json({ message: "user successfully updated"});
    } catch (error) {
        console.log(error.message);
        res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
    }
};

module.exports = { profileSetting };
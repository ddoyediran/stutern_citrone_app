const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const cloudinary = require("../utils/cloudinary");

//@desc Updating user's Profile
//@route PUT method - /api/v1/settings/profile/:id
const profileSetting = async (req, res) => {
  try {
    /** validation for user existence */
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new BadRequestError("This user does not exist");
    }

    // upload profile picture to cloudinary
    //const result = await cloudinary.uploader.upload(req.file.path);

    let result = {
      secure_url: user.picture || "",
      public_id: user.cloudinary_id || "",
    };

    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path);
    }

    /** Updating the existing user */
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        picture: result.secure_url,
        cloudinary_id: result.public_id,
      },
      {
        fields: { password: 0, confirmPassword: 0, submitted_assignments: 0 },
        new: true,
      }
    );
    res
      .status(StatusCodes.OK)
      .json({ message: "user successfully updated", updatedUser });
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
  }
};


//@desc Updating user's Profile
//@route PUT method - /api/v1/settings/security/:id
const securitySetting = async (req, res, next) => {
  try {
    //cheking if user exists
    const user = await User.findById(req.params.id);
    if (!user) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: "false", message: "User not found" });
    }

    await User.findByIdAndUpdate(req.params.id,
      ...req.body,
      {
        new: true,
      })

    res
      .status(StatusCodes.OK)
      .json({ message: "security settings successfully updated" })
  } catch (error) {
    next(error);
  }
}

module.exports = { profileSetting, securitySetting };

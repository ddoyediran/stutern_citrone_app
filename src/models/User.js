const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
  picture: {
    type: String

  },
  avatar: {
    type: String
  },
  firstName: {
    type: String,
    minlength: 2,
    maxlength: 50
  },
  lastName: {
    type: String,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: [true, "Email address already taken"]
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  confirmPassword: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (v) {
        return v === this.password;
      },
      message: "Passwords do not match"
    }
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Non-Binary", "Others"],
  },
  phoneNumber: {
    type: Number,

  },
  pronouns: {
    type: String,
    enum: ["he/him", "she/her", "they/them", "Others"],
  },
  track: {
    type: String,
    enum: ["UI/UX", "Frontend Development", "Backend Development",
      "Data Science", "Mobile Development", "Software Testing",
      "Blockchain", "DevOps"],

  },
  bio: {
    type: String,
  },
  portfolio: {
    type: String,
  },
},
  {
    timestamps: true
  }
);

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.confirmPassword = await bcrypt.hash(this.confirmPassword, salt);
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);

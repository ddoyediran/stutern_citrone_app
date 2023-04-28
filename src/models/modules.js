const mongoose = require("mongoose");

const moduleSchema = mongoose.Schema(
  {
    courseModule: {
      name: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      modulePicture: {
        type: String,
      },
    },
    lesson: {
      name: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      fileUrl: {
        type: String,
        required: true,
      },
    },
    liveClassUrl: {
      type: String,
      required: true,
    },
    recordedClassUrl: {
      type: String,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Module", moduleSchema);

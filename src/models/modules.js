const mongoose = require("mongoose");

const moduleSchema = mongoose.Schema({
    lessonName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    fileUrl: {
        type: String,
        required: true
    },
    courses: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },
    liveClassLink: {
        type: String,
        required: true
    },
    recordedClassLink: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Module", moduleSchema);
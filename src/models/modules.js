const mongoose = require("mongoose");

const moduleSchema = mongoose.Schema({
    module: {
        name: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        }
    },
    lesson: {
        name: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        fileUrl: {
            type: String,
            required: true
        }
    },
    liveClassUrl: {
          type: String,
          required: true
    },
    recordedClassUrl: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Module", moduleSchema);
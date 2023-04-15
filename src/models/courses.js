const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
    moduleName: {
        type: String,
        required: true
    },
    moduleImage: {
        type: String
    },
    level: {
        type: String,
        enum: ["Beginner", "Intermediate"]
    },
    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Course", courseSchema);
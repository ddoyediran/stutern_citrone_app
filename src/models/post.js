const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
    {
        postedBy: {
            type: String,
            required: true
        },
        post: {
            type: String,
            required: [true, "Field cannot be empty"]
        },
        track: {
            type: String,
            required: true
        },
        replies: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Reply",
            },
        ]
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Post", postSchema);

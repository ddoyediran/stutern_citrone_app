const mongoose = require("mongoose");

const replySchema = mongoose.Schema(
    {
        repliedBy: {
            type: String,
            required: true
        },
        reply: {
            type: String,
            required: [true, "Field cannot be empty"]
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Reply", replySchema);

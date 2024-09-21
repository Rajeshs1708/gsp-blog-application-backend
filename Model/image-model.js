const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    image: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
})
module.exports = mongoose.model("images", imageSchema);
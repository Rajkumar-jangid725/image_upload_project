const mongoose = require("mongoose");

const imgSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String
    },
    description: String,
    size: String,
    tags: String
});

module.exports = ImageModel = mongoose.model("Image", imgSchema);

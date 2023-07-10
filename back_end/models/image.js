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
    image_details: String,
    size: String,
    tags: [String],
    thumbnail: String
});

module.exports = ImageModel = mongoose.model("Image", imgSchema);

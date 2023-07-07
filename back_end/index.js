const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
const port = 5000;
const fs = require("fs");
const imageModel = require("./models/image");
require("./connection/connection")
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

app.post("/api/image", upload.single("testImage"), async (req, res) => {
    try {
        const saveImage = imageModel({
            name: req.body.name,
            img: {
                data: fs.readFileSync("uploads/" + req.file.filename),
                contentType: "image/png",
            },
            image_details: req.body.image_details,
            size: req.body.size,
            tags: req.body.tags
        });
        await saveImage.save();
        res.status(201).json({ message: "Image uploaded successfully!" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to upload image." });
    }
});

app.get('/image', async (req, res) => {
    const allData = await imageModel.find()
    res.json(allData)
})

app.listen(port, () => {
    console.log("server running successfully");
});

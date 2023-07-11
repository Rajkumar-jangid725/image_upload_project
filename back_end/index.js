const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
const sharp = require('sharp');
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

const thumbnailsDir = "thumbnails";
if (!fs.existsSync(thumbnailsDir)) {
    fs.mkdirSync(thumbnailsDir);
}

const generateThumbnail = async (req, res, next) => {
    try {
        const { filename } = req.file;
        const thumbnailPath = `thumbnails/${filename}`;

        await sharp(`uploads/${filename}`)
            .resize(100, 100)
            .toFile(thumbnailPath);

        req.thumbnailPath = thumbnailPath;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to generate thumbnail." });
    }
};

app.post('/api/images', upload.single('testImage'), generateThumbnail, async (req, res) => {
    try {
        //const { originalname, size, path } = req.file;
        const originalname = req.file.filename;
        const size = req.file.size;
        const path = req.file.path;

        //const { name, image_details, tags, thumbnail } = req.body;
        const name = req.file.filename;
        const image_details = req.body.image_details;
        const tags = req.body.tags;
        const thumbnail = req.thumbnailPath;

        const image = new imageModel({
            name,
            size,
            image_details,
            tags: tags.split(',').map((tag) => tag.trim()),
            path,
            thumbnail: req.thumbnailPath
        });
        await image.save();
        res.status(201).json({ message: 'Image uploaded successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// app.post('/image_uploads', upload.single('testImage'), generateThumbnail, async (req, res) => {
//     try {
//         const { originalname, size, path } = req.file;
//         const { name, image_details, tags, thumbnailPath } = req.body;
//         const image = new imageModel({
//             name,
//             size,
//             image_details,
//             tags: tags.split(',').map((tag) => tag.trim()),
//             path,
//             thumbnail: req.thumbnailPath
//         });

//         await image.save();

//         res.status(201).json({ message: 'Image uploaded successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

app.use('/thumbnails', express.static('thumbnails'));
app.use('/images', express.static('uploads'));

app.get("/", async (req, res) => {
    try {
        const allData = await imageModel.find({}, { _id: 0, image: 0 });
        const dataWithThumbnails = allData.map((data) => ({
            ...data._doc,
            thumbnail: `http://localhost:${port}/${data.thumbnail}`
        }));
        res.json(dataWithThumbnails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch image data." });
    }
});

app.listen(port, () => {
    console.log("server running successfully");
});

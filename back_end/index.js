const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
const sharp = require('sharp');
const port = 5000;
const fs = require("fs");
const path = require('path')
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
        const size = req.body.size;
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
        res.status(201).json({ message: 'Image uploaded successfully', id: image._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.use('/thumbnails', express.static('thumbnails'));
app.use('/images', express.static('uploads'));

app.get("/", async (req, res) => {
    try {
        const allData = await imageModel.find({}, { _id: 1, image: 0 });
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

app.get('/api/image/:name', (req, res) => {
    const { name } = req.params;
    res.sendFile(`${__dirname}/uploads/${name}`);
});

app.get("/image/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const data = await imageModel.findById({ _id });
        res.status(200).json({ data: { ...data._doc } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch image data." });
    }
});

app.delete("/image/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const data = await imageModel.findById(_id);
        const imagePath = path.join(__dirname, 'uploads', data.name);
        const imageThumbnail = path.join(__dirname, data.thumbnail)
        if (!fs.existsSync(imagePath)) {
            return res.status(404).send("Image not found");
        }
        fs.unlinkSync(imagePath);

        if (!fs.existsSync(imageThumbnail)) {
            return res.status(404).send("Image not found");
        }
        fs.unlinkSync(imageThumbnail);

        const deleteData = await imageModel.findByIdAndDelete(_id);
        if (!_id) {
            return res.status(400).send()
        }
        res.send(deleteData);
    }
    catch (e) {
        res.send(e);
    }
})

app.listen(port, () => {
    console.log("server running successfully");
});

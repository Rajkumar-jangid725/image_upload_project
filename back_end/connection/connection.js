const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/imageGallery',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => {
    console.log("Connection Established.")
}).catch(() => {
    console.log("No Connection.")
})
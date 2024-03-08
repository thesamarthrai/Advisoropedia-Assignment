// User Name : KIITSwap
// Password : 4QscLwXjXwcqwNN1

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
const homeRouter = require('./routers/homeRouter')
const ejs = require("ejs");
const port = process.env.port||8082;

const app = express();

// Connect Database
mongoose.connect('mongodb+srv://Advisoropedia:8ByrpuHuLjMS74BK@advisoropedia.2o0brt0.mongodb.net/?retryWrites=true&w=majority&appName=Advisoropedia', {useNewUrlParser:true});
const db = mongoose.connection;
db.on("error", ()=>{console.log("error");})
db.once("open", ()=>{console.log("connected");})

app.set('view engine', 'ejs');
app.use(fileUpload());
app.use(express.static("./public"));
app.use(
    fileUpload({
        limits: {
            fileSize: 10000000, // Around 10MB
        },
        abortOnLimit: true,
    })
);

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/', homeRouter)

app.listen(port, () => {
    console.log("Listen on the port 8082");
});

app.post('/register', (req, res) => {
    // Get the file that was set to our field named "image"
    const { image } = req.files;

    // If no image submitted, exit
    if (!image) return res.sendStatus(400);

    // If does not have image mime type prevent from uploading
    if (/^image/.test(image.mimetype)) return res.sendStatus(400);

    // Move the uploaded image to our upload folder
    image.mv(__dirname + '/public/Images' + image.name);

    // All good
    res.sendStatus(200);
});
require('dotenv').config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const mongoose = require("mongoose");
const db_connect = require("./create_db");
const Image = require("./models/image");

const bodyParser = require("body-parser");

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get("/api/images", (req, res)=>{
    Image.find()
        .then(image => res.status(200).json(image))
        .catch(err => res.status(400).json({err}));
})

app.post("/api/image", (req, res) => {
    const image = new Image({ ...req.body });
    image.save()
        .then(() => res.status(201).json("Ok"))
        .catch((err) => res.status(400).json({err}));
})

app.get("/api/tags", (req, res)=>{
    Image.distinct("tag")
        .then(tags => res.status(200).json(tags))
        .catch(err => res.status(400).json({err}));
})


db_connect()
    .then( ()=>{
        app.listen(port, ()=>{
            console.log(`App started on http://localhost:${port}`);
        })
    })
    .catch(()=>{
        console.log("DB ERROR - Can't connect to DB. APplication start failed.");
    })

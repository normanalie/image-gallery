require('dotenv').config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const mongoose = require("mongoose");
const db_connect = require("./create_db");
const Image = require("./models/image");

app.use(express.static('public'));

app.get("/api/images", (req, res)=>{
    Image.find()
        .then(image => res.status(200).json(image))
        .catch(err => res.status(400).json({err}));
})

app.get("/api/tags", (req, res)=>{
    tags = [];
    for(var elem of db){
        if(!tags.includes(elem.tag)) tags.push(elem.tag);
    }
    res.send(tags);
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

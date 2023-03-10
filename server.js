require('dotenv').config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const mongoose = require("mongoose");
const db_connect = require("./create_db");

app.use(express.static('public'));

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


const galleryRouter = require("./routes/gallery");
app.use("/api", galleryRouter);

const authRouter = require("./routes/auth");
app.use("/api/user", authRouter)


db_connect()
    .then( ()=>{
        app.listen(port, ()=>{
            console.log(`App started on http://localhost:${port}`);
        })
    })
    .catch(()=>{
        console.log("DB ERROR - Can't connect to DB. APplication start failed.");
    })

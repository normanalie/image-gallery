require('dotenv').config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const mongoose = require("mongoose");
const db_connect = require("./create_db");

const bodyParser = require("body-parser");

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


const galleryRouter = require("./routes/gallery");
app.use("/api", galleryRouter);

const userRouter = require("./routes/user");
app.use("/api/user", userRouter)


db_connect()
    .then( ()=>{
        app.listen(port, ()=>{
            console.log(`App started on http://localhost:${port}`);
        })
    })
    .catch(()=>{
        console.log("DB ERROR - Can't connect to DB. APplication start failed.");
    })

require('dotenv').config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

db = [
    {"src": "https://image.freepik.com/free-photo/stylish-young-woman-with-bags-taking-selfie_23-2147962203.jpg", "alt": "Selfie taking", "tag": "selfie"},
    {"src": "https://upload.wikimedia.org/wikipedia/commons/e/e4/GHS_Bannu.jpg", "alt": "GHS Bannu", "tag": "wikipedia"}
]

app.get("/api/images", (req, res)=>{
    res.send(db);
})

app.get("/api/tags", (req, res)=>{
    tags = [];
    for(var elem of db){
        if(!tags.includes(elem.tag)) tags.push(elem.tag);
    }
    res.send(tags);
})

app.listen(port, ()=>{
    console.log(`App started on http://localhost:${port}`);
})
require('dotenv').config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get("/api/images", (req, res)=>{
    db = [
        {"src": "https://image.freepik.com/free-photo/stylish-young-woman-with-bags-taking-selfie_23-2147962203.jpg", "alt": "Selfie taking", "tag": "selfie"},
        {"src": "https://upload.wikimedia.org/wikipedia/commons/e/e4/GHS_Bannu.jpg", "alt": "GHS Bannu", "tag": "wikipedia"}
    ]
    res.send(db);
})

app.listen(port, ()=>{
    console.log(`App started on http://localhost:${port}`);
})
require('dotenv').config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

db = [
    {"src": "https://image.freepik.com/free-photo/stylish-young-woman-with-bags-taking-selfie_23-2147962203.jpg", "alt": "Selfie taking", "tag": "selfie"},
    {"src": "https://upload.wikimedia.org/wikipedia/commons/e/e4/GHS_Bannu.jpg", "alt": "GHS Bannu", "tag": "wikipedia"},
    {"src": "https://images.unsplash.com/photo-1603112579965-e24332cc453a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", "alt": "Unsplash", "tag": "selfie"},
    {"src": "https://plus.unsplash.com/premium_photo-1677346803988-ba9f95d457e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80", "alt": "Unsplash", "tag": "wikipedia"},
    {"src": "https://images.unsplash.com/photo-1522336790276-f23c9db054a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80", "alt": "GHS Bannu", "tag": "wikipedia"}
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
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.post("/signup", (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({message: "User created"}))
                .catch((err) => {
                    if(err.code == 11000){
                        res.status(400).json({message: "Email not unique", code: err.code});
                    }else{
                        res.status(400).json({err});
                    }
                });
        })
        .catch((err)=> res.status(500).json({err}));
})

router.post("/login", (res, req) => {
    
})

module.exports = router;
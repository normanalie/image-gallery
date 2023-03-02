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

router.post("/login", (req, res) => {
    User.findOne({email: req.body.email})
        .then((user) => {
            if(!user) return res.status(401).json({message: "email not found"});
            bcrypt.compare(req.body.password, user.password )
                .then((valid) => {
                    if(!valid) return res.status(401).json({message: "invalid password"});
                    res.status(200).json({
                        userId: user._id,
                        token: "TOKEN"
                    });
                })
                .catch((err) => {
                    res.status(400).json({err});
                });
        })
        .catch((err) => {
            res.status(500).json({err});
        });
})

module.exports = router;
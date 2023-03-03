require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");

function authMW(req, res, next){
    var token = req.headers.authorization;
    if(token){
        token = token.split(' ')[1];
     } else{ 
        return res.status(401).json({message: "Not logged in"});
     }

    jwt.verify(token, process.env.SECRET || "DEVELOPPEMENT", (err, userId)=>{
        if(err) return res.status(403).json({err});
        req.userId = userId;
        next();
    })
}

module.exports = authMW;
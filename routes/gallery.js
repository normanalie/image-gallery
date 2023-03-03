const express = require("express");
const router = express.Router();

const Image = require("../models/image");
const authMW = require("../middleware/authMW");

router.get("/images", (req, res)=>{
    Image.find()
        .then(image => res.status(200).json(image))
        .catch(err => res.status(400).json({err}));
})

router.post("/image", authMW, (req, res) => {
    const image = new Image({ ...req.body });
    image.save()
        .then(() => res.status(201).json("Ok"))
        .catch((err) => res.status(400).json({err}));
})

router.get("/tags", (req, res)=>{
    Image.distinct("tag")
        .then(tags => res.status(200).json(tags))
        .catch(err => res.status(400).json({err}));
})

module.exports = router;
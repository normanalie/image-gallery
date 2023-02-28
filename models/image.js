const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
    url: {type: String, required: true},
    alt: {type: String, required: true},
    tag: {type: String, required: false}
});

module.exports = mongoose.model('Image', imageSchema);
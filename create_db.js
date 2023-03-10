require("dotenv").config();

const mongoose = require("mongoose");   

const user = encodeURIComponent(process.env.DB_USER);
const pass = encodeURIComponent(process.env.DB_PASS);                                                                           
const url = `mongodb+srv://${user}:${pass}@cluster0.apwyjet.mongodb.net/image-gallery?retryWrites=true&w=majority`;

async function run() {
    try {
      console.log(`[MONGODB] - Try connection to ${url}`);
      await mongoose.connect(url);
      console.log("[MONGODB] - Connected.");
    } catch(err) {
        console.log(err.stack);
    }
  }

module.exports = run;

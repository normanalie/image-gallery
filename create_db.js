require("dotenv").config();

const { MongoClient, ServerApiVersion } = require("mongodb");   

const user = encodeURIComponent(process.env.DB_USER);
const pass = encodeURIComponent(process.env.DB_PASS);                                                                           
const url = `mongodb+srv://${user}:${pass}@cluster0.apwyjet.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
      console.log(`[MONGODB] - Try connection to ${url}`);
      await client.connect();
      console.log("[MONGODB] - Connected.");
    } catch(err) {
        console.log(err.stack);
    } finally {
      await client.close();
    }
  }

if(user && pass){
    run();
} else {
    console.log("[MONGODB] - Unable to find DB_USER or DB_PASS in .env");
}

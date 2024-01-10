const MongoClient = require('mongodb').MongoClient; 

// read the variable from the .env file 
// and save it to process.env
require("dotenv").config(); 

const mongoURL = process.env.MONGO_URL; 

// We are going to use 'await' to wait for some
// asynchronous operaton to finish
async function main (){
    // create the mongo client
    // the connection function has two parameters
    // the first one: connection string (to get from mongo atlas)
    // the second parameter: options 
    const client = await MongoClient.connect(mongoURL, {
        'useUnifiedTopology': true // its for using the latest version of MongoDB
    }); 
    // connection 
    const db = client.db("sample_airbnb");
    console.log("database connection");
    const listing = await db.collection("listingsAndReviews").find().limit(10).toArray();
    console.log(listing); 
}
main(); 
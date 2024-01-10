const express = require("express");
require ("dotenv").config(); 
const mongoCLient = require("mongodb").MongoClient; 

const app = express(); 
app.set("view engine", "hbs");

async function main(){
    const client = await MongoClient.connect(process.env.MONGO_URL); 
    const db = client.db("sample_airbnb");

    // req: whatever the frontend is sending to the backend
    // res: whatever the backend is sending back to the frontend
    app.get('/listings', async function(req,res){
        const listings = await db.collections('listingsAndReviews')
                            .find()
                            .limit(10)
                            .toArray(); 
        res.render('listings', {
            "allListings":listings
        })
    })
}
main();

app.listen(3000, function(){ // the port number is "3000" 
    console.log("Server has started") 
   });
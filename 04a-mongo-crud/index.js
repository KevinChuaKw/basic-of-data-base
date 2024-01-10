const express = require("express");
require ("dotenv").config(); 
const hbs = require('hbs'); 
const app = express(); 

// make sure to put `./` to specify
// that we to require from the `mongoUtil.js`
// that is in the same directory as the current file (i.e, index.js)
const {connect} = require("./mongoUtil") // the './' is very important you need put this
app.set("view engine", "hbs");

async function main(){
    const db = await connect(process.env.MONGO_URL, 'sctp01_cico');

    }
main();

app.listen(3000, function(){ // the port number is "3000" 
    console.log("Server has started") 
   });
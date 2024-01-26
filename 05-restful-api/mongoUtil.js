// mongoUtil - this file contains utility functions for mongo
// Any JS file that have functions but does nothing but to export
// They are known as modules

const MongoClient = require("mongodb").MongoClient; 
let _db = null; 

async function connect(mongoURL, databaseName) {
    const client = await MongoClient.connect(mongoURL);
    const db = client.db(databaseName);
    console.log("Mongo DB connected")
    _db = db; 
    return db;
}

function getDB(){
    return _db; 
}

module.exports = {connect, getDB}; 
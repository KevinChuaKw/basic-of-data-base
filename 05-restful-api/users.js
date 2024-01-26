const express = require('express');

// create a router objects
// a router object can have routes
const router = express.Router();

// put in route here
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {getDB} = require('./mongoUtil');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

router.post('/', async function(req, res){
 
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = {
            username: req.body.username,
            password: hashedPassword
        };
        const db = getDB();
        const results = await db.collection("users").insertOne(newUser);
        res.json({
            "message":"creating a new user",
            "results": results
        });
   
});


// make sure to export the router objects
// so that other files liek index.js can use it
module.exports = router;

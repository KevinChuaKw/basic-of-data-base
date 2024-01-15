const express = require('express'); 

// Create a new router object
// a router object can have routes 
const router = express.Router(); 

// Put in route here 
router.post('/', async function(req,res0){
    res0.json({
        "message":"Creating a new user"
    })
})




// make sure to export the router object 
// So that other files, like index.js can use 
module.exports = router; 
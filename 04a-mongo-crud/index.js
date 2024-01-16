const express = require("express");
const { ObjectId } = require('mongodb');

const app = express();
app.set("view engine", "hbs");

// setup HBS and template inheritance using wax-on
const hbs = require('hbs');
const waxOn = require('wax-on');
waxOn.setLayoutPath("./views/layouts");
waxOn.on(hbs.handlebars);
const helpers = require('handlebars-helpers')({
    'handlebars': hbs.handlebars
})


// req.body will be always be undefined we app.use express.urlencoded
app.use(express.urlencoded({
    extend: false
}))

require("dotenv").config();

// make sure to put `./` to specify
// that we to require from the `mongoUtil.js`
// that is in the same directory as the current file (i.e, index.js)
const { connect } = require("./mongoUtil") // the './' is very important you need put this

// usually in the industry, if the variable name is in full caps
// this is a global constant
const COLLECTION = "foodRecords";

async function main() {
    const db = await connect(process.env.MONGO_URL, 'sctp01_cico');
    // Display the form 
    app.get('/', async function (req, res) {

        try {
            // We want to retrieve the documents from the collection
            // and convert it to and array of JSON objects 
            const foodRecords = await db.collection(COLLECTION)
                .find()
                .toArray();

            res.render('all-food-records', {
                'foodRecords': foodRecords
            })

        } catch (error) {
            console.error("Error retreiving food records", error);
            res.status(500).send("Internal Server Error")

        }
    });

    // Display the from to add food
    app.get('/add-food', function (req, res) {
        res.render("add-food");
    })

    app.post('/add-food', async function (req, res) {
        const foodName = req.body.foodName;
        const calories = req.body.calories;
        let tags = req.body.tags;
        if (tags) {
            // check if tags is already an array or a string? 
            if (!Array.isArray(tags))
                tags = [tags];
        } else {
            // if the tag is undefined set to an empty aray (meaning no
            // tag selected)
            tags = []
        }

        const results = await db.collection(COLLECTION).insertOne({
            "foodName": foodName,
            "calories": Number(calories),
            "tags": tags
        })
        console.log(results);

        res.redirect('/');
    })

    app.get("/delete-food/:foodRecordId", async function (req, res) {
        //findOne will return on result instead of an array
        const foodRecord = await db.collection(COLLECTION).findOne({
            "_id": new ObjectId(req.params.foodRecordId)
            // need to take note to put 'new' in front of 'ObjectId' from now onwards
        });

        res.render("confirm-delete", {
            foodRecord
        })
    });

    app.post("/delete-food/:foodRecordId", async function (req,res){
        await db.collection(COLLECTION).deleteOne({
            '_id': new ObjectId (req.params.foodRecordId)
        })
        res.redirect("/"); 
    })

    app.get('/update-food/:foodRecordId', async function(req,res){
        // findOne will return one result instead of an array
        const foodRecord = await db.collection(COLLECTION).findOne({
            "_id": new ObjectId(req.params.foodRecordId)
        }); 
        res.render('update-food',{
            foodRecord
        })
    })

    app.post('/update-food/:foodRecordId', async function(req,res){
        // anything retrieved is from req.body is a string, not number
        const foodName = req.body.foodName;
        const calories = req.body.calories; 
        let tags = req.body.tags;
        if (tags){
            // check if tags is already an array or a string
            if (!Array.isArray(tags)){
                tags = [tags];
            } 
        } else {
            // if tag is undefined set to an empty array (meaning no tags
            // selected)
            tags = []; 
        } 

        const results = await db.collection(COLLECTION).updateOne({
            "_id": new ObjectId(req.params.foodRecordId)
        }, {
            "$set":{
                "foodName": foodName,
                "calories": Number(calories),
                "tags": tags
            }
        }); 
        console.log(results);

        res.redirect('/'); 
    })

    app.get("/add-note/:foodid", async function(req,res){
        try {
            const foodId = req.params.foodid;
            const foodRecord = await db.collection(COLLECTION).findOne({
                "_id": new ObjectId(req.params.foodRecordId)
            }); 
            if (foodRecord){
                res.render('add-note',{
                    'food': foodRecord
                })
            } else {
                // error handling
                res.status(404).send("Food record not found")
            }
        } catch (e) {
            // catching the exception (when there is an error, the program counter
            // will first move in the first line of the catch block)
            res.status(500).send("Sorry something went wrong. Please try again later")
        }
    }); 

    app.post("/add-note/:foodid", async function (req,res){
        const foodId = req.params.foodid; 
        const noteContent = req.body.noteContent;
        const response = await db.collection(COLLECTION)
                                .updateOne({
                                    "_id": new ObjectId(foodId)
                                },{
                                    "$push":{
                                        "notes":{
                                            "_id": new ObjectId(),
                                            "content": noteContent
                                        }
                                    }
                                })
        res.redirect("/view-food/" + foodId); 
    })

    app.get("/view-food/:foodid", async function(req,res){
        const foodRecord = await db.collection(COLLECTION).findOne({
            "_id": new ObjectId(req.params.foodRecordId)
        }); 
        res.render('view-food', {
            'food': foodRecord
        })
    })


    
}


main();

app.listen(3000, function () {
    console.log("Server has started")
})
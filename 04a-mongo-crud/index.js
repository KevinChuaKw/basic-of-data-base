const express = require("express");
const {ObjectId} = require('mongodb');

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
    extend:false
}))

require ("dotenv").config();

const app = express();
app.set("view engine", "hbs");

// make sure to put `./` to specify
// that we to require from the `mongoUtil.js`
// that is in the same directory as the current file (i.e, index.js)
const {connect} = require("./mongoUtil") // the './' is very important you need put this

// usually in the industry, if the variable name is in full caps
// this is a global constant
const COLLECTION = "foodRecords"; 

async function main(){
    const db = await connect(process.env.MONGO_URL, 'sctp01_cico');
        // Display the form 
        app.get('/', async function(req,res){
            // We want to retrieve the documents from the collection
            // and convert it to and array of JSON objects 
            const foodRecords = await db.collection(COLLECTION)
                                        .find()
                                        .toArray();
            res.render('allFoodRecords',{
                'foodRecords': foodRecords
            })
        })
        
        app.get('/add-food', function(req,res){
            res.render("add-food"); 
        })

        app.post('/add-food', async function(req,res){
            const foodName = req.body.foodName;
            const calories = req.body.calories;
            let tags = req.body.tags; 
            if (tags){
                // check if tags is already an array or a string? 
                if (!Array.isArray(tags))
                    tags = [tags]; 
            } else {
                tags = []
            }

            const results = await db.collection(COLLECTION).insertOne({
                "foodName":foodName,
                "calories":Number(calories),
                "tags":tags
            })
            console.log(results);

            res.redirect('/'); 
        })

        app.get("/delete-food/:foodRecordId", async function(res,req){
            //findOne will return on result instead of an array
            const foodRecord = await db.collection(COLLECTION).findOne({
                "_id": new ObjectId(req.params.foodRecordId)
            }); 

            res.render("confirm-delete",{
                foodRecord
            })
        }); 

    }

main();

app.listen(3000, function(){ 
    console.log("Server has started") 
   });
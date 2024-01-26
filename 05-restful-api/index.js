const express = require("express");
const cors = require('cors');
const { ObjectId } = require('mongodb');
const userRoutes = require('./users'); 
const app = express(); 
app.use(express.json());
app.use(cors());
require("dotenv").config();
const { connect } = require("./mongoUtil") // the './' is very important you need put this
const { authenticateToken } = require('./middleware');

const COLLECTION = "accountRecords";
const mongoUrl = process.env.MONGO_URL;

async function main() {
    const db = await connect(mongoUrl, 'sctp01_cico');

    async function findExpenseById(expenseId){
        const expenseRecord = await db.collection(COLLECTION).findOne({
            "_id": new ObjectId(expenseId)
        }); 
        return expenseRecord; 
    }

    // Reading from the databaseName
    // Tested and works
    app.get('/showAll_expenses', async function (req, res) {

        const expenseRecords = await db.collection(COLLECTION)
            .find()
            .toArray();
        
        res.json({
            expenseRecords
        })
    });

    // Adding to the database 
    // Tested and works 
    app.post('/expenses', async function (req, res) {
        const user = req.body.user;
        const expenseAmount = req.body.expenseAmount;
        
        try {
            if (!user){
                res.status(400); 
                res.json({
                    "error":"Please enter user"
                })
                return; 
            }
            if (isNaN(expenseAmount)|| expenseAmount < 0) {
                res.json(400); 
                res.json({
                    'error':"Please enter expense amount correctly"
                }); 
                return; 
            } 
            
            let tags = req.body.tags; 
            if (tags){
                if(!Array.isArray(tags)){
                    tags= [tags]; 
                }
            } else {
                tags=[]; 
            }
        
            const results = await db.collection(COLLECTION).insertOne({
                "user": user,
                "expenseAmount": Number(expenseAmount),
                "tags": tags
            })
            
            res.json({
                "message":"Added successfully", 
                "results": results
            })
        } catch (e) {
            res.status(500).send({
                error: "Internal server error. Please contact admin"
            });
            console.log(e); 
        }
    }); 

    // deleting from the data base
    // Tested and works
    app.delete("/expense/:expenseRecordId", async function(req,res){
        const results = await db.collection(COLLECTION).deleteOne({
            "_id": new ObjectId(req.params.expenseRecordId)
        })
        res.json({
            "message":"Deleted successfully", 
            results
        });
    })

    // updating the database
    // Tested and works
    app.put("/expense/:expenseRecordId", async function (req,res){
        const user = req.body.user;
        const expenseAmount = req.body.expenseAmount;
        let tags = req.body.tags; 
        if (tags){
            if (!Array.isArray(tags)){
                tags = [tags]; 
            }
        } else {
            tags =[]; 
        }

        const results = await db.collection(COLLECTION).updateOne({
            "_id": new ObjectId(req.params.expenseRecordId)
        },{
            "$set":{
                "user": user,
                "expenseAmount": Number(expenseAmount),
                "tags": tags
            }
        }); 
        
        res.json({
            "message":"Updated record successfully", 
            results
        });
    })

    // Adding note within the entry (embeding)
    // 
    app.post("/expense/:expenseid/note", async function (req,res){
        const expenseId = req.body.expenseId;
        const noteContent = req.body.noteContent;
        const response = await db.collection(COLLECTION).updateOne({
            "_id": new ObjectId(expenseId)
        },{
            "$push":{
                "notes": {
                    "_id": new ObjectId(),
                    "content": noteContent 
                }
            }
        })
        res.json({
            'message':"note added successfully",
            "results": response
        })
    })

    // displaying all notes 
    // 
    app.get("/expense/:expenseid", async function (req,res){
        const expenseRecord = await findExpenseById(req.params.expenseid);
        res.json({expenseRecord})
    }); 

    // Deleting notes
    // 
    app.delete("/expense/:expenseid/note/:noteid", async function (req,res){
        const {expenseId, noteId} = req.params; 
        const results = await db.collection(COLLECTION).updateOne({
            "_id": new ObjectId(expenseId) 
        },{
            "$pull":{
                "notes":{
                    "_id":new ObjectId(noteId)
                }
            }
        })
        res.json({
            'message':"note deleted successfully",
            "results": response
        })
    })

    // Updating notes
    // 
    app.put('/expense/:expenseid/note/:noteid', async function (req,res){
        const {expenseId, noteId} = req.params; 
        const results = await db.collection(COLLECTION).updateOne({
            "_id": new ObjectId(expenseId), 
            "notes._id": new ObjectId(noteId)
        },{
            "$set": {
                'notes.$.content': req.body.noteContent
            }
        })
        res.json({
            'message':"note updated successfully",
            "results": response
        })
    })
    
    // register the user routes
    // if the url sent to Express starts with '/users',
    // then the remaining framgent is looked for inside
    // userRoutes
    app.use('/users', userRoutes);
}

main();

app.listen(3000, function () {
    console.log("Server has started")
})
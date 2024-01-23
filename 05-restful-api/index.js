const express = require("express");
const cors = require('cors');
const { ObjectId } = require('mongodb');
// const userRoutes = require('./users'); 
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

    // async function findExpenseById(expenseId){
    //     const expenseRecord = await db.collection(COLLECTION).findOne({
    //         "_id": new ObjectId(expenseId)
    //     }); 
    //     return expenseRecord; 
    // }

    // Reading from the databaseName
    app.get('/showAll_expenses', async function (req, res) {

        const expenseRecords = await db.collection(COLLECTION)
            .find()
            .toArray();
        
        res.json({
            expenseRecords
        })
    });

    // Adding to the database 
    app.post('/expenses', async function (req, res) {
        const user = req.body.user;
        const expenseAmount = req.body.expenseAmount;

        if (!user) {
            res.status(400);
            res.json({
                "error": "Please enter user"
            })
            return;
        }

        if (isNaN(expenseAmount) || expenseAmount < 0) {
            res.status(400);
            res.json({
                "error": "Please enter expense amount and make sure it is greater than 0"
            })
            return;
        }

        let tags = req.body.tags;
        if (tags) {
            if (!Array.isArray(tags)) {
                tags = [tags];
            }
        } else {
            tags = [];
        }

        const results = await db.collection(COLLECTION).insertOne({
            "user": user,
            "expenseAmount": Number(expenseAmount),
            "tags": tags
        })

        res.json({
            "message": "Added successfully",
            "results": results
        })

    })

    app.delete("/expense/:expenseRecordId", async function(req,res){
        const results = await db.collection(COLLECTION).deleteOne({
            "_id": new ObjectId(req.params.expenseRecordId)
        })
        res.json({
            results
        });
    })

    

    // app.use('/users', userRoutes);
}

main();

app.listen(3000, function () {
    console.log("Server has started")
})
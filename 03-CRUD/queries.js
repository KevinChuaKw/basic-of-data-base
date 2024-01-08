// When you want to create a fresh database 
use animal_shelter 
// This will create an empty database - it will not show up in 
// your collection unless you insert a document into the database

// To delete the entire database
db.dropDatabase()

// to insert a collection 
db.animals.insertOne({
    "name":"Fluffy",
    "age":3,
    "breed":"Golden Retriever",
    "type":"dog"
})
db.animals.count()

// To insert more than one 
db.animals.insertMany([
    {
        "name":"Dazzy",
        "age":5,
        "breed":"Greyhound",
        'type': 'Dog'
    },
    {
        "name":"John",
        "age":7,
        "breed":"Booms",
        'type': 'Cat'
    },
    {
        "name":"Sally",
        "age":8,
        "breed":"Hahaha Bird",
        'type': 'Bird'
    }, 
])


// Delete 
// To delete the document, we first would need to find the documents
// We look for them via objectId 
db.animals.deleteOne({
    "_id":ObjectId('659bf9a5cb56ee3b0da073c3')
})

// Update
db.animals.updateOne({
    "_id":ObjectId('659bfa1bcb56ee3b0da073c4') // Dazzy
},{
    "$set":{
        'breed':"hahah"
    }
})

db.animals.updateOne({
    "_id":ObjectId('659bfa1bcb56ee3b0da073c5')
},{
    "$set":{
        'breed':"hahah",
        "type":'bird',
        "dead":"true"
    }
})
// From the above, if we have a new key under 'update', This
// will solely add the new key entirely

// When you want to nest a object into an array 
db.animals.updateOne({
    "_id":ObjectId('659bfa1bcb56ee3b0da073c5')
},{
    "$push":{
        'checkups':{
            "_id":ObjectId(),
            'name':"Dr. Tan",
            "diagnosis":"diabetes", 
            "treatment":'pills'
        }
    }
})

db.animals.updateOne({
    "_id":ObjectId('659bfa1bcb56ee3b0da073c5')
},{
    "$push":{
        'checkups':{
            "_id":ObjectId(),
            'name':"Dr. Ong",
            "diagnosis":"nose bleed", 
            "treatment":'operation'
        }
    }
})

// To remove nested data within an array. This will remove 
// the entire object within the array. 
db.animals.updateOne({
    "_id":ObjectId('659bfa1bcb56ee3b0da073c5')
},{
    "$pull":{
        'checkups':{
            "_id":ObjectId('659bfdbacb56ee3b0da073c7'),
        }
    }
})

// There is also a specific way to remove a specific field in 
// the object 
db.animals.updateOne({
    "_id":ObjectId('659bfa1bcb56ee3b0da073c5')
},{
    "$pull":{
        'checkups':{
            "_id":ObjectId('659bfdbacb56ee3b0da073c7'),
        }
    }
})


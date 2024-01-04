// All of these to be used in the terminal

// How do we see all the databases on my cluster 
show databases; 

// To select a database, type in 'use <db-name>' 
// If you type the database name wrongly,  
// there will be NO error messages 
use sample_airbnb; 


// Show all the eollections in the current database
show collections; 

// Basic Queries
// Get all documents in a collection 
// 'db' is a special variable in Mongo Shell
// Get the first 10 documents in the 'listing and reviews' collection
db.listingsAndReviews.find().limit(10); 

// if we want to extract a subset of the key/value pair
// it is known as projection 
// The first "{}" this is the anti object which is all documents 
// The second "{}" is the key that you specifically want within the object
db.listingsAndReviews.find({},{
    "name":1,
    "beds":1
})

// Filter documents by a criterial 
// The first parameter of the .find() function
// is the criteria object
db.listingsAndReviews.find({
    'beds':2
},{
    "name":1,
    "beds":1
})

// Multiple criteria 
// Find all the documents in the collection where the number of beds is 2 and bedrooms is 2
db.listingsAndReviews.find({
    'beds':2,
    "bedrooms":2
},{
    'name':1,
    "beds":1,
    'bedrooms':1
})

// Find all listings which has 2 beds and 2 bedrooms in Brazil
db.listingsAndReviews.find({
    'beds':2,
    "bedrooms":2, 
    "address.country":"Brazil"
},{
    "beds":1,
    "bedrooms":1,
    "address.country":1
})

// Find all listing where there is 3 or more bedrooms 
db.listingsAndReviews.find({
    "bedrooms": {
        '$gte':3
    }
},{
    "bedrooms":1,
    "name":1
})

// Find all listing where there is a range of 3-5 bedrooms 
db.listingsAndReviews.find({
    "bedrooms": {
        '$gte':3,
        "$lte":5
    }
},{
    "bedrooms":1,
    "name":1
})

// Find all the listings in Brazil that has 3-5 bedrooms and have at least 2 beds
db.listingsAndReviews.find({
    "beds": {
        '$gte':2
    }, 
    'address.country':'Brazil', 
    "bedrooms":{
        '$gte':3,
        "$lte":5
    }
},{
    "bedrooms":1,
    "name":1,
    "address.country":1,
    "beds":1
})

// Find by element in the array 
db.listingsAndReviews.find({
    'amenities':'Oven'
},{
    'name':1,
    'amenities':1
})

// Find all listings that have oven or microwave or stove
db.listingsAndReviews.find({
    'amenities':{
        "$in":['Oven', 'Stove']
    }
},{
    'name':1,
    'amenities':1
})

// Find all listing that has Oven and microwave and stove
db.listingsAndReviews.find({
    'amenities':{
        "$all":['Oven', 'Stove', 'Microwave']
    }
},{
    'name':1,
    'amenities':1
})

// Find all listing that has oven but have either microwave or stove
db.listingsAndReviews.find({
    'amenities':{
        "$all":["Oven"], 
        "$in":['Microwave', 'Stove']
    }
},{
    'name':1,
    'amenities':1
})

// Logical operators: OR
// Find all the listings from Brazil or Canada 
db.listingsAndReviews.find({
    '$or':[
        {
            'address.country':'Brazil'
        },
        {
            "address.country":"Canada"
        }
    ]
},{
    'name':1,
    "address.country":1
})

// For Brazil, I want numeber of beds to be 2 and for Canada I want number of beds to be 3
db.listingsAndReviews.find({
    '$or':[
        {
            'address.country':'Brazil',
            'beds':2
        },
        {
            "address.country":"Canada",
            'beds':3
        }
    ]
},{
    'name':1,
    "address.country":1, 
    'beds':1
})
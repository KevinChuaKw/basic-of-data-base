// USE THE sample_resturants DATABASE FOR THE QUESTIONS BELOW

// 1. Find all restaurants that specialize in *hamburgers* cuisine
db.restaurants.find({
    'cuisine':'Hamburgers'
},{
    'cuisine':1,
    'name':1
})


// 2. Find all restaurants that specialize in *American* cuisine 
// and are in the Bronx borough.
db.restaurants.find({
    'cuisine':'American',
    'borough':'Bronx'
},{
    'cuisine':1,
    'name':1,
    'borough':1
})


// 3. Find all restaurants that are located at the street "Stillwell Avenue"
db.restaurants.find({
    'address.street':'Stillwell Avenue'
},{
    'name':1,
    'address.street':1
})


//NEXT SET OF QNS
// USE THE sample_mflix **DATABASE FOR THE QUESTIONS BELOW**

// From the *movies* collection

// 1. Count how many movies there are
db.movies.count();
// Total movies is 21349 

// 2. Count how many movies there are released before the year 2000
db.movies.count({
    'year':{
        $lt:2000
    }
})
// Total movies before 2000 is 8745

// 3. Show the first ten titles of movies produced in the USA
db.movies.find({
    'countries':'USA'
},{
    'title':1,
    'countries':1
}).limit(10)

// 4. Show the first ten titles of movies not produced in the USA
db.movies.find({
    'countries':{
        '$ne':'USA'
    }
},{
    'title':1,
    'countries':1
}).limit(10)

// 5. Show movies that have at least 3 wins in the awards object
db.movies.find({
    'awards.wins':{
        '$gte':3
    }
},{
    'title':1,
    'awards.wins':1
})

// 6. Show movies that have at least 3 nominations in the awards object
db.movies.find({
    'awards.nominations':{
        '$gte':3
    }
},{
    'title':1,
    'awards.nominations':1
})

// 7. Show movies that cast Tom Cruise
db.movies.find({
    'cast':'Tom Cruise'
},{
    'title':1,
    'cast':1
})


// 8. Show movies that are directed by Charles Chaplin
db.movies.find({
    'directors':'Charles Chaplin'
},{
    'title':1,
    'directors':1
})

// NEXT SET OF QNS
// USE THE sample_weatherdata DATABASE FOR THE QUESTIONS BELOW**

// 1. Count how many records there are of wind speed with rate higher than 5
db.data.count({
    'wind.speed.rate':{
        $gt:5
    }
})
// Total records with wind speed higher than 5 is 7027

// 2. Count how many records there are of wind speed with rate higher 
// than 5 but is not 999.9
db.data.count({
    'wind.speed.rate':{
        $gt:5,
        $ne:999.9
    }
})
// Total records with wind speed higher than 5 is 6699 


// NEXT SET OF QNS
// USE THE sample_supplies DATABASE FOR THE QUESTIONS BELOW**

// 1. Count how many sales includes laptop
db.sales.count({
    'items':'laptop'
})
// Total sales that include laptop is 
// This data set is questionable

// 2. Count how many sales includes laptop and is made at Denver


// 3. Show the sales that are made at Denver **OR** Seattle.


// 4. Show the store location where the user with the email address "[beecho@wic.be](mailto:beecho@wic.be)" has purchased at


// 5. Show the store location of all sales where coupon is used and the customer's satisfaction is 4 or above


// 6. Show the store location and items sold for sales where more than 4 laptops are sold
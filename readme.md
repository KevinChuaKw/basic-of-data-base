- Strategy 1
All in one
Related entities are embedded into the top level documents (student will contain the related parent, and the related parent will contain the related payments etc.)

- Strategy 2
100% Referencing
Cons: lot of work for programmers
enforce references intergrity
lots of work to query relationships

- Strategy 3
Prerequisite: You must have done the UI/UX planning first, down to the content of each screen


Accessing the database
Whenever you reopen the gitpod server. There is a need to run this piece of code 'sudo dpkg -i mongosh.deb' in the terminal 

To connect to the mongo database, you will need to use the connection string under database and put the data string into the terminal followed by the passward 'haha123'
You should be seeing "Atlas atlas-fi1sr9-shard-0 [primary]" when you are connected to the database. 

To get the connection string, you will need to go under 'database' then under 'database deployments' and then 'connect' and 'shell' - the connection string will be there
An alternate way to get this is going to go to 'database' and under 'database deplyments' and look for 'drivers'. The connection string is there

mongodb+srv://root:<password>@testing-database-for-ke.m639ryv.mongodb.net/?retryWrites=true&w=majority

KEY THING TO NOTE 
When you restart your terminal after a long time. 

You might have to reinstall the package for dotenv again. You can do this by keying in 'yarn add dotenv' and followed by creating a '.env' file again to place the connection string within the .env file. 

You will need to create the .env file again because you are opening the workspace from github (which is the version that is uploaded without the .env file because it was in .gitignore). If you open the workspace from github, the .env file will be there. 

MONGO_URL="mongodb+srv://root:haha123@testing-database-for-ke.m639ryv.mongodb.net/?retryWrites=true&w=majority"

To exit the database key in "control+c" in the terminal

Go to browse collections to see all the sample databases 

Notes on TRY CATCH 
When you are using external softwares and plug ins
When accounting for errors that are not within your control
To use a try catch to account for instead
If there is a specific line that is giving an error
Javascript would be going to the catch line to throw out the error accordingly
Expected to put try catch for the module project

adding a sub document is alwasys updateOne
insertOne / deleteOne is for changing of the main document

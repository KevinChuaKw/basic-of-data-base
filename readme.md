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


Whenever you reopen the gitpod server. There is a need to run this piece of code 'sudo dpkg -i mongosh.deb' in the terminal 

To connect to the mongo database, you will need to use the connection string under database and put the data string into the terminal followed by the passward 'haha123'
You should be seeing "Atlas atlas-fi1sr9-shard-0 [primary]" when you are connected to the database. 

To get the connection string, you will need to go under 'database' then under 'database deployments' and then 'connect' and 'shell' - the connection string will be there

To exit the database key in "control+c" in the terminal

Go to browse collections to see all the sample databases

const mongodb = require('mongodb');
const uri = 'mongodb://localhost:27017';
const client = new mongodb.MongoClient(uri);

client.connect((err) => {
    if (!err) {
        console.log('connection created');
    }
    const newDB = client.db("UsersDB");
    newDB.createCollection("user"); // This line i s important. Unless you create collection you can not see your database in mongodb .
    newDB.createCollection("citizen");
  	newDB.createCollection("administrator");
  	newDB.createCollection("healthEntity");
  	newDB.createCollection("establishment");
      
})
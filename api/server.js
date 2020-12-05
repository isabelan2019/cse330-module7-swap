//start up code from https://medium.com/better-programming/connect-your-express-and-react-applications-using-axios-c35723b6d667 

const express = require("express"),
  app = express(),
  port = process.env.PORT || 5000,
  cors = require("cors");
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/grocerydb", { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(error => handleError(error));

const employeesSchema=({
  _id: mongoose.Schema.Types.ObjectId,
  firstName: String,
  lastName: String,
  username: String,
  password: String,
})
const Employees = mongoose.model('employees',employeesSchema);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.listen(port, () => console.log("Backend server live on " + port));

//check if server is connected
app.get("/", (req, res) => {
  res.send({ message: "Server connected" });
});

//send POST request to mongoDB database
app.post("/createEmployees", (req, res) => {
  if(req.body.verification=="yes"){
    const newEmployee={
      firstName:req.body.firstName,
      lastName:req.body.lastName,
      username:req.body.username,
      password:req.body.password
    };
    //.then and .catch lines: https://kb.objectrocket.com/mongo-db/how-to-setup-a-nodejs-app-with-mongodb-using-mongoose-227
    Employees.create(req.body)
      .then(function(data){
        res.json(data);
      })
      .catch(function(err){
        res.json(error);
      })
    console.log(newEmployee);
  }
  else{
    res.send({message:"You do not have permissions to create an employee account."});
  }
});

//set up code for mongoDB from  https://github.com/mongodb/node-mongodb-native
// Connection URL
// const url = 'mongodb://localhost:27017';

// // Database Name
// const dbName = 'swap';

// Use connect method to connect to the server
// MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");
//   const db = client.db(dbName);
//   client.close();
// });


// const insertDocuments = function(db, callback) {
//   // console.log("hi");
//   // Get the documents collection
//   const collection = db.collection('shirts');
//   // Insert some documents
//   collection.insertMany([
//     {a : 1}, {a : 2}, {a : 3}
//   ], function(err, result) {
//     assert.equal(err, null);
//     assert.equal(3, result.result.n);
//     assert.equal(3, result.ops.length);
//     console.log(db.collection);
//     callback(result);
//   });
  
// }
// const findDocuments = function(db, callback) {
//   // Get the documents collection
//   const collection = db.collection('shirts');
//   // Find some documents
//   collection.find({}).toArray(function(err, docs) {
//     assert.equal(err, null);
//     console.log("Found the following records");
//     console.log(docs)
//     callback(docs);
//   });
// }
// const removeDocument = function(db, callback) {
//   // Get the documents collection
//   const collection = db.collection('shirts');
  
//   //deletes all in shirts
//   collection.deleteMany({ },)
//   .then (function(err, result) {
//     assert.equal(err, null);
//    // assert.equal(1, result.result.n);
//     console.log("Removed all");
//     // console.log(result);
//     callback(result);
//   });

  // Delete document where a is 3
  // collection.deleteMany({ a : 1 }, function(err, result) {
  //   assert.equal(err, null);
  //   assert.equal(1, result.result.n);
  //   console.log("Removed the document with the field a equal to 1");
  //   // console.log(result);
  //   callback(result);
  // });
  // findDocuments();
// }


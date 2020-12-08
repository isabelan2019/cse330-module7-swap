//start up code from https://medium.com/better-programming/connect-your-express-and-react-applications-using-axios-c35723b6d667 
//express connection
const express = require("express"),
  app = express(),
  port = process.env.PORT || 5000,
  cors = require("cors");
const router = express.Router();
const { ObjectID } = require("mongodb");
//mongoose connection
const mongoose = require('mongoose');
// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');
// const Schema = mongoose.Schema;
const Employee=require('./schemas/employeesSchema');
const InventoryItem=require('./schemas/inventorySchema');
const Transaction=require('./schemas/transactionsSchema');
// mongoose.connect("mongodb://localhost/grocerydb", { useNewUrlParser: true, useUnifiedTopology: true })
//   .catch(error => handleError(error));

//mongoose set up: https://www.geeksforgeeks.org/nodejs-connect-mongodb-node-app-using-mongoosejs/?ref=lbp
const url = "mongodb://127.0.0.1:27017/swap";
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.Promise=global.Promise;
const connection = mongoose.connection;
connection.on('connected',function(){
  console.log("Mongoose connection on");
});
connection.on('error',function(err){
  console.log('Mongoose connection error: ' + err);
})


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.listen(port, () => console.log("Backend server live on " + port));

//check if server is connected
app.get("/", (req, res) => {
  res.send({ message: "Server connected" });
});

// //send POST request to mongoDB database: https://www.geeksforgeeks.org/nodejs-crud-operations-using-mongoose-and-mongodb-atlas/
app.post("/createEmployees", (req, res) => {
  if(req.body.verification=="yes"){
    let newEmployee=new Employee();
    newEmployee.firstName=req.body.firstName;
    newEmployee.lastName=req.body.lastName;
    newEmployee.username=req.body.username;
    newEmployee.password=req.body.password;
    newEmployee._id=new ObjectID;
    
    newEmployee.save(function(err,data){
      if(err){
        console.log(err);
      }
      else{
        res.send("New employee inserted");
      }
    })
  }
  else{
    res.send({message:"You do not have permissions to create an employee account."});
  }
});

app.post("/addInventoryCategory", (req, res)=>{
  let newInventoryCategory = new InventoryItem;
  newInventoryCategory._id=new ObjectID;
  newInventoryCategory.category=req.body.category;
  newInventoryCategory.totalQuantity=0; 
  newInventoryCategory.itemTypes="";
  newInventoryCategory.save(function(err,data){
    if(err){
      console.log(data);
      console.log(err);
    }
    else{
      res.send("New inventory category inserted");
    }
  });
});

app.get("/getAllInventory",(req,res)=>{
  InventoryItem.find({}, function(err,data){
    if(err){
      console.log(err);
      console.log("can't work");
    }
    else{
      console.log(data);
      res.json(data);
      // res.send("test success");
    }
  });
});

app.post("/insertInventory", (req, res)=>{
  console.log(req.body);
  const categoryID =req.body._id;

  // InventoryItem.findByIdAndUpdate(categoryID, {
  //   itemTypes: {
  //     itemName:req.body.itemName, 
  //     quantity:req.body.quantity}
  //   }, function(err,data){
  //     if(err){
  //       console.log(err);
  //       console.log("can't work");
  //     }
  //     else{
  //       console.log(data);
  //       res.json(data);
  //       res.send("Inventory Updated");
  //       // res.send("test success");
  //     }
  // })
});

app.post("/login", (req, res)=>{
  console.log(req);
  console.log(res);
  console.log("hi");
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


//start up code from https://medium.com/better-programming/connect-your-express-and-react-applications-using-axios-c35723b6d667
//express connection
const express = require("express"),
  app = express(),
  port = process.env.PORT || 5000,
  cors = require("cors");
const router = express.Router();
const { NotExtended } = require("http-errors");
const { ObjectID, ObjectId } = require("mongodb");
//mongoose connection

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const cookieParser = require("cookie-parser");
const session = require("cookie-session");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const cryptoRandom = crypto.randomBytes(64).toString("hex");
const withAuth = require("./token");

// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');
// const Schema = mongoose.Schema;
const Employee = require("./schemas/employeesSchema");
const InventoryItem = require("./schemas/inventorySchema");
const Transaction = require("./schemas/transactionsSchema");
const Verification = require("./schemas/verificationSchema");
// mongoose.connect("mongodb://localhost/grocerydb", { useNewUrlParser: true, useUnifiedTopology: true })
//   .catch(error => handleError(error));

//mongoose set up: https://www.geeksforgeeks.org/nodejs-connect-mongodb-node-app-using-mongoosejs/?ref=lbp
const url = "mongodb://127.0.0.1:27017/swap";
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;
const connection = mongoose.connection;
connection.on("connected", function () {
  console.log("Mongoose connection on");
});
connection.on("error", function (err) {
  console.log("Mongoose connection error: " + err);
});
mongoose.set("useFindAndModify", false);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.listen(port, () => console.log("Backend server live on " + port));
app.use(cookieParser());
app.use(
  session({
    name: "session",
    secret: cryptoRandom,
    expires: new Date(Date.now() + 60 * 60 * 1000), //1 hr
  })
);
//check if server is connected
app.get("/", (req, res) => {
  res.send({ message: "Server connected" });
});

// //send POST request to mongoDB database: https://www.geeksforgeeks.org/nodejs-crud-operations-using-mongoose-and-mongodb-atlas/
app.post("/createEmployees", (req, res) => {
  // console.log("verification ",req.body.verification);
  const verification = req.body.verification;
  // let verified;
  Verification.findOne(
    { verification: verification },
    function (err, verification) {
      if (err) {
        console.error(err);
        res.send("error finding database");
      } else if (!verification) {
        res.send({ message: "invalid verification code" });
      } else {
        // verified =true;

        Employee.findOne({ username: req.body.username }, function (err, user) {
          if (err) {
            res.send("error finding database");
          } else if (user) {
            res.send("username already exists");
          } else {
            let newEmployee = new Employee();
            newEmployee.firstName = req.body.firstName;
            newEmployee.lastName = req.body.lastName;
            newEmployee.username = req.body.username;
            newEmployee._id = new ObjectID();
            // newEmployee.password;
            bcrypt.hash(
              req.body.password,
              saltRounds,
              function (err, hashedPassword) {
                if (err) {
                  // res.send("could not hash");
                  res.send({ message: "could not hash" });
                } else {
                  newEmployee.password = hashedPassword;
                  newEmployee.save(function (err, data) {
                    if (err) {
                      console.log(err);
                      res.send({ message: "error saving employee" });
                    } else {
                      res.json(data);
                    }
                  });
                }
              }
            );
          }
        });
      }
    }
  );
});

app.post("/addInventoryCategory", (req, res) => {
  let newInventoryCategory = new InventoryItem();
  newInventoryCategory._id = new ObjectID();
  newInventoryCategory.category = req.body.category;
  newInventoryCategory.priceEstimate = req.body.price;
  newInventoryCategory.weightEstimate = req.body.weight;
  newInventoryCategory.itemTypes = [];
  console.log(req.body);
  console.log(newInventoryCategory);
  newInventoryCategory.save(function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
});

// app.post("/summaryCalculations", (req, res) => {
//   let allItems = [];
//   for (let key in req.body.items) {
//     allItems.push(req.body.items[key].categoryID);
//   }
//   console.log("line113");
//   console.log(allItems);

//   InventoryItem.find({ _id: { $in: allItems } }, function (err, data) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(data);
//       res.json(data);
//     }
//   });
// });

app.post("/customerCheckout", (req, res) => {
  console.log(req.body);
  //saves to transaction log
  let newTransaction = new Transaction();
  newTransaction._id = new ObjectId();
  newTransaction.date = req.body.date;
  newTransaction.customer = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  };
  const items = [];
  for (let key in req.body.items) {
    const eachItem = {
      _id: ObjectId(key),
      itemName: req.body.items[key].itemName,
      quantity: req.body.items[key].quantity,
    };
    items.push(eachItem);
  }

  newTransaction.items = items;

  newTransaction.save(function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });

  // for (let key in req.body.items) {
  //   let oldQuantity = new Number();
  //   let newQuantity = new Number();
  //   InventoryItem.findOne(
  //     { "itemTypes._id": key },
  //     "itemTypes.$",
  //     function (err, data) {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         console.log("check structure");
  //         oldQuantity = data.itemTypes[0].quantity;
  //         newQuantity = oldQuantity - Number(req.body.items[key].quantity);
  //         changeQuantityFromCheckout(
  //           newQuantity,
  //           req.body.items[key].categoryID,
  //           key,
  //           res
  //         );
  //         // console.log(data.itemTypes[0].quantity);
  //       }
  //     }
  //   );
  // }
  // InventoryItem.findOneAndUpdate(
  //   { _id: req.body.items.categoryID, "itemTypes._id": key },
  //   {
  //     "itemTypes.$.quantity": newQuantity,
  //   },
  //   function (err, data) {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       res.json(data);
  //     }
  //   }
  // );
});

function changeQuantityFromCheckout(newQuantity, categoryID, itemID) {
  InventoryItem.findOneAndUpdate(
    { _id: categoryID, "itemTypes._id": itemID },
    {
      "itemTypes.$.quantity": newQuantity,
    },
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        // res.json(data);
        return data;
      }
    }
  );
}

app.post("/customerCheckoutChangeInventory", (req, res) => {
  for (let key in req.body.items) {
    let oldQuantity = new Number();
    let newQuantity = new Number();
    InventoryItem.findOne(
      { "itemTypes._id": key },
      "itemTypes.$",
      function (err, data) {
        if (err) {
          console.log(err);
        } else {
          oldQuantity = data.itemTypes[0].quantity;
          newQuantity = oldQuantity - Number(req.body.items[key].quantity);
          res.json(
            changeQuantityFromCheckout(
              newQuantity,
              req.body.items[key].categoryID,
              key
            )
          );
          // console.log(data.itemTypes[0].quantity);
        }
      }
    );
  }
});

app.get("/getAllInventory", (req, res) => {
  InventoryItem.find({}, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
      // res.send("test success");
    }
  });
});

app.get("/getLastHour", (req, res) => {
  let today = new Date();
  const msToday = Date.now(today);
  const msInHour = 3600000;
  const dayAgo = Number(msToday) - msInHour;
  const startDate = new Date(dayAgo);
  Transaction.find(
    { date: { $gte: startDate, $lte: today } },
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        res.json(data);
      }
    }
  );
});

app.get("/getLastDay", (req, res) => {
  let today = new Date();
  const msToday = Date.now(today);
  const msInDay = 86400000;
  const dayAgo = Number(msToday) - msInDay;
  const startDate = new Date(dayAgo);
  Transaction.find(
    { date: { $gte: startDate, $lte: today } },
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        res.json(data);
      }
    }
  );
});

app.get("/getLastWeek", (req, res) => {
  let today = new Date();
  const msToday = Date.now(today);
  const msInWeek = 86400000 * 7;
  const dayAgo = Number(msToday) - msInWeek;
  const startDate = new Date(dayAgo);
  Transaction.find(
    { date: { $gte: startDate, $lte: today } },
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        res.json(data);
      }
    }
  );
});

app.get("/getLastMonth", (req, res) => {
  let today = new Date();
  const msToday = Date.now(today);
  const msInMonth = 86400000 * 7 * 30;
  const dayAgo = Number(msToday) - msInMonth;
  const startDate = new Date(dayAgo);
  Transaction.find(
    { date: { $gte: startDate, $lte: today } },
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        res.json(data);
      }
    }
  );
});

app.get("/getLastYear", (req, res) => {
  let today = new Date();
  const msToday = Date.now(today);
  const msInYear = 86400000 * 7 * 52;
  const dayAgo = Number(msToday) - msInYear;
  const startDate = new Date(dayAgo);
  Transaction.find(
    { date: { $gte: startDate, $lte: today } },
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        res.json(data);
      }
    }
  );
});

app.get("/getTransactions", (req, res) => {
  Transaction.find({}, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
      // res.send("test success");
    }
  });
});

app.post("/deleteInventoryItem", (req, res) => {
  const itemID = req.body.itemID;
  const categoryID = req.body.categoryID;
  console.log(itemID);
  InventoryItem.findByIdAndUpdate(
    categoryID,
    { $pull: { itemTypes: { _id: itemID } } },
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.json(data);
      }
    }
  );
});

app.post("/deleteCategory", (req, res) => {
  const categoryID = req.body.categoryID;
  InventoryItem.findByIdAndDelete(categoryID, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
});

app.post("/editInventoryQuantity", (req, res) => {
  console.log(req.body);
  const itemID = req.body.itemID;
  const categoryID = req.body.categoryID;
  const newQuantity = req.body.quantity;
  //findOneAndUpdate subdocument: https://stackoverflow.com/questions/21522112/how-to-update-subdocument-with-findoneandupdate
  InventoryItem.findOneAndUpdate(
    { _id: categoryID, "itemTypes._id": itemID },
    {
      "itemTypes.$.quantity": newQuantity,
    },
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.json(data);
      }
    }
  );
});

app.post("/insertInventory", (req, res) => {
  console.log(req.body);

  const categoryID = req.body._id;
  const itemType = {
    itemName: req.body.itemName,
    quantity: req.body.quantity,
    _id: new ObjectID(),
  };

  InventoryItem.findByIdAndUpdate(
    categoryID,
    {
      $push: { itemTypes: itemType },
    },
    function (err, data) {
      if (err) {
        console.log(err);
        // return handleError(err);
      } else {
        // console.log(data);
        res.json(data);
        // res.send("test success");
      }
    }
  );
});

app.post("/login", (req, res) => {
  console.log("body" + JSON.stringify(req.body));

  const loginUsername = req.body.loginUsername;
  const loginPassword = req.body.loginPassword;
  Employee.findOne({ username: loginUsername }, function (err, user) {
    if (err) {
      console.error(err);
      res.send("error finding database");
    } else if (!user) {
      res.send("username does not exist in database");
    } else {
      //user exists
      //hash password
      console.log("user exists " + user.password);
      bcrypt.compare(loginPassword, user.password, function (err, same) {
        if (err) {
          // callback(err);
          res.send("error comparing passwords");
        } else {
          // callback(err, same);
          // console.log(user.password);
          // console.log(loginPassword);

          if (!same) {
            const isLoggedIn = false;
            res.send(isLoggedIn);
          } else {
            const isLoggedIn = true;
            // res.send(isLoggedIn);
            res.loggedIn = true;
            res.username = user.username;
            req.session.username = user.username;
            // console.log("cookie", res.username);
            res.send({ isLoggedIn: isLoggedIn, username: user.username });
          }
        }
      });
    }
  });
});

app.post("/logout", function (req, res) {
  console.log("you are logging out");
  // res.send("logging out");
  // console.log(res.cookie.token);
  req.session = null;
  res.clearCookie("token").sendStatus(200);
});

app.post("/changeVerification", function (req, res) {
  console.log("changing verification");
  const oldVerification = { verification: req.body.oldVerification };
  const newVerification = {
    verification: req.body.newVerification,
    date: req.body.date,
  };
  console.log("received: " + JSON.stringify(req.body));

  // let verified;
  Verification.findOneAndUpdate(
    oldVerification,
    newVerification,
    function (err, data) {
      if (err) {
        console.log("err", err);
        res.send({ message: err });
      } else if (!data) {
        console.log("verified", JSON.stringify(data));
        res.send({ message: "invalid verification code" });
      } else {
        res.send(data);
      }
    }
  );

  // withAuth(req, res);
  // console.log("verificaiton token");
});

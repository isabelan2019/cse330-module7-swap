const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionsSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  customer: {
    firstName: String,
    lastName: String,
    email: String,
  },
  date: Date,
  items: [
    {
      item_ID: mongoose.Schema.Types.ObjectId,
      itemName: String,
      quantity: Number,
    },
  ],
});

module.exports = mongoose.model(
  "transaction",
  transactionsSchema,
  "transactions"
);

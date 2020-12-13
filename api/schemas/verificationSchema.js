const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const verificationSchema= new Schema ({
    _id: mongoose.Schema.Types.ObjectId,
    verification: String,
    date: Date,
  });

module.exports = mongoose.model("Verification",verificationSchema,"verification");
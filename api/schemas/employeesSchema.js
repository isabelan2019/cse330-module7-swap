const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema= new Schema ({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    username: String,
    password: String,
  });

module.exports = mongoose.model("Employee",employeeSchema,"employees");
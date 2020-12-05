const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const inventorySchema= new Schema ({
    _id: mongoose.Schema.Types.ObjectId,
    category: String, 
    itemTypes:{
        item_id:  mongoose.Schema.Types.ObjectId,
        itemName: String,
        quantity: Number,
        priceEstimate: Number,
        weightEstimate: Number
    },
    totalQuantity: Number
});

module.exports = mongoose.model("inventoryItems",inventorySchema,"inventory");
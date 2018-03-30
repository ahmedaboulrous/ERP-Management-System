const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating the Schema
const ItemSchema = new Schema({
    name:{
        type: String,
        required: [true, 'Item Name is Required']
    },
    amount:{
        type: Number,
        default: 0
    }
});

// Creating the Model
const Item = mongoose.model('item', ItemSchema);


module.exports = Item;
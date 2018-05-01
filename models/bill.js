const mongoose = require('mongoose');

const { Schema } = mongoose;

// Creating the Schema
const BillSchema = new Schema({
  description: {
    type: String,
    required: [true, 'Bill Description is Required'],
  },
  client_name: {
    type: String,
    required: [true, 'Client Name is Required'],
  },
  total_cost: {
    type: String,
    required: [true, 'Bill total cost is Required'],
  },
  issuer_id: {
    type: String,
    required: [true, 'Issuer ID is Required'],
  },
  issuing_time: {
    type: String,
  },
});

// Creating the Model
const Bill = mongoose.model('bill', BillSchema);


module.exports = Bill;

const mongoose = require('mongoose');

const { Schema } = mongoose;

// Creating the Schema
const SupplierSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Supplier Name is Required'],
  },
  address: {
    type: String,
    required: [true, 'Supplier Address is Required'],
  },
  telephone: {
    type: String,
    required: [true, 'Telephone Number is Required'],
  },
});

// Creating the Model
const Supplier = mongoose.model('supplier', SupplierSchema);


module.exports = Supplier;

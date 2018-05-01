const mongoose = require('mongoose');

const { Schema } = mongoose;

// Creating the Schema
const ExpenseSchema = new Schema({
  description: {
    type: String,
    required: [true, 'Expense Description is Required'],
  },
  cost: {
    type: String,
    required: [true, 'Expense cost is Required'],
  },
});

// Creating the Model
const Expense = mongoose.model('expense', ExpenseSchema);


module.exports = Expense;

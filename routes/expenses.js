const express = require('express');

const router = express.Router();
const Expense = require('../models/expense');


// get a list of all Expenses
router.get('/', (req, res, next) => {
  Expense.find({}).then((allExpenses) => {
    res.status(200).send(allExpenses);
  }).catch(next);
});

// get an Expense by id
router.get('/:id', (req, res, next) => {
  Expense.findById({ _id: req.params.id }).then((foundExpense) => {
    res.status(200).send(foundExpense);
  }).catch(next);
});

// add a new Expense to the database
router.post('/', (req, res, next) => {
  Expense.create(req.body).then((savedExpense) => {
    res.status(200).send(savedExpense);
  }).catch(next);
});

// update existing Expense in the database
router.put('/:id', (req, res, next) => {
  Expense.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
    Expense.findOne({ _id: req.params.id }).then((updatedExpense) => {
      res.status(200).send(updatedExpense);
    });
  }).catch(next);
});

// delete an Expense from the database
router.delete('/:id', (req, res, next) => {
  Expense.findByIdAndRemove({ _id: req.params.id }).then((deletedExpense) => {
    res.status(200).send(deletedExpense);
  }).catch(next);
});


module.exports = router;

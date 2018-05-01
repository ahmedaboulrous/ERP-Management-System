const express = require('express');

const router = express.Router();
const Bill = require('../models/bill');


// get a list of all Bills
router.get('/', (req, res, next) => {
  Bill.find({}).then((allBills) => {
    res.status(200).send(allBills);
  }).catch(next);
});

// get a Bill by id
router.get('/:id', (req, res, next) => {
  Bill.findById({ _id: req.params.id }).then((foundBill) => {
    res.status(200).send(foundBill);
  }).catch(next);
});

// add a new Bill to the database
router.post('/', (req, res, next) => {
  Bill.create(req.body).then((savedBill) => {
    res.status(200).send(savedBill);
  }).catch(next);
});

// update existing Bill in the database
router.put('/:id', (req, res, next) => {
  Bill.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
    Bill.findOne({ _id: req.params.id }).then((updatedBill) => {
      res.status(200).send(updatedBill);
    });
  }).catch(next);
});

// delete a Bill from the database
router.delete('/:id', (req, res, next) => {
  Bill.findByIdAndRemove({ _id: req.params.id }).then((deletedBill) => {
    res.status(200).send(deletedBill);
  }).catch(next);
});


module.exports = router;

const express = require('express');

const router = express.Router();
const Supplier = require('../models/supplier');


// get a list of all suppliers
router.get('/', (req, res, next) => {
  Supplier.find({}).then((allSuppliers) => {
    res.status(200).send(allSuppliers);
  }).catch(next);
});

// get a supplier by id
router.get('/:id', (req, res, next) => {
  Supplier.findById({ _id: req.params.id }).then((foundSupplier) => {
    res.status(200).send(foundSupplier);
  }).catch(next);
});

// add a new supplier to the database
router.post('/', (req, res, next) => {
  Supplier.create(req.body).then((savedSupplier) => {
    res.status(200).send(savedSupplier);
  }).catch(next);
});

// update existing supplier in the database
router.put('/:id', (req, res, next) => {
  Supplier.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
    Supplier.findOne({ _id: req.params.id }).then((updatedSupplier) => {
      res.status(200).send(updatedSupplier);
    });
  }).catch(next);
});

// delete a supplier from the database
router.delete('/:id', (req, res, next) => {
  Supplier.findByIdAndRemove({ _id: req.params.id }).then((deletedSupplier) => {
    res.status(200).send(deletedSupplier);
  }).catch(next);
});


module.exports = router;

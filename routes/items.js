const express = require('express');

const router = express.Router();
const Item = require('../models/item');


// get a list of all items
router.get('/', (req, res, next) => {
  Item.find({}).then((allItems) => {
    res.status(200).send(allItems);
  }).catch(next);
});

// get an item by id
router.get('/:id', (req, res, next) => {
  Item.findById({ _id: req.params.id }).then((foundItem) => {
    res.status(200).send(foundItem);
  }).catch(next);
});

// add a new item to the database
router.post('/', (req, res, next) => {
  Item.create(req.body).then((savedItem) => {
    res.status(200).send(savedItem);
  }).catch(next);
});

// update existing item in the database
router.put('/:id', (req, res, next) => {
  Item.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
    Item.findOne({ _id: req.params.id }).then((updatedItem) => {
      res.status(200).send(updatedItem);
    });
  }).catch(next);
});

// delete an item from the database
router.delete('/:id', (req, res, next) => {
  Item.findByIdAndRemove({ _id: req.params.id }).then((deletedItem) => {
    res.status(200).send(deletedItem);
  }).catch(next);
});


module.exports = router;

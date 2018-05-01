const express = require('express');

const router = express.Router();
const Client = require('../models/client');


// get a list of all clients
router.get('/', (req, res, next) => {
  Client.find({}).then((allClients) => {
    res.status(200).send(allClients);
  }).catch(next);
});

// get a client by id
router.get('/:id', (req, res, next) => {
  Client.findById({ _id: req.params.id }).then((foundClient) => {
    res.status(200).send(foundClient);
  }).catch(next);
});

// add a new client to the database
router.post('/', (req, res, next) => {
  Client.create(req.body).then((savedClient) => {
    res.status(200).send(savedClient);
  }).catch(next);
});

// update existing client in the database
router.put('/:id', (req, res, next) => {
  Client.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
    Client.findOne({ _id: req.params.id }).then((updatedClient) => {
      res.status(200).send(updatedClient);
    });
  }).catch(next);
});

// delete a client from the database
router.delete('/:id', (req, res, next) => {
  Client.findByIdAndRemove({ _id: req.params.id }).then((deletedClient) => {
    res.status(200).send(deletedClient);
  }).catch(next);
});


module.exports = router;

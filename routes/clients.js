const express = require('express');
const router = express.Router();

const Client = require('../models/client');


// get a list of all clents
router.get('/', function(req, res, next){
    Client.find({}).then(function(allClients){
        res.status(200).send(allClients);
    }).catch(next);
});

// get a client by id
router.get('/:id', function(req, res, next){
    Client.findById({_id: req.params.id}).then(function(foundClient){
        res.status(200).send(foundClient);
    });
});

// add a new client to the database
router.post('/', function(req, res, next){
    Client.create(req.body).then(function(savedClient){
        res.status(200).send(savedClient);
    }).catch(next);
});

// update existing client in the database
router.put('/:id', function(req, res, next){
    Client.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        Item.findOne({_id: req.params.id}).then(function(updatedClient){
            res.status(200).send(updatedClient);
        });
    }).catch(next);
});

// delete a client from the database
router.delete('/:id', function(req, res, next) {
    Client.findByIdAndRemove({_id: req.params.id}).then(function(deletedClient){
        res.status(200).send(deletedClient);
    }).catch(next);
});



module.exports = router;

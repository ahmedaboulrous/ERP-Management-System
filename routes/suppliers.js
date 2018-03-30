const express = require('express');
const router = express.Router();

const Supplier = require('../models/supplier');


// get a list of all suppliers
router.get('/', function(req, res, next){
    Supplier.find({}).then(function(allSuppliers){
        res.status(200).send(allSuppliers);
    }).catch(next);
});

// get a supplier by id
router.get('/:id', function(req, res, next){
    Supplier.findById({_id: req.params.id}).then(function(foundSupplier){
        res.status(200).send(foundSupplier);
    }).catch(next);
});

// add a new supplier to the database
router.post('/', function(req, res, next){
    Supplier.create(req.body).then(function(savedSupplier){
        res.status(200).send(savedSupplier);
    }).catch(next);
});

// update existing supplier in the database
router.put('/:id', function(req, res, next){
    Supplier.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        Item.findOne({_id: req.params.id}).then(function(updatedSupplier){
            res.status(200).send(updatedSupplier);
        });
    }).catch(next);
});

// delete a supplier from the database
router.delete('/:id', function(req, res, next) {
    Supplier.findByIdAndRemove({_id: req.params.id}).then(function(deletedSupplier){
        res.status(200).send(deletedSupplier);
    }).catch(next);
});


module.exports = router;

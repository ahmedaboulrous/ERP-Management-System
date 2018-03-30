const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating the Schema
const ClientSchema = new Schema({
    name:{
        type: String,
        required: [true, 'Client Name is Required']
    },
    address:{
        type: String
    },
    telephone:{
        type: String,
        required: [true, 'Telephone Number is Required']
    }
});

// Creating the Model
const Client = mongoose.model('client', ClientSchema);


module.exports = Client;
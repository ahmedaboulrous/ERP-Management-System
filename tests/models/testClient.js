const assert = require('chai').assert;
const Client = require('../models/client');

before(function(done){
    // Connect to the Database (and create it if it doesn't exist)
    mongoose.connect('mongodb://localhost/erpTestingDB');
    mongoose.Promise = global.Promise;
    mongoose.connection.once('open', function(){
        console.log('MongoDB>  Connection Established');
    }).on('error', function(error){
        console.log('MongoDB>  Connection Error: '+ error);
    });
});

describe('Server', function() {
    
    it('should pass', function(){
        assert.equal(true,true);
    });

    it('should not pass', function(){
        assert.notEqual(true,false);
    });

});


describe('Clients in DataBase', function() {


    it('should add a user in database', function(done){
        var clientObject = new Client({
            name: 'ahmed'
        });

        clientObject.save().then(function(){
            assert(clientObject.isNew == false);
            done();
        });
    });



});
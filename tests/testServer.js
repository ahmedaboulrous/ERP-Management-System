const assert = require('assert');

describe('Server', function() {
    
    it('should pass', function(){
        assert.equal(true,true);
    });

    it('should not pass', function(){
        assert.notEqual(true,false);
    });

});

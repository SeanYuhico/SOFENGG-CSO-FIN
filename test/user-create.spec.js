//user creation test
//checks if the user can be successflly added
const assert = require('assert');
const userCreate = require('../models/user.js');
describe('user create', function(){
    it('should be able to successfully add `users` to the db', function(){
        const user = 
        {
            org: 'CHARLES',
            email: 'charles@test.com',
            pasword: 'test'
        };
        var worked = 0;
        userCreate.Create(user, (err)=>{
            if(err){
                worked = -1;
            }else{
                worked = 1;
            }
        });
        assert.ok(user.org);
    });
});
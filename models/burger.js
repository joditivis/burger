// import the ORM to create functions that will interact with the database
var orm = require('../config/orm.js');

var burger = {
    // select all burger table entries
    all: function(cb) {
        orm.all('burgers', function(res) {
            cb(res);
        });
    },
    // the variables cols and vals are arrays
    create: function(cols, vals, cb) {
        orm.create('burgers', cols, vals, function(res) {
            cb(res);
        });
    },
    // objColVals = an object specifying columns as object keys with associated values
    update: function(objColVals, condition, cb) {
        orm.update('burgers', objColVals, condition, function(res) {
            cb(res);
        });
    }
};

// exports the database functions for the controller (burgers_controller.js)
module.exports = burger;
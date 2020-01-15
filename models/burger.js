// import the ORM to create functions that will interact with the database
var orm = require('../config/orm.js');

var burger = {
    // select all burger table entries
    selectAll: function(cb) {
        orm.selectAll('burgers', function(res) {
            cb(res);
        });
    },
    // the variables cols and vals are arrays
    insertOne: function(cols, vals, cb) {
        orm.insertOne('burgers', cols, vals, function(res) {
            cb(res);
        });
    },
    // objColVals = an object specifying columns as object keys with associated values
    updateOne: function(objColsVals, condition, cb) {
        orm.updateOne('burgers', objColsVals, condition, function(res) {
            cb(res);
        });
    }
};

// exports the database functions for the controller (burgers_controller.js)
module.exports = burger;
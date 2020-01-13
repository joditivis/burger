// import the ORM to create functions that will interact with the database
var orm = require('../config/orm.js');

var burger = {
    selectAll: function(cb) {
        orm.selectAll('burgers', function(res) {
            cb(res);
        });
    },
    insertOne: function(cols, vals, cb) {
        orm.insertOne('burgers', cols, vals, function(res) {
            cb(res);
        });
    },
    updateOne: function(objColsVals, condition, cb) {
        orm.updateOne('burgers', objColsVals, condition, function(res) {
            cb(res);
        });
    }
};

// exports the database functions for the controller (burgers_controller.js)
module.exports = burger;
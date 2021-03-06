// import MySQL connection
var connection = require('../config/connection.js');


// this helper function loops through and creates an array of question marks and turns it into a string
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push('?');
    }
    return arr.toString();
}

// this helper function converts object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string integer array
    for (var key in ob) {
        var value = ob[key];

        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {

            //  if string has spaces, add quotations (example: Impossible Burger => 'Impossible Burger')
            if (typeof value === 'string' && value.indexOf(' ') >= 0) {
                value = "'" + value + "'";
            }

            // example: {burger_name: 'Impossible Burger'} => ["burger_name='Impossible Burger'"]
            // example: {devoured: true} => ["devoured=true"]
            arr.push(key + '=' + value);
        }
    }
    // translate array of strings to a single comma-separated string
    return arr.toString();
}

// object for all SQL statement functions
var orm = {
    all: function (tableInput, cb) {
        var queryString = 'SELECT * FROM ' + tableInput + ';';
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    // function that inserts a new burger into the table
    create: function (table, cols, vals, cb) {
        // construct the query string that inserts a single row into the target table
        var queryString = 'INSERT INTO ' + table;

        queryString += ' (';
        queryString += cols.toString();
        queryString += ') ';
        queryString += 'VALUES (';
        queryString += printQuestionMarks(vals.length);
        queryString += ') ';

        console.log('created', queryString);

        // perform database query
        connection.query(queryString, vals, function (err, result) {
            if (err) {
                throw err;
            }
            // return results in callback
            cb(result);
        });
    },
    // function that updates a single table entry
    // objColVals example: {burger_name: Impossible Burger, devoured: true}
    update: function (table, objColVals, condition, cb) {
        var queryString = 'UPDATE ' + table;

        queryString += ' SET ';
        queryString += objToSql(objColVals);
        queryString += ' WHERE ';
        queryString += condition;

        console.log('updated', queryString);
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    }
};

// export the orm object for the models (burger.js)
module.exports = orm;
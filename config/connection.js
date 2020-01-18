// set up MySQL connection
var mysql = require("mysql");

// read the variables with the dotenv package
require("dotenv").config();

var connection;

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: process.env.MYSQL_PASSWORD,
        database: 'burgers_db'
    });
}

// make connection
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

connection.connect();
// export connection for ORM usage
module.exports = connection;
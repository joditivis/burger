var express = require('express');

var router = express.Router();

// import the models (burger.js) to use its database functions
var burger = require('../models/burger.js');

// create all routes and set up logic within those routes where required
router.get('/', function(req, res) {
    burger.selectAll(function(data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render('index', hbsObject);
    });
});

router.post('/api/burgers', function(req, res) {
    burger.insertOne([
        'burger_name'
    ], [
        req.body.burger_name
    ], function(result) {
        // send back the ID of the new burger
        res.json({ id: result.insertId });
        res.redirect('/');
    });
});

router.put('api/burgers/:id', function(req, res) {
    var condition = 'id = ' + req.params.id;

    console.log('condition', condition);

    burger.updateOne({
        devoured: true
    }, condition, function(result) {
        res.redirect('/');
    });
});

// export routes for server.js to use
module.exports = router;
var express = require('express');

var router = express.Router();

// import the models (burger.js) to use its database functions
var burgers = require('../models/burger.js');

// GET route to get burgers from database
router.get('/', function (req, res) {
    burgers.all(function (data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render('index', hbsObject);
    });
});

// POST route to create/add a burger
router.post('/api/burgers', function (req, res) {
    burger.create([
        'burger_name', 'devoured'
    ], [
        req.body.burger_name, req.body.devoured
    ], function (result) {
        // send back the ID of the new burger
        res.json({ id: result.insertId });
    });
});

// PUT route to update burger's devoured state
router.put('api/burgers/:id', function (req, res) {
    var condition = 'id = ' + req.params.id;

    console.log('condition', condition);

    burger.update(
        {
            devoured: req.body.devoured
        },
        condition, function (result) {
            if (result.changedRows === 0) {
                // if no rows were changed then the ID doesn't exist, so return status 404
                return res.status(404).end();
            } else {
                res.status(200).end();
            }
        });
});

// export routes for server.js to use
module.exports = router;
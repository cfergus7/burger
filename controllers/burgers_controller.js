var express = require("express");

var router = express.Router();

//Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// CREATE ALL ROUTES
router.get("/", function (req, res) {
    burger.all(function (data) {
        // handle bars object 
        var hbsObject = {
            burger: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.get("/api/burgers", function (req, res) {
    burger.all(function (data) {
        var hbsObject = {
            burger: data
        };
        console.log(hbsObject);
        res.json(hbsObject);
    });
});

// creating new burger
router.post("/api/burgers", function (req, res) {
    burger.create(["burger_name"], [req.body.burger_name], function (result) {
        // Send back the ID of the new quote
        res.json({
            id: result.insertId
        });
    });
});

// route for updating the burgers devoured status
router.put("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);
    burger.update({
        devoured: req.body.devoured
    }, 
    condition, 
    function (result) {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        };
    });
});

// route for updating the burgers devoured status
router.delete("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    burger.delete(condition, function (result) {
        if (result.affectedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        };
    });
});



module.exports = router;
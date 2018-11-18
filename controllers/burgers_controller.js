var express = require("express");

var router = express.Router();

var burger = require("../models/burger.js");

router.get("/", function(req, res) {
    console.log("select all")
    // Select all burgers, stores them into an array
    // and then render them to the index handlebar
    burger.selectAll(function(data) {
        var hbsObject = {
            burgers: data
        }
        console.log("hi" + JSON.stringify(data))
        res.render("index", hbsObject);
    });
});

// Inserts a new burger into the burgers table and then returns 
// the id of the newly added burger
router.post("/api/burgers", function(req, res) {
    // console.log(req.body.burger_name);
    // console.log(typeof req.body.devoured);

  
    burger.insertOne(["burger_name", "devoured"],
                     [req.body.burger_name, false],
                     function(result) {
                        res.json({id: result.id})
                
                     });
});

// Updates a burger (Devoured) in the burgers table

router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    //console.log(req.body.devoured);
    burger.updateOne({
        devoured: req.body.devoured
    }, condition, function(result) {
        if(result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});



module.exports = router;
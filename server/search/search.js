// 2 functions
// search data table and return landlord that matches first and last name

var mongoose = require('mongoose');
// var textSearch = require('mongoose-text-search');
var userModel = require('../models/userModel.js');

function search() {}

search.prototype.searchLandlord = function(req, res) {

    var name = req.body.name;
    console.log(req.body.name);

    userModel.find({
        $or: [{
            firstName: name
        }, {
            lastName: name
        }]
    }, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });

    // console.log(bob);
    res.sendStatus(200);
    // res.status(200).send(bob);

}


module.exports = new search();


/**
 * Dependencies
 */
 var mongoose = require('mongoose');
// var textSearch = require('mongoose-text-search');
var searchPlugin = require('mongoose-search-plugin');
var userModel = require('../models/userModel.js');
var propertyModel = require('../models/propertyModel.js');


function search() {}

search.prototype.searchLandlord = function(req, res) {

    var name = req.body.name;
    console.log(req.body.name);

    var pattern = /\s/;
    var space = pattern.test(name);

    if (space) { // first and last name
        var words = name.match(/\w+/g);
        var first = words[0];
        var last = words[1];

        userModel.find({
                firstName: first,
                lastName: last
        }, function(err, result) {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            } else {
                console.log(result);
                res.status(200).send(result);
            }
        }); 
    } else { // one name
        userModel.find({
            $or: [{
                firstName: name
            }, {
                lastName: name
            }]
        }, function(err, result) {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            } else {
                console.log(result);
                res.status(200).send(result);
            }
        });
    }

    // console.log(bob);
    // res.sendStatus(200);
    // res.status(200).send(bob);

}


search.prototype.searchProperty = function(req, res) {
    // var query = req.body;
    // console.log(req.body);


    // propertyModel.plugin(searchPlugin, {
    //   fields: ['city', 'bedrooms', 'bathrooms', 'housingType', 'price', 'length', 'catsOk', 'dogsOk']
    // });

    // propertyModel.search('some query', {title: 1}, {
    //   conditions: {title: {$exists: true}},
    //   sort: {title: 1},
    //   limit: 10
    // }, function(err, data) {
    //   // array of finded results 
    //   console.log(data.results);
    //   // count of all matching objects 
    //   console.log(data.totalCount);
    // });



}


module.exports = new search();

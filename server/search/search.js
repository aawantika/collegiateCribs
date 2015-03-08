/**
 * Dependencies
 */
var mongoose = require('mongoose');
// var textSearch = require('mongoose-text-search');
// var searchPlugin = require('mongoose-search-plugin');
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
    //var distanceFromCampus = req.body.distanceFromCampus;
    var bedrooms = req.body.bedrooms;
    var bathrooms = req.body.bathrooms;
    var housingType = req.body.housingType;
    var price = req.body.price;
    var length = req.body.length;
    var catsOk = req.body.catsOk;
    var dogsOk = req.body.dogsOk;

    // console.log(req.body.distanceFromCampus);
    console.log(req.body.bedrooms);
    console.log(req.body.bedrooms + 1);
    console.log(req.body.bathrooms);
    console.log(req.body.housingType);
    console.log(req.body.price);
    console.log(req.body.length);
    console.log(req.body.catsOk);
    console.log(req.body.dogsOk);


    /* THIS IS HOW YOU DO IT:
        For every match field, you need to add it into the matchvar 
        So if something exists (ie, not undefined), add it to matchvar.
        A simple if (req.body.bedrooms) is good enough to check for undefined.
    */

    // 
    // {
    //                 bedrooms: {
    //                     $in: [bedrooms, bedrooms + 1]
    //                 },
    //                 bathrooms: bathrooms,
    //                 housingType: housingType,
    //                 price: price,
    //                 length: length,
    //                 catsOk: catsOk,
    //                 dogsOk: dogsOk

    //             }

    var matchVar = {};
    // if (req.body.distanceFromCampus) {
    //     matchVar.distanceFromCampus = req.body.distanceFromCampus;
    // }
    if (req.body.bedrooms) {
        matchVar.bedrooms = {
            $in: [req.body.bedrooms, req.body.bedrooms + 1]
        };
    }
    if (req.body.bathrooms) {
        matchVar.bathrooms = req.body.bathrooms;
    }
    if (req.body.housingType) {
        matchVar.housingType = req.body.housingType;
    }
    if (req.body.price) {
        matchVar.price = req.body.price;
    }
    if (req.body.length) {
        matchVar.length = req.body.length;
    }
    if (req.body.catsOk) {
        matchVar.catsOk = req.body.catsOk;
    }
    if (req.body.dogsOk) {
        matchVar.dogsOk = req.body.dogsOk;
    }
    
    /* THEN FOR PROJECT
        Take out each cond for each field and make it it's own variable
        Keep it an empty object {} but actually define it if the input field exists.
        Ie, req.body.bedrooms exists, so we need to add it to our match and have it in project
    */


    // var projectvarDistance = {};

    var projectvarBed = {};
    if (req.body.bedrooms) {
        projectvarBed = {
            "$cond": [{
                    "$eq": ["$bedrooms", bedrooms]
                },
                10, {
                    "$cond": [{
                            "$eq": ["$bedrooms", bedrooms + 1]
                        },
                        5,
                        0
                    ]
                }
            ]
        };
    }

    var projectvarBath = {};
    if (req.body.bathrooms) {
        projectvarBath = {
            "$cond": [{
                    "$eq": ["$bathrooms", bathrooms]
                },
                10,
                2
            ]
        };
    }

    var projectvarType = {};
    if (req.body.housingType) {
        projectvarType = {
            "$cond": [{
                    "$eq": ["$housingType", housingType]
                },
                10,
                0
            ]
        };
    }

    var projectvarPrice = {};
    if (req.body.price) {
        projectvarPrice = {
            "$cond": [{
                    "$eq": ["$price", price]
                },
                10,
                1
            ]
        };
    }

    var projectvarLength = {};
    if (req.body.length) {
        projectvarLength = {
            "$cond": [{
                    "$eq": ["$length", length]
                },
                10,
                5
            ]
        };
    }

    var projectvarCats = {};
    if (req.body.catsOk) {
        projectvarCats = {
            "$cond": [
                "$catsOk",
                10,
                0
            ]
        };
    }

    var projectvarDogs = {};
    if (req.body.dogsOk) {
        projectvarDogs = {
            "$cond": [
                "$dogsOk",
                10,
                0
            ]
        };
    }



    propertyModel.aggregate([{
        $match: {
            $or: [
                    matchVar
                ]
        }
    }, {
        $project: {
            // distanceFromCampus: 1,
            bedrooms: 1,
            bathrooms: 1,
            housingType: 1,
            price: 1,
            length: 1,
            catsOk: 1,
            dogsOk: 1,
            score: {
                $add: [
                "$projectvarBed",
                "$projectvarBath",
                "$projectvarType",
                "$projectvarPrice",
                "$projectvarLength",
                "$projectvarCats",
                "$projectvarDogs"
                ]
            }
        }
    }, {
        $sort: {
            score: -1
        }
    }], function(err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            console.log(result);
            res.status(200).send(result);
        }
    });
}


module.exports = new search();

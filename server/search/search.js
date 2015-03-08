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
    var bedroomsInput = req.body.bedrooms;
    var bathrooms = req.body.bathrooms;
    var housingType = req.body.housingType;
    var price = req.body.price;
    var length = req.body.length;
    var catsOk = req.body.catsOk;
    var dogsOk = req.body.dogsOk;

    // console.log(req.body.distanceFromCampus);
    console.log(req.body.bedrooms);
    console.log(req.body.bathrooms);
    console.log(req.body.housingType);
    console.log(req.body.price);
    console.log(req.body.length);
    console.log(req.body.catsOk);
    console.log(req.body.dogsOk);


    propertyModel.aggregate([{
        $match: {
            // $or: [{
            //         distanceFromCampus: distanceFromCampus
            //     }
            //     // { distanceFromCampus: distanceFromCampus + 5 },
            //     // { distanceFromCampus: distanceFromCampus + 10 },
            //     // { distanceFromCampus: distanceFromCampus + 15 },
            //     // { distanceFromCampus: distanceFromCampus + 20 },
            // ],
            // $or: [{
            //     bedrooms: bedroomsInput
            // }, {
            //     bedrooms: bedroomsInput + 1
            // }],
            // bathrooms: bathrooms,
            // housingType: housingType,
            // price: price,
            // length: length,
            catsOk: catsOk,
            dogsOk: dogsOk
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

    // propertyModel.aggregate([{
    //     $match: {
    //         // $or: [{
    //         //         distanceFromCampus: distanceFromCampus
    //         //     }
    //         //     // { distanceFromCampus: distanceFromCampus + 5 },
    //         //     // { distanceFromCampus: distanceFromCampus + 10 },
    //         //     // { distanceFromCampus: distanceFromCampus + 15 },
    //         //     // { distanceFromCampus: distanceFromCampus + 20 },
    //         // ],
    //         $or: [{
    //             bedrooms: bedroomsInput
    //         }, {
    //             bedrooms: bedroomsInput + 1
    //         }],
    //         bathrooms: bathrooms,
    //         housingType: housingType,
    //         price: price,
    //         length: length,
    //         catsOk: catsOk,
    //         dogsOk: dogsOk
    //     }
    // }, {
    //     $project: {
    //         // distanceFromCampus: 1,
    //         bedrooms: 1,
    //         bathrooms: 1,
    //         housingType: 1,
    //         price: 1,
    //         length: 1,
    //         catsOk: 1,
    //         dogsOk: 1,
    //         score: {
    //             $add: [
    //                 // {
    //                 //     $cond: [{
    //                 //             $eq: ["$distanceFromCampus", distanceFromCampus]
    //                 //         },
    //                 //         20,
    //                 //         3
    //                 //     ]
    //                 // }, 
    //                 {
    //                     "$cond": [{
    //                             "$eq": ["$bedrooms", bedroomsInput]
    //                         },
    //                         10, {
    //                             "$cond": [{
    //                                     "$eq": ["$bedrooms", bedroomsInput + 1]
    //                                 },
    //                                 5,
    //                                 0
    //                             ]
    //                         }

    //                     ]
    //                 }, {
    //                     "$cond": [{
    //                             "$eq": ["$bathrooms", bathrooms]
    //                         },
    //                         10,
    //                         2
    //                     ]
    //                 }, {
    //                     "$cond": [{
    //                             "$eq": ["$housingType", housingType]
    //                         },
    //                         10,
    //                         0
    //                     ]
    //                 }, {
    //                     "$cond": [{
    //                             "$eq": ["$price", price]
    //                         },
    //                         10,
    //                         1
    //                     ]
    //                 }, {
    //                     "$cond": [{
    //                             "$eq": ["$length", length]
    //                         },
    //                         10,
    //                         5
    //                     ]
    //                 }, {
    //                     "$cond": [
    //                         "$catsOk",
    //                         10,
    //                         0
    //                     ]
    //                 }, {
    //                     "$cond": [
    //                         "$dogsOk",
    //                         10,
    //                         0
    //                     ]
    //                 },
    //             ]
    //         }
    //     }
    // }, {
    //     $sort: {
    //         score: -1
    //     }
    // }], function(err, result) {
    //     if (err) {
    //         console.log(err);
    //         res.status(400).send(err);
    //     } else {
    //         console.log(result);
    //         res.status(200).send(result);
    //     }
    // });




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

/**
 * Dependencies
 */
var mongoose = require('mongoose');
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
}


search.prototype.searchProperty = function(req, res) {

    console.log(req.body.bedrooms);
    console.log(req.body.bathrooms);
    console.log(req.body.housingType);
    console.log(req.body.price);
    console.log(req.body.length);
    console.log(req.body.catsOk);
    console.log(req.body.dogsOk);


    var matchVar = {};

    if (req.body.bedrooms) {
        matchVar.bedrooms = {
            $in: [req.body.bedrooms, req.body.bedrooms + 1, req.body.bedrooms - 1]
        };
    }
    if (req.body.bathrooms) {
        matchVar.bathrooms = {
            $in: [req.body.bathrooms, req.body.bathrooms + 1, req.body.bathrooms - 1]
        };
    }
    if (req.body.housingType) {
        matchVar.housingType = {
            $in:req.body.housingType
        };
    }
    if (req.body.price) {
        matchVar.price = {
            $in: [req.body.price, req.body.price + 100, req.body.price - 100]
        };
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


    var projectvarBed = {};
    if (req.body.bedrooms) {
        projectvarBed = {
            $cond: [{
                    $eq: ["$bedrooms", req.body.bedrooms]
                },
                10, {
                    $cond: [{
                            $eq: ["$bedrooms", req.body.bedrooms + 1]
                        },
                        5, {
                            $cond: [{
                                    $eq: ["$bedrooms", req.body.bedrooms - 1]
                                },
                                3,
                                0
                            ]
                        }
                    ]
                }
            ]
        };
    } else {
        projectvarBed = 0;
    }

    var projectvarBath = {};
    if (req.body.bathrooms) {
        projectvarBath = {
            $cond: [{
                    $eq: ["$bathrooms", req.body.bathrooms]
                },
                10, {
                    $cond: [{
                            $eq: ["$bathrooms", req.body.bathrooms + 1]
                        },
                        5, {
                            $cond: [{
                                    $eq: ["$bathrooms", req.body.bathrooms - 1]
                                },
                                3,
                                0
                            ]
                        }
                    ]
                }
            ]
        };
    } else {
        projectvarBath = 0;
    }

    var projectvarType = {};
    if (req.body.housingType) {
        projectvarType = {
            $cond: [{
                    $eq: ["$housingType", req.body.housingType]
                },
                10,
                0
            ]
        };
    } else {
        projectvarType = 0;
    }

    var projectvarPrice = {};
    if (req.body.price) {
        projectvarPrice = {
            $cond: [{
                    $eq: ["$price", req.body.price]
                },
                10, {
                    $cond: [{
                            $eq: ["$price", req.body.price + 100]
                        },
                        6, {
                            $cond: [{
                                    $eq: ["$price", req.body.price - 100]
                                },
                                8,
                                0
                            ]
                        }
                    ]
                }
            ]
        };
    } else {
        projectvarPrice = 0;
    }

    var projectvarLength = {};
    if (req.body.length) {
        projectvarLength = {
            $cond: [{
                    $eq: ["$length", req.body.length]
                },
                10,
                0
            ]
        };
    } else {
        projectvarLength = 0;
    }

    var projectvarCats = {};
    if (req.body.catsOk) {
        projectvarCats = {
            $cond: [
                catsOk,
                10,
                0
            ]
        };
    } else {
        projectvarCats = 0;
    }

    var projectvarDogs = {};
    if (req.body.dogsOk) {
        projectvarDogs = {
            $cond: [
                dogsOk,
                10,
                0
            ]
        };
    } else {
        projectvarDogs = 0;
    }


    propertyModel.aggregate([{
        $match: {
            $or: [
                matchVar
            ]
        }
    }, {
        $project: {
            bedrooms: 1,
            bathrooms: 1,
            housingType: 1,
            price: 1,
            length: 1,
            catsOk: 1,
            dogsOk: 1,
            score: {
                $add: [
                    projectvarBed,
                    projectvarBath,
                    projectvarType,
                    projectvarPrice,
                    projectvarLength,
                    projectvarCats,
                    projectvarDogs
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

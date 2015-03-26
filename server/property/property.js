'use strict';

/**
 * Dependencies
 */
var userModel = require('../models/userModel.js');
var propertyModel = require('../models/propertyModel.js');
var generateUuid = require('../error_checking/generateUuid.js');
var generalCheck = require('../error_checking/generalCheck.js');
var propertyCheck = require('../error_checking/propertyCheck.js');
var userCheck = require('../error_checking/userCheck.js');

function property() {}

property.prototype.createProperty = function(req, res) {
    // http://localhost:8080/property/create POST

    var profileType = null;

    var body = req.body;
    generalCheck.checkBody(body)
        .then(function(result) {
            return userCheck.checkUsername(body.username);
        })
        .then(function(result) {
            return userModel.findOne({
                username: body.username
            }).exec();
        })
        .then(function(user) {
            return userCheck.userExists(user);
        })
        .then(function(user) {
            profileType = user.send.profileType;
            return propertyCheck.checkAddress(body.address);
        })
        .then(function(result) {
            return propertyCheck.checkCity(body.city);
        })
        .then(function(result) {
            return propertyCheck.checkState(body.state);
        })
        .then(function(result) {
            return propertyCheck.checkZipcode(body.zipcode);
        })
        .then(function(result) {
            return propertyCheck.checkDistanceFromCampus(body.distanceFromCampus);
        })
        .then(function(result) {
            return propertyCheck.checkBedrooms(body.bedrooms);
        })
        .then(function(result) {
            return propertyCheck.checkBathrooms(body.bathrooms);
        })
        .then(function(result) {
            return propertyCheck.checkHousingType(body.housingType);
        })
        .then(function(result) {
            return propertyCheck.checkPrice(body.price);
        })
        .then(function(result) {
            return propertyCheck.checkUtilities(body.utilities);
        })
        .then(function(result) {
            return propertyCheck.checkLength(body.length);
        })
        .then(function(result) {
            return propertyCheck.checkCats(body.catsOk);
        })
        .then(function(result) {
            return propertyCheck.checkDogs(body.dogsOk);
        })
        .then(function(result) {
            return propertyCheck.checkPropertyTours(body.propertyTours);
        })
        .then(function(result) {
            return propertyCheck.checkDescription(body.description);
        })
        .then(function(result) {
            return propertyCheck.checkLastRenovationDate(body.lastRenovationDate);
        })
        .then(function(result) {
            return propertyModel.findOne({
                address: body.address
            }).exec();
        })
        .then(function(propertyReturn) {
            return propertyCheck.duplicateProperty(propertyReturn);
        })
        .then(function(result) {
            var newProperty = new propertyModel();
            newProperty.propertyId = generateUuid.newUuid();;
            newProperty.ownerId = body.username;
            newProperty.verified = false;

            newProperty.address = body.address;
            newProperty.city = body.city;
            newProperty.state = body.state;
            newProperty.zipcode = body.zipcode;
            newProperty.distanceFromCampus = body.distanceFromCampus;

            if (profileType === "student") {
                newProperty.leaseType = "sublease";
            } else {
                newProperty.leaseType = "lease";
            }
            newProperty.bedrooms = body.bedrooms;
            newProperty.bathrooms = body.bathrooms;
            newProperty.housingType = body.housingType;
            newProperty.price = body.price;
            newProperty.utilities = body.utilities;

            newProperty.availability = true;
            newProperty.length = body.length;
            newProperty.catsOk = body.catsOk;
            newProperty.dogsOk = body.dogsOk;

            newProperty.propertyTours = body.propertyTours;
            newProperty.description = body.description;
            newProperty.lastRenovationDate = body.lastRenovationDate;

            return newProperty.save();
        })
        .then(function(result) {
            res.sendStatus(200);
        })
        .catch(function(error) {
            console.log(error);

            if (error.status == 404 || error.status == 406 || error.status == 409) {
                res.status(error.status).send(error.send);
            } else {
                res.status(500).send("internal error");
            }
        });
}

property.prototype.retrieveProperty = function(req, res) {
    // http://localhost:8080/property/retrieve POST

    var body = req.body;
    generalCheck.checkBody(body)
        .then(function(result) {
            return propertyCheck.checkPropertyId(body.propertyId);
        })
        .then(function(result) {
            return propertyModel.findOne({
                propertyId: body.propertyId
            }).exec();
        })
        .then(function(property) {
            return propertyCheck.propertyExists(property);
        })
        .then(function(result) {
            result.send = result.send.toObject();
            delete result.send._id;
            delete result.send.__v;

            res.status(result.status).send(result.send);
        })
        .catch(function(error) {
            console.log(error);
            if (error.status == 406 || error.status == 404) {
                res.status(error.status).send(error.send);
            } else {
                res.status(500).send("internal error");
            }
        });
}

property.prototype.retrieveAllPropertyByUsername = function(req, res) {
    // http://localhost:8080/property/retrieve POST

    var body = req.body;
    generalCheck.checkBody(body)
        .then(function(result) {
            return userCheck.checkUsername(body.username);
        })
        .then(function(result) {
            return propertyModel.find({
                ownerId: body.username
            }).exec();
        })
        .then(function(property) {
            console.log("HERE");
            console.log(property);
            return propertyCheck.propertyExists(property);
        })
        .then(function(result) {
            for (var i = 0; i < result.send.length; i++) {
                result.send[i] = result.send[i].toObject();
                delete result.send[i]._id;
                delete result.send[i].__v;
            }
            res.status(result.status).send(result.send);
        })
        .catch(function(error) {
            console.log(error);
            if (error.status == 406 || error.status == 404) {
                res.status(error.status).send(error.send);
            } else {
                res.status(500).send("internal error");
            }
        });
}

property.prototype.updateProperty = function(req, res) {
    // http://localhost:8080/property/update POST

    var body = req.body;
    generalCheck.checkBody(body)
        .then(function(result) {
            return userCheck.checkUsername(body.username);
        })
        .then(function(result) {
            return userModel.findOne({
                username: body.username
            }).exec();
        })
        .then(function(result) {
            return propertyCheck.checkDistanceFromCampus(body.distanceFromCampus);
        })
        .then(function(result) {
            return propertyCheck.checkBedrooms(body.bedrooms);
        })
        .then(function(result) {
            return propertyCheck.checkBathrooms(body.bathrooms);
        })
        .then(function(result) {
            return propertyCheck.checkPrice(body.price);
        })
        .then(function(result) {
            return propertyCheck.checkUtilities(body.utilities);
        })
        .then(function(result) {
            return propertyCheck.checkAvailability(body.availability);
        })
        .then(function(result) {
            return propertyCheck.checkLength(body.length);
        })
        .then(function(result) {
            return propertyCheck.checkCats(body.catsOk);
        })
        .then(function(result) {
            return propertyCheck.checkDogs(body.dogsOk);
        })
        .then(function(result) {
            return propertyCheck.checkPropertyTours(body.propertyTours);
        })
        .then(function(result) {
            return propertyCheck.checkDescription(body.description);
        })
        .then(function(result) {
            return propertyCheck.checkLastRenovationDate(body.lastRenovationDate);
        })
        .then(function(result) {
            return propertyModel.findOne({
                propertyId: body.propertyId
            }).exec();
        })
        .then(function(property) {
            return propertyCheck.propertyExists(property);
        })
        .then(function(property) {
            property = property.send;

            property.distanceFromCampus = body.distanceFromCampus;
            property.bedrooms = body.bedrooms;
            property.bathrooms = body.bathrooms;
            property.price = body.price;
            property.utilities = body.utilities;

            property.availability = body.availability;
            property.length = body.length;
            property.catsOk = body.catsOk;
            property.dogsOk = body.dogsOk;

            property.propertyTours = body.propertyTours;
            property.description = body.description;
            property.lastRenovationDate = body.lastRenovationDate;
            return property.save();
        })
        .then(function(result) {
            res.sendStatus(200);
        })
        .catch(function(error) {
            console.log(error);

            if (error.status == 404 || error.status == 406) {
                res.status(error.status).send(error.send);
            } else {
                res.status(500).send("internal error");
            }
        });
}

property.prototype.deleteProperty = function(req, res) {
    // http://localhost:3000/student/update POST

    var body = req.body;
    generalCheck.checkBody(body)
        .then(function(result) {
            return userCheck.checkUsername(body.username);
        })
        .then(function(result) {
            return userModel.findOne({
                username: body.username
            }).exec();
        })
        .then(function(result) {
            return propertyCheck.checkPropertyId(body.propertyId);
        })
        .then(function(result) {
            return propertyModel.findOne({
                ownerId: body.username,
                propertyId: body.propertyId
            }).exec();
        })
        .then(function(property) {
            return propertyCheck.propertyExists(property);
        })
        .then(function(result) {
            return result.send.remove();
        })
        .then(function(result) {
            res.status(200).send("removed property successfully");
        })
        .catch(function(error) {
            console.log(error);
            if (error.status == 406 || error.status == 404) {
                res.status(error.status).send(error.send);
            } else {
                res.status(500).send("internal error");
            }
        });
}

module.exports = new property();
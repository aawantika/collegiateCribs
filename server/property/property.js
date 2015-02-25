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
            return propertyCheck.checkLeaseType(body.leaseType);
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

            newProperty.leaseType = body.leaseType;
            newProperty.bedrooms = body.bedrooms;
            newProperty.bathrooms = body.bathrooms;
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
    var addressInput = body.address;

    propertyModel.findOne({
        address: addressInput
    }, function(err, property) {
        if (property) {
            res.status(200).send(property);
        } else {
            res.status(400).send('error');
        }
    });
}

property.prototype.updateProperty = function(req, res) {
    // http://localhost:8080/property/update POST
    var body = req.body;

    var addressInput = body.address;
    var bedroomsInput = body.bedrooms;
    var bathroomsInput = body.bathrooms;
    var availabilityInput = body.availability;
    var priceInput = body.price;
    var lengthInput = body.length;
    var catsOKInput = body.catsOK;
    var dogsOKInput = body.dogsOK;
    var propertyToursInput = body.propertyTours;
    var descriptionInput = body.description;
    var lastRenovationDateInput = body.lastRenovationDate;

    propertyModel.findOne({
        address: addressInput
    }, function(err, property) {
        if (!property) {
            res.status(404).send("can't find property");
        } else {
            // save property
            property.bedrooms = bedroomsInput;
            property.bathrooms = bathroomsInput;
            property.availability = availabilityInput;
            property.price = priceInput;
            property.length = lengthInput;
            property.catsOK = catsOKInput;
            property.dogsOK = dogsOKInput;
            property.propertyTours = propertyToursInput;
            property.description = descriptionInput;
            property.lastRenovationDate = lastRenovationDateInput;

            property.save(function(err) {
                if (err) {
                    res.status(500).send('error saving');
                } else {
                    res.status(201).send('saved successfully');
                }
            });
        }
    });
}

property.prototype.deleteProperty = function(req, res) {
    // http://localhost:3000/student/update POST
    var body = req.body;

    var ownerIdInput = body.ownerId;
    var addressInput = body.address;

    propertyModel.findOne({
        address: addressInput
    }, function(err, property) {
        if (!property) {
            res.status(404).send("can't find property");
        } else if (property.ownerID != ownerIdInput) {
            res.status(400).send("can't find owner")
        } else {
            property.remove();
            res.status(200).send("removed successfully");
        }
    });
}

// Generates hash using bCrypt
/*var createHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}*/

module.exports = new property();

'use strict';

/**
 * Dependencies
 */
var propertyModel = require('../models/propertyModel.js');
var generateUuid = require('../error_checking/generateUuid.js');
// var bcrypt = require('bcrypt-nodejs');

function property() {}

property.prototype.createProperty = function(req, res) {
    // http://localhost:8080/property/create POST

    var uuidInput = generateUuid.saveUuid();

    // general
    var body = req.body;
    var ownerIdInput = body.ownerID;
    var isASubleaseInput = body.isASublease;
    var bedroomsInput = body.bedrooms;
    var bathroomsInput = body.bathrooms;
    var typeInput = body.type;
    var addressInput = body.address;
    var availabilityInput = body.availability;
    var verifiedInput = body.verified;
    var priceInput = body.price;
    var lengthInput = body.length;
    var catsOKInput = body.catOK;
    var dogsOKInput = body.dogsOK;
    var propertyToursInput = body.propertyTours;
    var descriptionInput = body.description;
    var lastRenovationDateInput = body.lastRenovationDate;

    propertyModel.findOne({
        address: addressInput
    }, function(err, property) {
        if (property) {
            console.log("error: property already exists");
            res.status(400).send('Bad Request');
        } else {
            var newProperty = new propertyModel();
            newProperty.uuid = uuidInput;
            newProperty.ownerId = ownerIdInput;
            newProperty.isASublease = isASubleaseInput;
            newProperty.bedrooms = bedroomsInput;
            newProperty.bathrooms = bathroomsInput;
            newProperty.type = typeInput;
            newProperty.address = addressInput;
            newProperty.availability = availabilityInput;
            newProperty.verified = verifiedInput;
            newProperty.price = priceInput;
            newProperty.length = lengthInput;
            newProperty.catsOK = catsOKInput;
            newProperty.dogsOK = dogsOKInput;
            newProperty.propertyTours = propertyToursInput;
            newProperty.decription = descriptionInput;
            newProperty.lastRenovationDate = lastRenovationDateInput;

            newProperty.save(function(err) {
                if (err) {
                    console.log(" error");
                    res.status(500).send('error saving');
                } else {
                    return res.sendStatus(200);
                }
            });

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
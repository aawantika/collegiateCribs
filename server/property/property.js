'use strict';

/**
 * Dependencies
 */
var propertyModel = require('../models/propertyModel.js');
var generateUuid = require('../error_checking/generateUuid.js');
var bcrypt = require('bcrypt-nodejs');

function property() {}

property.prototype.createProperty = function(req, res) {
    // http://localhost:3000/user/create POST

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

user.prototype.retrieveProperty = function(req, res) {
    // http://localhost:3000/user/retrieve POST

    var body = req.body;
    var usernameInput = body.username;

    userModel.findOne({
        username: usernameInput
    }, function(err, user) {
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(400).send('error');
        }
    });
}

user.prototype.updateUser = function(req, res) {
    // http://localhost:3000/student/update POST
    var body = req.body;

    var usernameInput = body.username;
    var profileTypeInput = body.profileType;
    var firstNameInput = body.firstName;
    var lastNameInput = body.lastName;
    var passwordInput = body.password;
    var phoneInput = body.phone;
    var emailInput = body.email;

    // student specific
    var campusInput = body.campus;

    userModel.findOne({
        username: usernameInput
    }, function(err, user) {
        if (!user) {
            res.status(404).send("can't find student");
        } else {
            // save user
            user.password = passwordInput;
            user.firstName = firstNameInput;
            user.lastName = lastNameInput;
            user.email = emailInput;

            if (profileTypeInput === "student") {
                user.campus = campusInput;
            }

            user.save(function(err) {
                if (err) {
                    res.status(500).send('error saving');
                } else {
                    res.status(201).send('saved successfully');
                }
            });
        }
    });
}

user.prototype.deleteUser = function(req, res) {
    // http://localhost:3000/student/update POST
    var body = req.body;

    var usernameInput = body.username;
    var passwordInput = body.password;

    userModel.findOne({
        username: usernameInput
    }, function(err, user) {
        if (!user) {
            res.status(404).send("can't find student");
        } else if (user.password != passwordInput) {
            res.status(400).send("invalid password");
        } else if (user.password === passwordInput) {
            user.remove();
            res.status(200);
        }
    });
}

// Generates hash using bCrypt
var createHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

module.exports = new user();
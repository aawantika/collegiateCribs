'use strict';

/**
 * Dependencies
 */
var landlordModel = require('../../models/landlordModel.js');
var uuid = require('node-uuid');

function landlord() {}

landlord.prototype.createLandlord = function(req, res, next) {
    // http://localhost:3000/landlord/create POST

    var uuidInput = generateUuid.saveUuid();

    var body = req.body;
    var firstNameInput = body.firstName;
    var lastNameInput = body.lastName;
    var usernameInput = body.username;
    var passwordInput = body.password;
    var emailInput = body.email;
    var campusInput = body.campus;

    landlordModel.findOne({
        username: usernameInput
    }, function(err, landlord) {
        if (landlord) {
            res.status(400).send('duplicate username');
            next();
        } else {
            landlordModel.findOne({
                email: emailInput
            }, function(err, landlord) {
                if (landlord) {
                    res.status(400).send('duplicate email');
                    next();
                } else {
                    var newlandlord = new landlordModel();
                    newlandlord.uuid = uuidInput;
                    newlandlord.profileType = "landlord";
                    newlandlord.firstName = firstNameInput;
                    newlandlord.lastName = lastNameInput;
                    newlandlord.username = usernameInput;
                    newlandlord.password = passwordInput;
                    newlandlord.email = emailInput;
                    newlandlord.campus = campusInput;

                    newlandlord.save(function(err) {
                        if (err) {
                            res.status(500).send('error saving');
                        } else {
                            res.status(201).send('saved successfully');
                        }
                    });
                    next();
                }
            });
        }
    });
}

landlord.prototype.retrievelandlord = function(req, res, next) {
    // http://localhost:3000/landlord/retrieve POST

    var body = req.body;
    var usernameInput = body.username;

    landlordModel.findOne({
        username: usernameInput
    }, function(err, landlord) {
        if (landlord) {
            res.status(200).send(landlord);
            next();
        } else {
            res.status(400).send('error');
            next();
        }
    });
}

landlord.prototype.updatelandlord = function(req, res, next) {
    // http://localhost:3000/landlord/update POST
    var body = req.body;

    var firstNameInput = body.firstName;
    var lastNameInput = body.lastName;
    var usernameInput = body.username;
    var passwordInput = body.password;
    var emailInput = body.email;
    var campusInput = body.campus;

    landlordModel.findOne({
        username: usernameInput
    }, function(err, landlord) {
        if (!landlord) {
            res.status(404).send("can't find landlord");
            next();
        }

        landlord.firstName = firstNameInput;
        landlord.lastName = lastNameInput;
        landlord.username = usernameInput;
        landlord.password = passwordInput;
        landlord.email = emailInput;
        landlord.campus = campusInput;

        landlord.save(function(err) {
            if (err) {
                res.status(500).send('error saving');
            } else {
                res.status(201).send('saved successfully');
            }
        });
        next();
    });
}

landlord.prototype.deletelandlord = function(req, res, next) {
    // http://localhost:3000/landlord/update POST
    var body = req.body;

    var usernameInput = body.username;
    var passwordInput = body.password;

    landlordModel.findOne({
        username: usernameInput
    }, function(err, user) {
        if (!landlord) {
            res.status(404).send("can't find landlord");
            next();
        } else if (landlord.password != passwordInput) {
            res.status(400).send("invalid password");
            next();
        } else if (landlord.password === passwordInput) {
            landlord.remove();
            res.send(204);
            next();
        }
    });
}


module.exports = new landlord();

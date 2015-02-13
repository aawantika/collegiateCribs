'use strict';

//

/**
 * Dependencies
 */
var userModel = require('../models/userModel.js');
var generateUuid = require('../error_checking/generateUuid.js');
var bcrypt = require('bcrypt-nodejs');
var promise = require('promise');

/**
 * Error Checking
 */
var generalCheck = require('../error_checking/generalCheck.js');
var userCheck = require('../error_checking/userCheck.js');

function user() {}

user.prototype.createUser = function(req, res) {
    // http://localhost:3000/user/create POST

    var body = req.body;
    try {
        generalCheck.checkBody(body);
        userCheck.checkProfile(body.profileType);
        userCheck.checkUsername(body.username);
        userCheck.checkPassword(body.password);
        userCheck.checkFirstName(body.firstName);
        userCheck.checkLastName(body.lastName);
        userCheck.checkEmail(body.email);

        // optional fields
        var phoneInput = body.phoneNumber;
        if (!phoneInput) {
            phoneInput = "-1000000000";
        }
        userCheck.checkPhoneNumber(phoneInput);

        // student specific field
        var campusInput = body.campus;
        if (profileTypeInput === "student") {
            userCheck.checkcheckProfile(campusInput);
        }

        userModel.findOne({
            username: body.username
        }, function(err, usernameFound) {
            userCheck.duplicateUsername(usernameFound);

            userModel.findOne({
                email: body.email
            }, function(err, emailFound) {
                userCheck.duplicateEmail(emailFound);

                var newUser = new userModel();
                newUser.uuid = generateUuid.saveUuid();
                newUser.profileType = body.profileType;
                newUser.username = body.username;
                newUser.password = createHash(body.password);
                newUser.firstName = body.firsName;
                newUser.lastName = body.lastName;
                newUser.email = body.email;
                newUser.phoneNumber = phoneInput;

                if (newUser.profileType === "student") {
                    newUser.campus = campusInput;
                }

                newUser.save(function(err) {
                    if (err) {
                        throw {
                            code: 500,
                            status: "error saving"
                        };
                    } else {
                        return res.sendStatus(200);
                    }
                });
            });
        });
    } catch (err) {
        console.log(err);
        res.status(err.code).send(err.status);
    }
}

user.prototype.retrieveUser = function(req, res) {
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

'use strict';

//

/**
 * Dependencies
 */
var userModel = require('../models/userModel.js');
var generateUuid = require('../error_checking/generateUuid.js');
var bcrypt = require('bcrypt-nodejs');
// var Promise = require('bluebird');

/**
 * Error Checking
 */
var generalCheck = require('../error_checking/generalCheck.js');
var userCheck = require('../error_checking/userCheck.js');

function user() {}

user.prototype.createUser = function(req, res) {
    // http://localhost:3000/user/create POST

    var body = req.body;
    var phoneInput = body.phoneNumber;
    if (!phoneInput) {
        phoneInput = "-1000000000";
    }

    generalCheck.checkBody(body)
        .then(function(result) {
            return userCheck.checkProfile(body.profileType);
        })
        .then(function(result) {
            return userCheck.checkUsername(body.username);
        })
        .then(function(result) {
            return userCheck.checkPassword(body.password);
        })
        .then(function(result) {
            return userCheck.checkFirstName(body.firstName);
        })
        .then(function(result) {
            return userCheck.checkLastName(body.lastName);
        })
        .then(function(result) {
            return userCheck.checkEmail(body.email);
        })
        .then(function(result) {
            return userCheck.checkPhoneNumber(phoneInput);
        })
        .then(function(result) {
            return userCheck.checkCampus(body.campus, body.profileType);
        })
        .then(function(result) {
            return userModel.findOne({
                username: body.username
            }).exec();
        })
        .then(function(usernameReturn) {
            return userCheck.duplicateUsername(usernameReturn);
        })
        .then(function(result) {
            return userModel.findOne({
                email: body.email
            }).exec();
        })
        .then(function(emailReturn) {
            return userCheck.duplicateEmail(emailReturn);
        })
        .then(function(result) {
            var newUser = new userModel();
            newUser.uuid = generateUuid.saveUuid();
            newUser.profileType = body.profileType;
            newUser.username = body.username;
            newUser.password = createHash(body.password);
            newUser.firstName = body.firstName;
            newUser.lastName = body.lastName;
            newUser.email = body.email;

            if (phoneInput !== "-1000000000") {
                newUser.phoneNumber = phoneInput;
            }
            if (newUser.profileType === "student") {
                newUser.campus = body.campus;
            } else if (newUser.profileType === "landlord" && body.campus) {
                newUser.campus = undefined;
            }

            return newUser.save();
        })
        .then(function(result) {
            res.sendStatus(200);
        })
        .catch(function(error) {
            console.log(error);
            if (error.status == 406 || error.status == 409) {
                res.status(error.status).send(error.send);
            } else {
                res.status(500).send("internal error");
            }
        });
}

user.prototype.retrieveUser = function(req, res) {
    // http://localhost:3000/user/retrieve POST

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
        .then(function(result) {
            console.log(result.send);
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
    generalCheck.checkBody(body)
        .then(function(result) {
            return userCheck.checkUsername(body.username);
        })
        .then(function(result) {
            return userCheck.checkPassword(body.password);
        })
        .then(function(result) {
            return userModel.findOne({
                username: body.username
            }).exec();
        })
        .then(function(user) {
            return userCheck.userExists(user);
        })
        .then(function(result) {
            if (compareHash(body.password, result.password)) {
                console.log(result.send);
                user.remove();
                console.log("removed!");
                res.status(result.status).send(result.send);
            } else {
                throw new Error("password error");
            }
        })
        .catch(function(error) {
            if (error.message == "password error") {
                res.status(403).send("password doesn't match");
            } else if (error.status == 406 || error.status == 404 || error.status == 403) {
                res.status(error.status).send(error.send);
            } else {
                res.status(500).send("internal error");
            }
        });
}

// Generates hash using bCrypt
var createHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

var compareHash = function(passwordNew, passwordOld) {
    bcrypt.compare(passwordNew, passwordOld, function(err, res) {
        if (err) {
            return false;
        }
        return true
    });
}

var handleError = function(error) {
    res.status(error.status).send(error.send);
}

module.exports = new user();

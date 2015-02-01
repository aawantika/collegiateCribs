'use strict';

/**
 * Dependencies
 */
var userModel = require('../models/userModel.js');
var generateUuid = require('../error_checking/generateUuid.js');
var bcrypt = require('bcrypt-nodejs');

function user() {}

user.prototype.createUser = function(req, res) {
    // http://localhost:3000/user/create POST

    var uuidInput = generateUuid.saveUuid();

    // general
    var body = req.body;
    var profileTypeInput = body.profileType;
    var usernameInput = body.username;
    var passwordInput = body.password;
    var firstNameInput = body.firstName;
    var lastNameInput = body.lastName;
    var emailInput = body.email;
    var phoneInput = body.phone;

    var campusInput = body.campus;

    userModel.findOne({
        username: usernameInput
    }, function(err, user) {
        if (user) {
            console.log("user error");
            res.status(400).send('Bad Request');
        } else {
            userModel.findOne({
                email: emailInput
            }, function(err, email) {
                if (email) {
                    console.log("email error");
                    res.status(404).send('Bad Request');
                } else {
                    var newUser = new userModel();
                    newUser.uuid = uuidInput;
                    newUser.profileType = profileTypeInput;
                    newUser.username = usernameInput;
                    newUser.password = createHash(passwordInput);
                    newUser.firstName = firstNameInput;
                    newUser.lastName = lastNameInput;
                    newUser.email = emailInput;
                    newUser.phone = phoneInput;

                    if (profileTypeInput === "student") {
                        newUser.campus = campusInput;
                    }

                    newUser.save(function(err) {
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
    });
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
    var createHash = function(password){
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
    }

module.exports = new user();

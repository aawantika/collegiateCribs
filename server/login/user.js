'use strict';

/**
 * Dependencies
 */
var userModel = require('../models/userModel.js');
var generateUuid = require('../error_checking/generateUuid.js');
var bcrypt = require('../error_checking/bcryptHash.js');
var generalCheck = require('../error_checking/generalCheck.js');
var userCheck = require('../error_checking/userCheck.js');

function user() {}

user.prototype.createUser = function(req, res) {
    // http://localhost:8080/user/create POST

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
            newUser.profileType = body.profileType;
            newUser.username = body.username;
            newUser.password = bcrypt.createHash(body.password);
            newUser.firstName = body.firstName;
            newUser.lastName = body.lastName;
            newUser.email = body.email;

            if (phoneInput === "-1000000000") {
                newUser.phoneNumber = undefined;
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
    // http://localhost:8080/user/retrieve POST

    var body = req.body; //the request will come in with a JSON file full of all the user attributes in the userModel
    generalCheck.checkBody(body) 
        .then(function(result) { //if there's no errors, then run this function that returns result
            return userModel.findOne({ //findOne is a mongoose function
                username: body.username //findOne user where the username is equal to the requester username
            }).exec();
        })
        .then(function(user) { //function returns a user
            console.log(user); //log user in console
            return userCheck.userExists(user); //check if the user actually exists
        })
        .then(function(result) {
            res.status(result.status).send(result.send); //return result status
        })
        .catch(function(error) { //error stuff 
            console.log(error);
            if (error.status == 406 || error.status == 404) {
                res.status(error.status).send(error.send);
            } else {
                res.status(500).send("internal error");
            }
        });
}

user.prototype.updateUser = function(req, res) {
    // http://localhost:8080/student/update POST

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
        .then(function(user) {
            return userCheck.userExists(user);
        })
        .then(function(user) {
            user = user.send;

            user.password = bcrypt.createHash(body.password);
            user.firstName = body.firstName;
            user.lastName = body.lastName;
            user.email = body.email;

            if (phoneInput === "-1000000000") {
                newUser.phoneNumber = undefined;
            }
            if (user.profileType === "student") {
                user.campus = body.campus;
            }

            return user.save();
        })
        .then(function(result) {
            res.sendStatus(200);
        })
        .catch(function(error) {
            console.log(error);
            if (error.status == 406 || error.status == 409 || error.status == 404) {
                res.status(error.status).send(error.send);
            } else {
                res.status(500).send("internal error");
            }
        });
}

user.prototype.deleteUser = function(req, res) {
    // http://localhost:8080/student/update POST

    var body = req.body;
    generalCheck.checkBody(body)
        .then(function(result) {
            return userModel.findOne({
                username: body.username
            }).exec();
        })
        .then(function(user) {
            return userCheck.userExists(user, body.password);
        })
        .then(function(result) {
            return result.send.remove();
        })
        .then(function(result) {
            res.status(200).send("removed user successfully");
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

module.exports = new user();

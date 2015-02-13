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
    if (!generalCheck.checkBody(body)) {

    }


    // promise.resolve(square(2))
    //     .then(square, {
    //         console.log("err");
    //     })
    //     .then(console.log.bind(console));

    res.sendStatus(200);

    // var body = req.body;

    // var bodyCheck = new Promise(function(resolve, reject) {
    //     // do a thing, possibly async, then…

    //     generalCheck.checkBody(body, res);

    //     if (  ) {
    //         resolve("Stuff worked!");
    //     } else {
    //         reject(Error("It broke"));
    //     }
    // });

    // // checkAllInput(body, res, next);
    // // general check
    // // generalCheck.checkBody(body, res);

    // // required fields
    // var profileTypeInput = body.profileType;
    // userCheck.checkProfile(profileTypeInput, res);

    // var usernameInput = body.username;
    // userCheck.checkUsername(usernameInput, res);
    // var passwordInput = body.password;
    // userCheck.checkPassword(passwordInput, res);
    // var firstNameInput = body.firstName;
    // userCheck.checkFirstName(firstNameInput, res);
    // var lastNameInput = body.lastName;
    // userCheck.checkLastName(lastNameInput, res);
    // var emailInput = body.email;
    // userCheck.checkEmail(emailInput, res);

    // // optional fields
    // var phoneInput = body.phoneNumber;
    // if (!phoneInput) {
    //     phoneInput = "0000000000";
    // }
    // userCheck.checkPhoneNumber(phoneInput, res);

    // // student specific field
    // var campusInput = body.campus;
    // if (profileTypeInput === "student") {
    //     userCheck.checkcheckProfile(campusInput, res);
    // }

    // userModel.findOne({
    //     username: body.username
    // }, function(err, usernameFound) {

    //     userCheck.duplicateUsername(usernameFound, res);

    //     userModel.findOne({
    //         email: body.email
    //     }, function(err, emailFound) {
    //         userCheck.duplicateEmail(emailFound, res);

    //         var newUser = new userModel();
    //         newUser.uuid = generateUuid.saveUuid();
    //         newUser.profileType = body.profileType;
    //         newUser.username = body.username;
    //         newUser.password = createHash(body.password);
    //         newUser.firstName = body.firsName;
    //         newUser.lastName = body.lastName;
    //         newUser.email = body.email;
    //         newUser.phoneNumber = body.phoneNumer;

    //         if (newUser.profileType === "student") {
    //             newUser.campus = campusInput;
    //         }

    //         newUser.save(function(err) {
    //             if (err) {
    //                 res.status(500).send('error saving');
    //             } else {
    //                 return res.sendStatus(200);
    //             }
    //         });
    //     });
    // });
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


function checkAllInput(body, res, next) {
    // general check
    generalCheck.checkBody(body, res, next);

    // required fields
    var profileTypeInput = body.profileType;
    userCheck.checkProfile(profileTypeInput, res);
    var usernameInput = body.username;
    userCheck.checkUsername(usernameInput, res);
    var passwordInput = body.password;
    userCheck.checkPassword(passwordInput, res);
    var firstNameInput = body.firstName;
    userCheck.checkFirstName(firstNameInput, res);
    var lastNameInput = body.lastName;
    userCheck.checkLastName(lastNameInput, res);
    var emailInput = body.email;
    userCheck.checkEmail(emailInput, res);

    // optional fields
    var phoneInput = body.phoneNumber;
    if (!phoneInput) {
        phoneInput = "0000000000";
    }
    userCheck.checkPhoneNumber(phoneInput, res);

    // student specific field
    var campusInput = body.campus;
    if (profileTypeInput === "student") {
        userCheck.checkcheckProfile(campusInput, res);
    }

}

var square = function(num) {
    return num * num;
}

var bob = function(num) {
    return num * num * num;
}

user.prototype.check = function(res) {
    generalCheck.checkBody(body, function(newUuid) {
        console.log()
    });
}


module.exports = new user();

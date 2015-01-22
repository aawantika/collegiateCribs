'use strict';

/**
 * Dependencies
 */
var userModel = require('../../models/userModel.js');
var accountModel = require('../../models/accountModel.js');
var generateUuid = require('../../error_checking/generateUuid.js');

function user() {}

user.prototype.createUser = function(req, res, next) {
    // http://localhost:3000/user/create POST

    var uuidInput = generateUuid.saveUuid();

    // general
    var body = req.body;
    var profileTypeInput = body.profileType;
    var firstNameInput = body.firstName;
    var lastNameInput = body.lastName;
    var usernameInput = body.username;
    var passwordInput = body.password;
    var phoneInput = body.phone;
    var emailInput = body.email;

    // student specific
    var campusInput = body.campus;

    userModel.findOne({
        username: usernameInput
    }, function(err, user) {
        if (user) {
            res.status(400).send('duplicate username');
            next();
        } else {
            accountModel.findOne({
                email: emailInput
            }, function(err, account) {
                if (account) {
                    res.status(400).send('duplicate email');
                    next();
                } else {

                    // user creation
                    var newUser = new userModel();
                    newUser.username = usernameInput;
                    newUser.password = passwordInput;
                    newUser.uuid = uuidInput;
                    newUser.profileType = profileTypeInput;

                    newUser.save(function(err) {
                        if (err) {
                            res.status(500).send('error saving');
                        } else {
                            res.status(201).send('saved successfully');
                        }
                    });

                    var newAccount = new accountModel();
                    newAccount.uuid = uuidInput;
                    newAccount.profileType = profileTypeInput;
                    newAccount.firstName = firstNameInput;
                    newAccount.lastName = lastNameInput;
                    newAccount.email = emailInput;
                    newAccount.phone = phoneInput;
                    newAccount.campus = campusInput;

                    newAccount.save(function(err) {
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

user.prototype.retrieveUser = function(req, res, next) {
    // http://localhost:3000/user/retrieve POST

    var body = req.body;
    var usernameInput = body.username;

    userModel.findOne({
        username: usernameInput
    }, function(err, user) {
        if (user) {
            accountModel.findOne({
                uuid: user.uuid
            }, function(err, account) {
                if (account) {
                    var array = new Array();
                    array.push(user);
                    array.push(account);

                    res.status(200).send(array);
                    next();
                } else {
                    res.status(400).send('error');
                    next();
                }
            });
        } else {
            res.status(400).send('error');
            next();
        }
    });
}

user.prototype.updateUser = function(req, res, next) {
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
            next();
        } else {
            accountModel.findOne({
                uuid: user.uuid
            }, function(err, account) {
                if (account) {

                    // save user
                    user.password = passwordInput;
                    user.save(function(err) {
                        if (err) {
                            res.status(500).send('error saving');
                        } else {
                            res.status(201).send('saved successfully');
                        }
                    });

                    // save account
                    account.firstName = firstNameInput;
                    account.lastName = lastNameInput;
                    account.email = emailInput;
                    account.campus = campusInput;

                    account.save(function(err) {
                        if (err) {
                            res.status(500).send('error saving');
                        } else {
                            res.status(201).send('saved successfully');
                        }
                    });
                    next();
                } else {
                    res.status(400).send('error');
                    next();
                }
            });
        }
    });
}

user.prototype.deleteUser = function(req, res, next) {
    // http://localhost:3000/student/update POST
    var body = req.body;

    var usernameInput = body.username;
    var passwordInput = body.password;

    userModel.findOne({
        username: usernameInput
    }, function(err, user) {
        if (!user) {
            res.status(404).send("can't find student");
            next();
        } else if (user.password != passwordInput) {
            res.status(400).send("invalid password");
            next();
        } else if (user.password === passwordInput) {
            accountModel.findOne({
                uuid: user.uuid
            }, function(err, account) {
                if (account) {
                    account.remove();
                    user.remove();

                    res.status(200);
                    next();
                } else {
                    res.status(400).send('error');
                    next();
                }
            });
        }
    });
}

module.exports = new user();

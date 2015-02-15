'use strict';

//

/**
 * Dependencies
 */
var userModel = require('../models/userModel.js');
var generateUuid = require('../error_checking/generateUuid.js');
var bcrypt = require('bcrypt-nodejs');
var promise = require('promise');
var q = require('q');

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
        if (body.profileType === "student") {
            userCheck.checkCampus(campusInput);
        }

        userModel.findOne({
            username: body.username
        }, function(err, usernameFound) {
            console.log("here");
            if (err) {
                console.log(err);
            } else {
                console.log("here1");
                userCheck.duplicateUsername(usernameFound, function(err, noerr) {
                    if (err) {
                        console.log("error");
                        res.status(409).send("username");
                    } else {
                        console.log("here2");
                        userModel.findOne({
                            email: body.email
                        }, function(err, emailFound) {
                            if (err) {
                                console.log("error2");
                            } else {
                                console.log("here3");
                                console.log(emailFound);
                                userCheck.duplicateEmail(emailFound, function(err, noerr) {
                                    if (err) {
                                        console.log("error3");
                                        res.status(409).send("email");
                                    } else {
                                        console.log("here4");
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

                                        newUser.save();
                                        res.sendStatus(200);
                                        // try {
                                        //     newUser.save(function(err) {
                                        //         if (err) {
                                        //             throw {
                                        //                 code: 500,
                                        //                 status: "error saving"
                                        //             };
                                        //         } else {
                                        //             console.log(newUser);
                                        //             return res.sendStatus(200);
                                        //         }
                                        //     });
                                        // } catch (err) {
                                        //     console.log(err);
                                        // }
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    } catch (err) {
        console.log(err);
        res.status(err.code).send(err.status);
    }



    // validateGame(db, game, function(err, result) {
    //     if (err) {
    //         return handleError(err);
    //     }
    //     return actualCreate(db, game)
    // });

    // validateGame(rc, game)
    //     .then(function(result) {
    //         return actualCreate(rc, game);
    //     }, function(error) {
    //         return handleError(err);
    //     });

    // userModel.findOne({
    //     username: body.username
    // }, function(err, usernameFound) {
    //     userCheck.duplicateUsername(usernameFound, function(err, noerr) {
    //         console.log(err);
    //         console.log(noerr);
    //         if (err) {
    //             console.log(err);
    //             console.log("error");
    //             return;
    //         } else if (noerr) {
    //             console.log("NOERR:" + noerr + ":NOERR");
    //             console.log("noerror");
    //             return;
    //         }
    //     })
    // });

    // var usernameFound = null;
    // userCheck.duplicateUsername(usernameFound, function(err, noerr) {
    //     console.log("err: " + err);
    //     console.log("noerr: " + noerr);
    // });


    // var promise = userModel.findOne({
    //     username: body.username
    // }).exec();

    // promise.then(function(usernameFound) {
    //     console.log("usernameFound");
    //     console.log(usernameFound);
    //     return userCheck.duplicateUsername(usernameFound);
    // }).then(function(err) {
    //         console.log(err);
    //         console.log("error");
    //         res.sendStatus(409);
    //         return;
    //     }, function() {
    //         console.log("NOERR:" + noerr + ":NOERR");
    //         console.log("noerror");
    //         res.sendStatus(200);
    //         return;
    //     });

    // res.sendStatus(200);


    // .then(function(err) {
    //     console.log("error");
    //     res.status(409).send("username");
    // }).then(function(err) {
    //     console.log(err);
    //     console.log("error retrieving from db2");
    // }).then(function(emailFound) {
    //     console.log("error2");
    //     res.status(409).send("email");
    // });

    // res.sendStatus(200);
    // promise.then(function(usernameFound) {
    //         return userCheck.duplicateUsername(usernameFound);
    //     }).then(function(usernameReturn) {
    //         console.log("Here");
    //         console.log(usernameReturn);
    //         return res.sendStatus(200);
    //         // return userModel.findOne({
    //         //     email: body.email
    //         // }).exec();
    //     }).
    //     // .then(function(emailFound) {
    //     //     userCheck.duplicateEmail(emailFound, res);

    // //     var newUser = new userModel();
    // //     newUser.uuid = generateUuid.saveUuid();
    // //     newUser.profileType = body.profileType;
    // //     newUser.username = body.username;
    // //     newUser.password = createHash(body.password);
    // //     newUser.firstName = body.firsName;
    // //     newUser.lastName = body.lastName;
    // //     newUser.email = body.email;
    // //     newUser.phoneNumber = phoneInput;

    // //     if (newUser.profileType === "student") {
    // //         newUser.campus = campusInput;
    // //     }

    // //     console.log(newUser);
    // //     return newUser.save();

    // //     // newUser.save(function(err) {
    // //     //     if (err) {
    // //     //         throw {
    // //     //             code: 500,
    // //     //             status: "error saving"
    // //     //         };
    // //     //     } else {
    // //     //         console.log(newUser);
    // //     //         return res.sendStatus(200);
    // //     //     }
    // //     // });
    // // }).
    // then(console.log, console.error);

    // var promise1 = userModel.findOne({
    //         username: body.username
    //     }).exec();
    // var promise2 = userModel.findOne({
    //         email: body.email
    //     }).exec();

    // promise1
    //     .then(function(userFound) {
    //         console.log(usernameFound);
    //         userCheck.duplicateUsername(usernameFound, res);
    //     })
    //     .then(function(emailFound) {
    //         console.log(emailFound);
    //         userCheck.duplicateEmail(emailFound, res);
    //         return;
    //     })
    //     .then(null, console.err);


    // userModel.findOne({
    //     username: body.username
    // }, function(err, usernameFound) {
    //     if (err) handleError(err);
    //     else {
    //         console.log(usernameFound);
    //         userCheck.duplicateUsername(usernameFound, res);

    //         userModel.findOne({
    //             email: body.emailFound
    //         }, function(err, emailFound) {
    //             if (err) handleError(err);
    //             else {
    //                 console.log(emailFound);
    //                 userCheck.duplicateEmail(emailFound, res);

    //                 var newUser = new userModel();
    //                 newUser.uuid = generateUuid.saveUuid();
    //                 newUser.profileType = body.profileType;
    //                 newUser.username = body.username;
    //                 newUser.password = createHash(body.password);
    //                 newUser.firstName = body.firsName;
    //                 newUser.lastName = body.lastName;
    //                 newUser.email = body.email;
    //                 newUser.phoneNumber = phoneInput;

    //                 if (newUser.profileType === "student") {
    //                     newUser.campus = campusInput;
    //                 }

    //                 try {
    //                     newUser.save(function(err) {
    //                         if (err) {
    //                             throw {
    //                                 code: 500,
    //                                 status: "error saving"
    //                             };
    //                         } else {
    //                             console.log(newUser);
    //                             return res.sendStatus(200);
    //                         }
    //                     });
    //                 } catch (err) {
    //                     console.log(err);
    //                 }
    //             }
    //         });
    //     }
    // });

    // getUserProfile(friends[0], function(err, json) {
    //                         if (err) handleError(err);
    //                         else {
    //                             try {
    //                                 var bestFriend = JSON.parse(json);
    //                                 refreshUi(bestFriend);
    //                             } catch (Exception e) {
    //                                 handleError(e.message);
    //                             }
    //                         }
    //                     });

    //     userModel.findOne({
    //         username: body.username
    //     }, function(err, data) {});


    // promise.then(function(usernameFound) {
    //     userCheck.duplicateUsername(usernameFound, res);
    // })
    // .then(
    // .then(function(emailFound) {
    //     console.log(emailFound);
    // })
    // .then(null, console.error);


    // userCheck.duplicateUsername(usernameFound, res);

    // userModel.findOne({
    //         username: body.username
    //     }, function(err, data) {
    //         console.log(body.username);
    //         if (err) return console.error(err)
    //         console.log(data)
    //     })
    // If our readFile
    // function returned a promise we would write the same logic as:


    // var promise = .exec();
    // promise.then(function(err, data) {
    //     console.log(err);
    //     console.log(data);
    // });
    // .then(userCheck.duplicateUsername(usernameFound, res));

    // res.sendStatus(200);
    // userModel.findOne({
    //     username: body.username
    // }, function(err, usernameFound) {

    //     try {
    //         userCheck.duplicateUsername(usernameFound, res);

    //         userModel.findOne({
    //             email: body.email
    //         }, function(err, emailFound) {
    //             userCheck.duplicateEmail(emailFound);

    //             var newUser = new userModel();
    //             newUser.uuid = generateUuid.saveUuid();
    //             newUser.profileType = body.profileType;
    //             newUser.username = body.username;
    //             newUser.password = createHash(body.password);
    //             newUser.firstName = body.firsName;
    //             newUser.lastName = body.lastName;
    //             newUser.email = body.email;
    //             newUser.phoneNumber = phoneInput;

    //             if (newUser.profileType === "student") {
    //                 newUser.campus = campusInput;
    //             }

    //             newUser.save(function(err) {
    //                 if (err) {
    //                     throw {
    //                         code: 500,
    //                         status: "error saving"
    //                     };
    //                 } else {
    //                     console.log(newUser);
    //                     return res.sendStatus(200);
    //                 }
    //             });
    //         });
    //     } catch (err) {
    //         console.log(err);
    //         res.status(err.code).send(err.status);
    //     }
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


module.exports = new user();

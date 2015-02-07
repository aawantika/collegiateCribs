'use strict';

/**
 * Dependencies
 */
var sessionModel = require('../models/sessionModel.js');
var userModel = require('../models/userModel.js');
var uuid = require('node-uuid');
var bcrypt = require('bcrypt-nodejs');

function session() {}

session.prototype.login = function(req, res) {
    // http://localhost:3000/user/create POST

    var uuidInput = "session" + uuid.v4();

    // general
    var body = req.body;
    var usernameInput = body.username;
    var passwordInput = body.password;

    userModel.findOne({
        username: usernameInput

    }, function(err, user) {
        if (!user) {
            console.log("user error");
            res.status(400).send('Bad Request');
        } else {
            bcrypt.compareSync(passwordInput, user.password, function(err) {
                if (err) {
                    res.status(404).send("no");
                }
            });
            sessionModel.findOne({
                username: usernameInput
            }, function(err, session) {
                if (session) {
                    res.status(401).send('already in session');
                } else {
                    var newSession = new sessionModel();
                    newSession.sessionKey = uuidInput;
                    newSession.username = usernameInput;
                    newSession.save(function(err) {
                        if (err) {
                            console.log(" error");
                            res.status(500).send('error saving');
                        } else {
                            return res.status(200).send({
                                username: usernameInput,
                                sessionKey: uuidInput
                            });
                        }
                    });
                }
            });

        }
    });
}

session.prototype.logout = function(req, res) {
    // http://localhost:3000/user/retrieve POST

    var body = req.body;
    var usernameInput = body.username;
    var sessionInput = body.sessionKey;

    sessionModel.findOne({
        username: usernameInput,
        sessionKey: sessionInput
    }, function(err, session) {
        if (session) {
            session.remove();
            res.status(200).send("done");
        } else {
            res.status(400).send('error with session logout');
        }
    });
}

session.prototype.isLoggedIn = function(req, res) {

    console.log('HERE');
    console.log(body);
    console.log('HERE');
    var body = req.body;
    var usernameInput = body.username;
    var sessionKeyInput = body.sessionKey;


    sessionModel.findOne({
        sessionKey: sessionKeyInput,
        username: usernameInput
    }, function(err, session) {
        if (!session) {
            res.status(400).send('error with session isloggedin');
        } else {
            res.status(200).send('user isloggedin');
        }
    });
}

// Generates hash using bCrypt
var createHash = function(passwordNew, passwordOld) {
    bcrypt.compare(passwordNew, passwordOld, function(err, res) {
        if (err) {
            return false;
        }
        return true
    });
}

module.exports = new session();

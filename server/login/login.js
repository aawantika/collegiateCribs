'use strict';

/**
 * Dependencies
 */
var userModel = require('../models/userModel.js');
var generalCheck = require('../error_checking/generalCheck.js');
var userCheck = require('../error_checking/userCheck.js');
var sessionModel = require('../models/sessionModel.js');
var bcrypt = require('../error_checking/bcryptHash.js');
var uuid = require('node-uuid');

function session() {}

session.prototype.login = function(req, res) {
    // http://localhost:8080/login POST
    
    var body = req.body,
        newSession;

    generalCheck.checkBody(body)
        .then(function(result) {
            return userCheck.checkUsername(body.username);
        })
        .then(function(result) {
            return userCheck.checkPassword(body.password);
        })
        .then(function(result) {
            return userModel.findOne({
                username: body.username,
            }).exec();
        })
        .then(function(user) {
            return userCheck.userExists(user, body.password);
        })
        .then(function(result) {
            return sessionModel.findOne({
                username: body.username
            }).exec();
        })
        .then(function(session) {
            return userCheck.sessionExistsLogin(session);
        })
        .then(function(result) {
            newSession = new sessionModel();
            newSession.sessionKey = "session" + uuid.v4();
            newSession.username = body.username;
            return newSession.save();
        })
        .then(function(result) {
            newSession = newSession.toObject();
            delete newSession._id;
            res.status(200).send(newSession);
        })
        .catch(function(error) {
            console.log(error);

            if (error.status == 404 || error.status == 400) {
                res.status(error.status).send(error.send);
            } else {
                res.status(500).send("internal error");
            }
        });
}

session.prototype.logout = function(req, res) {
    // http://localhost:8080/logout POST

    var body = req.body;

    generalCheck.checkBody(body)
        .then(function(result) {
            return userCheck.checkUsername(body.username);
        })
        .then(function(result) {
            return userCheck.checkSessionKey(body.sessionKey);
        })
        .then(function(result) {
            return sessionModel.findOne({
                username: body.username,
                sessionKey: body.sessionKey
            }).exec();
        })
        .then(function(session) {
            return userCheck.sessionExists(session);
        })
        .then(function(result) {
            return result.send.remove();
        })
        .then(function(result) {
            return res.status(200).send("logout successful");
        })
        .catch(function(error) {
            console.log(error);

            if (error.status == 404 || error.status == 406) {
                res.status(error.status).send(error.send);
            } else {
                res.status(500).send("internal error");
            }
        });
}

session.prototype.isLoggedIn = function(req, res) {
    // http://localhost:8080/isLoggedIn POST

    var body = req.body;
    generalCheck.checkBody(body)
        .then(function(result) {
            return userCheck.checkUsername(body.username);
        })
        .then(function(result) {
            return userCheck.checkSessionKey(body.sessionKey);
        })
        .then(function(result) {
            return sessionModel.findOne({
                username: body.username,
                sessionKey: body.sessionKey
            }).exec();
        })
        .then(function(session) {
            return userCheck.sessionExists(session);
        })
        .then(function(result) {
            result.send = result.send.toObject();
            delete result.send._id;
            delete result.send.__v;

            return res.status(result.status).send(result.send);
        })
        .catch(function(error) {
            console.log(error);

            if (error.status == 404 || error.status == 406) {
                res.status(error.status).send(error.send);
            } else {
                res.status(500).send("internal error");
            }
        });
}


module.exports = new session();

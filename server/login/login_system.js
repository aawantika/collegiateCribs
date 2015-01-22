'use strict';

/**
 * Dependencies
 */
var mongoose = require('mongoose');
var express = require('express');
var passport = require('passport');
var expressSession = require('express-session');
var bodyParser = require('body-parser');
var app = express();

/**
 * Let's us use the body part of the json.
 */
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

/**
 * Passport stuff.
 */
app.use(expressSession({
    secret: 'mySecretKey'
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});


/**
 * Connect to database
 */
var mongodb = require('../config/db.js');
var db = mongoose.connect(mongodb.db, function(err) {
    if (err) {
        console.log("issues connecting" + err);
        throw err;
    } else {
        console.log("db connected");
    }
});
exports.db = db;

/**
 * Controllers
 */
var user = require('./controllers/user.js');

app.post('/user/create', function(req, res, next) {
    user.createUser(req, res, next);
});

app.post('/user/retrieve', function(req, res, next) {
    user.retrieveUser(req, res, next);
});

app.post('/user/update', function(req, res, next) {
    user.updateUser(req, res, next);
});

app.post('/user/delete', function(req, res, next) {
    user.deleteUser(req, res, next);
});

app.listen(3000);
console.log('Listening on port 3000');

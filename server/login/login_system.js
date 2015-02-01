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
var user = require('./user.js');

app.post('/user/create', function(req, res) {
    user.createUser(req, res);
});

app.post('/user/retrieve', function(req, res) {
    user.retrieveUser(req, res);
});

app.post('/user/update', function(req, res) {
    user.updateUser(req, res);
});

app.post('/user/delete', function(req, res) {
    user.deleteUser(req, res);
});

app.listen(3000);
console.log('Listening on port 3000');

'use strict';

/**
 * Dependencies
 */
var mongoose = require('mongoose');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
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
var student = require('./controllers/student');
var landlords = require('./controllers/landlord');

app.post('/student/create', function(req, res, next) {
	student.createStudent(req, res, next);
});

app.post('/student/retrieve', function(req, res, next) {
	student.retrieveStudent(req, res, next);
});

app.post('/student/update', function(req, res, next) {
	student.updateStudent(req, res, next);
});

app.post('/student/delete', function(req, res, next) {
	student.deleteStudent(req, res, next);
});

app.listen(3000);
console.log('Listening on port 3000');


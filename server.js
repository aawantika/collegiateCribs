/**
 * Dependencies
 */
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');

/**
 * connect to database using mongoose
 */
var dbConfig = require('./server/config/db');
var mongoose = require('mongoose');
mongoose.connect(dbConfig.url);

/**
 * passport setup
 */
require('./server/login/passport')(passport);

/**
 * express setup
 */
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(session({
    secret: "cookie_secret",
    proxy: true,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize()); // Add passport initialization
app.use(passport.session()); // Add passport initialization


/**
 * backend routing
 */
var routes = require('./routing')();
app.use('/', routes);

module.exports = app;

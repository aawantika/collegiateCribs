var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var dbConfig = require('./server/config/db');
var mongoose = require('mongoose');
// Connect to DB
mongoose.connect(dbConfig.url);

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// Configuring Passport
var passport = require('passport');
var expressSession = require('express-session');
// TODO - Why Do we need this key ?
app.use(expressSession({
        secret: 'mySecretKey',
        resave: false,
        saveUninitialized: false
    }));
app.use(passport.initialize());
app.use(passport.session());

// Initialize Passport
var initPassport = require('./server/passport/init');
initPassport(passport);

// var routes = require('./routes/index')(passport);
var routes = require('./routes/index')(passport);
app.use('/', routes);

module.exports = app;

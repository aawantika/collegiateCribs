/**
 * Dependencies
 */
var express = require('express');
var router = express();
router.use(express.static(__dirname + '/client'));

/**
 * User Models
 */
var user = require('./server/login/user.js');
var session = require('./server/login/login.js');
var property = require('./server/property/property.js');


module.exports = function() {

    /**
     * Loads to index.html
     */
    router.get(/^(.+)$/, function(req, res) {
        res.sendFile(__dirname + req.params[0]);
    });

    /**
     * login, logout, isLoggedIn
     */
    router.post('/login', function(req, res) {
        session.login(req, res);
    });

    router.post('/logout', function(req, res) {
        session.logout(req, res);
    });

    router.post('/isLoggedIn', function(req, res) {
        session.isLoggedIn(req, res);
    });

    /**
     * user routing
     */
    router.post('/user/create', function(req, res) {
        user.createUser(req, res);
    });

    router.post('/user/retrieve', function(req, res) {
        user.retrieveUser(req, res);
    });

    router.post('/user/update', function(req, res) {
        user.updateUser(req, res);
    });

    router.post('/user/delete', function(req, res) {
        user.deleteUser(req, res);
    });

    /**
     * property routing
     */
    router.post('/property/create', function(req, res) {
        property.createProperty(req, res);
    });

    router.post('/property/retrieve', function(req, res) {
        property.retrieveProperty(req, res);
    });

    router.post('/property/retrieve/username', function(req, res) {
        property.retrieveAllPropertyByUsername(req, res);
    });


    router.post('/property/update', function(req, res) {
        property.updateProperty(req, res);
    });

    router.post('/property/delete', function(req, res) {
        property.deleteProperty(req, res);
    });

    /**
     * rating/review routing
     */

    return router;
}

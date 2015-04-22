/**
 * Dependencies
 */
var express = require('express');
var router = express();
router.use(express.static(__dirname + '/client'));
var passport = require('passport');


/**
 * User Models
 */
var user = require('./server/login/user.js');
var property = require('./server/property/property.js');
var search = require('./server/search/search.js');
var propertyRating = require('./server/rating/propertyRating.js');

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
    router.post('/loggedin', function(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    });

    router.post('/login', passport.authenticate('local'), function(req, res) {
        res.send(req.user);
    });

    router.post('/logout', function(req, res) {
        req.logOut();
        res.sendStatus(200);
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

    router.post('/user/favorites', function(req, res) {
        user.getFavoriteProperties(req, res);
    });

    router.post('/user/favorites/add', function(req, res) {
        user.addFavoriteProperty(req, res);
    });

    router.post('/user/favorites/delete', function(req, res) {
        user.deleteFavoriteProperty(req, res);
    });

    router.post('/user/favorites/check', function(req, res) {
        user.isFavorited(req, res);
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
    router.post('/property/rating/create', function(req, res) {
        propertyRating.createRating(req, res);
    });

    router.post('/property/rating/retrieve', function(req, res) {
        propertyRating.retrieveRating(req, res);
    });

    router.post('/property/review/retrieve', function(req, res) {
        propertyRating.retrieveReviews(req, res);
    });

    router.post('/property/rating/update', function(req, res) {
        propertyRating.updateRating(req, res);
    });

    router.post('/property/review/update', function(req, res) {
        propertyRating.updateReview(req, res);
    });

    router.post('/property/rating/delete', function(req, res) {
        propertyRating.deleteRating(req, res);
    });

    router.post('/property/review/delete', function(req, res) {
        propertyRating.deleteReview(req, res);
    });


    /**
     * search routing
     */

    router.post('/search/landlord', function(req, res) {
        search.searchLandlord(req, res);
    });

    router.post('/search/property', function(req, res) {
        search.searchProperty(req, res);
    });

    router.post('/search', function(req, res) {
        search.getAvailableProperties(req, res);
    });

    router.post('/search/keyword', function(req, res) {
        search.searchByKeyword(req, res);
    });

    return router;
}

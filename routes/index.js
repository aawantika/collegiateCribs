var express = require('express');
var router = express.Router();

var user = require('../server/login/user.js');


var isAuthenticated = function(req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler 
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated()) {
        console.log("loggedin");
        return next();
    }
    // if the user is not authenticated then redirect him to the login page
    console.log("loggedout");
    res.redirect('/');
}

module.exports = function(passport) {

    router.post('/user/create', function(req, res) {
        console.log(req.body);
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

    /* Handle Login POST */
    /* Handle Login POST */
    // router.post('/login', passport.authenticate('login', {
    //     successRedirect: '/home',
    //     failureRedirect: '/',
    //     failureFlash: true
    // }));

    // passport.authenticate('local', function(err, account) {
    //     req.logIn(account, function() {
    //         res.status(err ? 500 : 200).send(err ? err : account);
    //     });
    // })(this.req, this.res, this.next);

    // // 	/* GET login page. */
    // // 	router.get('/', function(req, res) {
    // //     	// Display the Login page with any flash message, if any
    // // 		res.render('index', { message: req.flash('message') });
    // // 	});

    // // 	/* Handle Login POST */
    // // 	router.post('/login', passport.authenticate('login', {
    // // 		successRedirect: '/home',
    // // 		failureRedirect: '/',
    // // 		failureFlash : true  
    // // 	}));

    // // 	/* GET Registration Page */
    // // 	router.get('/signup', function(req, res){
    // // 		res.render('register',{message: req.flash('message')});
    // // 	});

    // // 	/* Handle Registration POST */
    // // 	router.post('/signup', passport.authenticate('signup', {
    // // 		successRedirect: '/home',
    // // 		failureRedirect: '/signup',
    // // 		failureFlash : true  
    // // 	}));

    /* GET Home Page */
    router.get('/home', isAuthenticated, function(req, res) {
        res.render('home', {
            user: req.user
        });
    });

    // // 	/* Handle Logout */
    // // 	router.get('/signout', function(req, res) {
    // // 		req.logout();
    // // 		res.redirect('/');
    // // 	});

    return router;
}

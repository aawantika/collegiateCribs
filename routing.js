var express = require('express');
var router = express();

router.use(express.static(__dirname + '/client'));

var user = require('./server/login/user.js');
var property = require('./server/property/property.js');



var isAuthenticated = function(req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler 
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated()) {
        console.log("loggedin");
        return next();
    }
    // if the user is not authenticated then redirect him to the login page
    // console.log("loggedout");
    // res.redirect('/');
}

module.exports = function(passport) {

    // loads to index.html
    router.get(/^(.+)$/, function(req, res) {
        res.sendFile(__dirname + req.params[0]);
    });

    //LOGIN/LOGOUT
    router.post('/login', function(req, res, next) {
        passport.authenticate('login', function(err, user, info) {
            if (err) {
                console.log("err");
                return next(err);
            }
            if (!user) {
                console.log("account");
                return res.status(400).send("no account");
            }
            req.logIn(user, function(err) {
                if (err) {
                    console.log("err2");
                    return next(err);
                }
                console.log("found");
                return res.status(200).send("found");
            });
        })(req, res, next);
    });

    // USER
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

    // PROPERTY
    router.post('/property/create', function(req, res) {
        console.log(req.body);
        property.createProperty(req, res);
    });

    router.post('/property/retrieve', function(req, res) {
        property.retrieveProperty(req, res);
    });

    router.post('/property/update', function(req, res) {
        property.updateProperty(req, res);
    });

    router.post('/property/delete', function(req, res) {
        property.deleteProperty(req, res);
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

    // //   /* GET login page. */
    // //   router.get('/', function(req, res) {
    // //       // Display the Login page with any flash message, if any
    // //       res.render('index', { message: req.flash('message') });
    // //   });

    // //   /* Handle Login POST */
    // //   router.post('/login', passport.authenticate('login', {
    // //       successRedirect: '/home',
    // //       failureRedirect: '/',
    // //       failureFlash : true  
    // //   }));

    // //   /* GET Registration Page */
    // //   router.get('/signup', function(req, res){
    // //       res.render('register',{message: req.flash('message')});
    // //   });

    // //   /* Handle Registration POST */
    // //   router.post('/signup', passport.authenticate('signup', {
    // //       successRedirect: '/home',
    // //       failureRedirect: '/signup',
    // //       failureFlash : true  
    // //   }));


    // //   /* Handle Logout */
    // //   router.get('/signout', function(req, res) {
    // //       req.logout();
    // //       res.redirect('/');
    // //   });

    return router;
}

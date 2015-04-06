var LocalStrategy = require('passport-local').Strategy;

var userModel = require('../models/userModel.js');
var userCheck = require('../error_checking/userCheck.js');

module.exports = function(passport) {
    passport.use(new LocalStrategy(
        function(username, password, done) {
            userCheck.checkUsername(username)
                .then(function(result) {
                    return userCheck.checkPassword(password);
                })
                .then(function(result) {
                    return userModel.findOne({
                        username: username,
                    }).exec();
                })
                .then(function(user) {
                    return userCheck.userExists(user, password);
                })
                .then(function(result) {
                    return done(null, result.send.username);
                })
                .catch(function(error) {
                    console.log(error);

                    if (error.status == 404 || error.status == 400) {
                        return done(null, false, error);
                    } else {
                        return done(null, false, {
                            status: 500,
                            send: "internal error"
                        });
                    }
                });
        }
    ));

    // Serialized and deserialized methods when got from session
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
}


var LocalStrategy = require('passport-local').Strategy;




// module.exports = function(passport) {


//     passport.use(new LocalStrategy(
//         function(username, password, done) {
//             console.log("localstrategy attempt");
//             console.log("username: " + username);
//             console.log("password: " + password);
//             if (username === "admin" && password === "admin") // stupid example
//                 return done(null, {
//                 name: "admin"
//             });

//             return done(null, false, {
//                 message: 'Incorrect username.'
//             });
//         }
//     ));

//     // Serialized and deserialized methods when got from session
//     passport.serializeUser(function(user, done) {
//         done(null, user);
//     });

//     passport.deserializeUser(function(user, done) {
//         done(null, user);
//     });
// }

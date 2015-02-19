'use strict';

var Promise = require('bluebird');

function userCheck() {}

/**
 * Invalid Input Error Checking
 */
userCheck.prototype.checkProfile = function(profileType) {
    return new Promise(function(resolve, reject) {
        var profileTypes = ["student", "landlord"];
        if (!profileType || profileTypes.indexOf(profileType) === -1) {
            reject({
                status: 406,
                send: "profileType"
            });
        } else {
            resolve();
        }
    });
}

userCheck.prototype.checkUsername = function(username) {
    return new Promise(function(resolve, reject) {
        var usernameRegex = /^[a-zA-Z0-9]+$/i;
        if (!username || username.length < 4 || username.length > 16 || !usernameRegex.test(username)) {
            reject({
                status: 406,
                send: "username"
            });
        } else {
            resolve();
        }
    });
}

userCheck.prototype.checkPassword = function(password) {
    return new Promise(function(resolve, reject) {
        var passwordRegex = /^[a-zA-Z0-9]+$/i;
        if (!password || password.length < 6 || password.length > 20 || !passwordRegex.test(password)) {
            reject({
                status: 406,
                send: "password"
            });
        } else {
            resolve();
        }
    });
}

userCheck.prototype.checkFirstName = function(firstName) {
    return new Promise(function(resolve, reject) {
        var firstNameRegex = /^[a-zA-Z]+$/i;
        if (!firstName || firstName.length < 1 || firstName.length > 20 || !firstNameRegex.test(firstName)) {
            reject({
                status: 406,
                send: "firstName"
            });
        } else {
            resolve();
        }
    });
}

userCheck.prototype.checkLastName = function(lastName) {
    return new Promise(function(resolve, reject) {
        var lastNameRegex = /^[a-zA-Z]+$/i;
        if (!lastName || lastName.length < 1 || lastName.length > 20 || !lastNameRegex.test(lastName)) {
            reject({
                status: 406,
                send: "lastName"
            });
        } else {
            resolve();
        }
    });
}

userCheck.prototype.checkEmail = function(email) {
    return new Promise(function(resolve, reject) {
        var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!email || email.length < 6 || email.length > 20 || !emailRegex.test(email)) {
            reject({
                status: 406,
                send: "email"
            });
        } else {
            resolve();
        }
    });
}

userCheck.prototype.checkPhoneNumber = function(phoneNumber) {
    return new Promise(function(resolve, reject) {
        phoneNumber = phoneNumber.replace(/\D/g, '');
        if (phoneNumber.length < 10 || phoneNumber.length > 11) {
            reject({
                status: 406,
                send: "phoneNumber"
            });
        } else {
            resolve();
        }
    });
}

userCheck.prototype.checkCampus = function(campus, profileType) {
    return new Promise(function(resolve, reject) {
        var campusTypes = ["gsu", "gt"];
        if (profileType === "student" && (!campus || campusTypes.indexOf(campus) === -1)) {
            reject({
                status: 406,
                send: "campus"
            });
        } else {
            resolve();
        }
    });
}

/**
 * Duplicate Error Checking
 */
userCheck.prototype.duplicateUsername = function(username) {
    return new Promise(function(resolve, reject) {
        if (username) {
            reject({
                status: 409,
                send: "duplicate username"
            });
        } else {
            resolve();
        }
    });
}

userCheck.prototype.duplicateEmail = function(email) {
    return new Promise(function(resolve, reject) {
        if (email) {
            reject({
                status: 409,
                send: "duplicate email"
            });
        } else {
            resolve();
        }
    });
}

/**
 * Duplicate Error Checking
 */
userCheck.prototype.userExists = function(user) {
    return new Promise(function(resolve, reject) {
        if (user) {
            resolve({
                status: 200,
                send: user
            });
        } else {
            reject({
                status: 404,
                send: "username not found"
            });
        }
    });
}

module.exports = new userCheck();

'use strict';

function userCheck() {}

/**
 * Invalid Input Error Checking
 */
userCheck.prototype.checkProfile = function(profileType) {
    var profileTypes = ["student", "landlord"];
    if (!profileType || profileTypes.indexOf(profileType) === -1) {
        throw {
            code: 406,
            status: "profileType"
        };
    }
}

userCheck.prototype.checkUsername = function(username) {
    var usernameRegex = /^[a-zA-Z0-9]+$/i;
    if (!username || username.length < 4 || username.length > 16 || !usernameRegex.test(username)) {
        throw {
            code: 406,
            status: "username"
        };
    }
}

userCheck.prototype.checkPassword = function(password) {
    var passwordRegex = /^[a-zA-Z0-9]+$/i;
    if (!password || password.length < 6 || password.length > 20 || !passwordRegex.test(password)) {
        throw {
            code: 406,
            status: "password"
        };
    }
}

userCheck.prototype.checkFirstName = function(firstName) {
    var firstNameRegex = /^[a-zA-Z]+$/i;
    if (!firstName || firstName.length < 1 || firstName.length > 20 || !firstNameRegex.test(firstName)) {
        throw {
            code: 406,
            status: "firstName"
        };
    }
}

userCheck.prototype.checkLastName = function(lastName) {
    var lastNameRegex = /^[a-zA-Z]+$/i;
    if (!lastName || lastName.length < 1 || lastName.length > 20 || !lastNameRegex.test(lastName)) {
        throw {
            code: 406,
            status: "lastName"
        };
    }
}

userCheck.prototype.checkEmail = function(email) {
    var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email || email.length < 6 || email.length > 20 || !emailRegex.test(email)) {
        throw {
            code: 406,
            status: "email"
        };
    }
}

userCheck.prototype.checkPhoneNumber = function(phoneNumber) {
    phoneNumber = phoneNumber.replace(/\D/g, '');
    if (phoneNumber.length < 10 || phoneNumber.length > 11) {
        throw {
            code: 406,
            status: "phoneNumber"
        };
    }
}

userCheck.prototype.checkCampus = function(campus, res) {
    var campusTypes = ["gsu", "gt"];
    if (!campus || campusTypes.indexOf(campusTypes) === -1) {
        throw {
            code: 406,
            status: "campus"
        };
    }
}

/**
 * Duplicate Error Checking
 */
userCheck.prototype.duplicateUsername = function(usernameFound, res) {
    if (usernameFound) {
        console.log("createUser: username aready in database");
        throw {
            code: 409,
            status: "username"
        };
    }
}

userCheck.prototype.duplicateEmail = function(emailFound, res) {
    if (emailFound) {
        console.log("createUser: email aready in database");
        throw {
            code: 409,
            status: "email"
        };
    }
}



module.exports = new userCheck();

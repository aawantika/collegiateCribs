'use strict';

function userCheck() {}

/**
 * Invalid Input Error Checking
 */
userCheck.prototype.checkProfile = function(profileType, res) {
    var profileTypes = ["student", "landlord"];
    if (!profileType || profileTypes.indexOf(profileType) === -1 ) {
        res.status(406).send("profileType");
    }
}

userCheck.prototype.checkUsername = function(username, res) {
    var usernameRegex = /^[a-zA-Z0-9]+$/i;
    if (!username || username.length < 4 || username.length > 16 || !usernameRegex.test(username)) {
        res.status(406).send("username");
    }
}

userCheck.prototype.checkPassword = function(password, res) {
    var passwordRegex = /^[a-zA-Z0-9]+$/i;
    if (!password || password.length < 6 || password.length > 20 || !passwordRegex.test(password)) {
        res.status(406).send("password");
    }
}

userCheck.prototype.checkFirstName = function(firstName, res) {
    var firstNameRegex = /^[a-zA-Z]+$/i;
    if (!firstName || firstName.length < 1 || firstName.length > 20 || !firstNameRegex.test(firstName)) {
        res.status(406).send("firstName");
    }
}

userCheck.prototype.checkLastName = function(lastName, res) {
    var lastNameRegex = /^[a-zA-Z]+$/i;
    if (!lastName || lastName.length < 1 || lastName.length > 20 || !lastNameRegex.test(lastName)) {
        res.status(406).send("lastName");
    }
}

userCheck.prototype.checkEmail = function(email, res) {
    var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email || email.length < 6 || email.length > 20 || !emailRegex.test(email)) {
        res.status(406).send("email");
    }
}

userCheck.prototype.checkPhoneNumber = function(phoneNumber, res) {
    phoneNumber = phoneNumber.replace(/\D/g, ''); 
   if (phoneNumber.length < 10 || phoneNumber.length > 11) {
        res.status(406).send("phoneNumber");
    }
}

userCheck.prototype.checkCampus = function(campus, res) {
    var campusTypes = ["gsu", "gt"];
    if (!campus || campusTypes.indexOf(campusTypes) === -1) {
        res.status(406).send("campus");
    }
}

/**
 * Duplicate Error Checking
 */
userCheck.prototype.duplicateUsername = function(usernameFound, res) {
    if (usernameFound) {
        console.log("createUser: username aready in database");
        res.status(409).send("username");
    }
}

userCheck.prototype.duplicateEmail = function(emailFound, res) {
    if (emailFound) {
        console.log("createUser: email aready in database");
        res.status(409).send("email");
    }
}



module.exports = new userCheck();

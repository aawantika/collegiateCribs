'use strict';

function userCheck() {}

userCheck.prototype.checkUsername = function(username, res) {
    var usernameRegex = /^[a-zA-Z0-9]+$/i;
    if (!username || username.length < 4 || username.length > 16 || !usernameRegex.test(username)) {
        res.status(406).send("err - username");
    }
}

userCheck.prototype.checkProfile = function(profileType, res) {
    var profileTypes = ["student", "landlord"];
    if (!profileType || profileTypes.indexOf(profileType) === -1) {
        res.status(406).send("err - profileType");
    }
}

userCheck.prototype.checkPassword = function(password, res) {
    var passwordRegex = /^[a-zA-Z0-9]+$/i;
    if (!password || password.length < 6 || password.length > 20 || !passwordRegex.test(password)) {
        res.status(406).send("err - profileType");
    }
}

userCheck.prototype.checkFirstName = function(fistName, res) {
    var passwordRegex = /^[a-z ,.'-]{1,20}+$/i
    if (!password || password.length < 6 || password.length > 20 || !passwordRegex.test(password)) {
        res.status(406).send("err - profileType");
    }
}

uuid: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: Number,
    image: String,
    campus: String

// first name: 1-20 letter
// last name: 1-20 letter
// email: regex
// phone: 10-11 digits
// campus: gt, gsu

module.exports = new userCheck();

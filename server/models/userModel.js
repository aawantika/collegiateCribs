'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
    profileType: String,
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    image: String,
    campus: String
}, {
    collection: 'user'
});

module.exports = mongoose.model('userModel', userSchema);

// profile types: student, landlord
// username: 4-16 alphanumeric
// password: 6-20 alphanumeric
// first name: 1-20 letter
// last name: 1-20 letter
// email: regex
// phone: 10-11 digits
// campus: gt, gsu
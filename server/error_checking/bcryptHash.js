'use strict';

/**
 * Dependencies
 */
var bcrypt = require('bcrypt-nodejs');

function bcryptHash() {}

// Generates hash using bCrypt
bcryptHash.prototype.createHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

bcryptHash.prototype.comparePasswords = function(newPassword, hashedPassword) {
    if (bcrypt.compareSync(newPassword, hashedPassword)) {
        return true;
    }
    return false;
}

module.exports = new bcryptHash();

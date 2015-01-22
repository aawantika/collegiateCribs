'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var accountSchema = new Schema({
    uuid: String,
    profileType: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: Number,
    campus: String,
    image: String,
    rating: Number,
}, {
    collection: 'account'
});

module.exports = mongoose.model('accountModel', accountSchema);

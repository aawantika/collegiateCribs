'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var landlordSchema = new Schema({
    uuid: String,
    profile: String,
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    email: String,
    phone: Number,
    rating: Number,
    image: String
}, {
    collection: 'landlord'
});

module.exports = mongoose.model('landlordModel', landlordSchema);

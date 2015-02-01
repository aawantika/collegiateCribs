'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
    uuid: String,
    ownerId, String,
    isASublease, boolean,
    bedrooms, Number,
    bathrooms, Number,
    type, String,
    address, String,
    availability, boolean,
    verified, boolean,
    price, Number,
    length, Number,
    catsOk, boolean,
    dogsOk, boolean,
    houseTours, boolean,
    pictures, String,
    description, String


}, {
    collection: 'property'
});

module.exports = mongoose.model('propertyModel', userSchema);

// type: housing type (townhome, condo, apartment, etc.)
// length: length of lease in months
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var propertySchema = new Schema({
    uuid: String, //can't be modified
    ownerId: String, //can't be modified
    isASublease: Boolean, //can't be modified
    bedrooms: Number, //can be modified
    bathrooms: Number, //can be modified
    type: String, //can't be modified
    address: String, //can't be modified
    availability: Boolean, //can be modified
    verified: Boolean, //can't 
    price: Number, //can
    length: Number, //can
    catsOk: Boolean, //can
    dogsOk: Boolean, //can
    propertyTours: Boolean, //can
    images: String, //can
    description: String, //can
    lastRenovationDate: Date //can
}, {
    collection: 'property'
});

module.exports = mongoose.model('propertyModel', propertySchema);

// type: housing type (townhome, condo, apartment, etc.)
// length: length of lease in months
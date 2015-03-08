'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var propertySchema = new Schema({
    propertyId: String, //can't be modified
    ownerId: String, //can't be modified
    verified: String, //can't 

    address: String, //can't be modified
    city: String, //can't be modified
    state: String, //can't be modified
    zipcode: String, //can't be modified
    distance: String, //can't

    leaseType: String, //can't be modified
    bedrooms: String, //can be modified
    bathrooms: String, //can be modified
    housingType: String, //can't be modified
    price: String, //can
    utilities: String, //can

    availability: String, //can be modified
    length: String, //can
    catsOk: String, //can
    dogsOk: String, //can

    propertyTours: String, //can
    images: [Object], //can
    description: String, //can
    lastRenovationDate: Date //can
}, {
    collection: 'property'
});

propertySchema.index({
    // distanceFromCampus: 'text',
    bedrooms: 'text',
    bathrooms: 'text',
    housingType: 'text',
    price: 'text',
    length: 'text',
    catsOk: 'text',
    dogsOk: 'text',
});

module.exports = mongoose.model('propertyModel', propertySchema);

// housingType: townhome, condo, apartment, house
// distance: distance from campus
// utitlies: price range
// length: length of lease in months
// propertyTours: up to user to contact landlord if true


// propertyId: String, //can't be modified
// ownerId: String, //can't be modified
// verified: String, //can't 

// address: String, //can't be modified
// city: String, //can't be modified
// state: String, //can't be modified
// zipcode: String, //can't be modified
// distance: String, //can't

// leaseType: String, //can't be modified
// bedrooms: String, //can be modified
// bathrooms: String, //can be modified
// housingType: String, //can't be modified
// price: String, //can
// utilities: String, //can

// availability: String, //can be modified
// length: String, //can
// catsOk: String, //can
// dogsOk: String, //can

// propertyTours: String, //can
// images: [Object], //can
// description: String, //can
// lastRenovationDate: Date //can

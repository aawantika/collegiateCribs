'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var propertySchema = new Schema({
    propertyId: String, //can't be modified
    ownerId: String, //can't be modified
    verified: Boolean, //can't 

    address: String, //can't be modified
    city: String, //can't be modified
    state: String, //can't be modified
    zipcode: Number, //can't be modified
    
    leaseType: String, //can't be modified
    bedrooms: Number, //can be modified
    bathrooms: Number, //can be modified
    housingType: String, //can't be modified
    price: Number, //can
    utilities: String, //can
    
    availability: Boolean, //can be modified
    length: Number, //can
    catsOk: Boolean, //can
    dogsOk: Boolean, //can

    propertyTours: boolean, //can
    images: [Object], //can
    description: String, //can
    lastRenovationDate: Date //can
}, {
    collection: 'property'
});

module.exports = mongoose.model('propertyModel', propertySchema);

// housingType: townhome, condo, apartment, house
// utitlies: price range
// length: length of lease in months
// propertyTours: up to user to contact landlord if true

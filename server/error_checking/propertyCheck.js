'use strict';

/**
 * Dependencies
 */
var Promise = require('bluebird');
var bcrypt = require('../error_checking/bcryptHash.js');
var geocoder = require('node-geocoder').getGeocoder('google', 'http');

function propertyCheck() {}

/**
 * Invalid Input Error Checking
 */
propertyCheck.prototype.checkPropertyId = function(propertyId) {
    return new Promise(function(resolve, reject) {
        if (!propertyId) {
            reject({
                status: 406,
                send: "propertyId"
            });
        } else {
            resolve();
        }
    });
}

propertyCheck.prototype.checkAddress = function(address) {
    return new Promise(function(resolve, reject) {
        if (!address) {
            reject({
                status: 406,
                send: "address"
            });
        } else {
            resolve();
        }
    });
}

propertyCheck.prototype.checkCity = function(city) {
    return new Promise(function(resolve, reject) {
        if (!city) {
            reject({
                status: 406,
                send: "city"
            });
        } else {
            resolve();
        }
    });
}

propertyCheck.prototype.checkState = function(state) {
    return new Promise(function(resolve, reject) {
        if (!state) {
            reject({
                status: 406,
                send: "state"
            });
        } else {
            resolve();
        }
    });
}

propertyCheck.prototype.checkZipcode = function(zipcode) {
    return new Promise(function(resolve, reject) {
        // if (!zipcode || zipcode.length !== 5 || parseInt(zipcode, 10) < 1 || parseInt(zipcode, 10) > 99999) {
        if (!zipcode || typeof zipcode !== 'number' || zipcode < 1 || zipcode > 99999) {
            reject({
                status: 406,
                send: "zipcode"
            });
        } else {
            resolve();
        }
    });
}

propertyCheck.prototype.checkDistanceFromCampus = function(distanceFromCampus) {
    return new Promise(function(resolve, reject) {
        if (!distanceFromCampus || typeof distanceFromCampus !== 'number' || distanceFromCampus < 1 || distanceFromCampus > 100) {
            reject({
                status: 406,
                send: "distanceFromCampus"
            });
        } else {
            resolve();
        }
    });
}



/**
 * in progress
 */
propertyCheck.prototype.checkFullAddress = function(address, city, state, zipcode) {
    var yes = address + " " + city + ", " + state + " " + zipcode;
    console.log(yes);
    geocoder.geocode(yes, function(err, res) {
        console.log(res);
    });
    // return new Promise(function(resolve, reject) {

    //     // if (!zipcode || zipcode.length !== 5 || parseInt(zipcode, 10).length != 5) {
    //     //     reject({
    //     //         status: 406,
    //     //         send: "zipcode"
    //     //     });
    //     // } else {
    //     //     resolve();
    //     // }
    // });
}

/**
 * not needed?
 */
propertyCheck.prototype.checkLeaseType = function(leaseType) {
    return new Promise(function(resolve, reject) {
        var leaseTypes = ["sublease", "lease"];
        if (!leaseType || leaseTypes.indexOf(leaseType) === -1) {
            reject({
                status: 406,
                send: "leaseType"
            });
        } else {
            resolve();
        }
    });
}

propertyCheck.prototype.checkBedrooms = function(bedrooms) {
    return new Promise(function(resolve, reject) {
        // if (!bedrooms || bedrooms.length !== 1 || parseInt(bedrooms, 10) < 1 || parseInt(bedrooms, 10) > 8) {
        if (!bedrooms || typeof bedrooms !== 'number' || bedrooms < 1 || bedrooms > 8) {
            reject({
                status: 406,
                send: "bedrooms"
            });
        } else {
            resolve();
        }
    });
}

propertyCheck.prototype.checkBathrooms = function(bathrooms) {
    return new Promise(function(resolve, reject) {
        // if (!bathrooms || bathrooms.length !== 1 || parseInt(bathrooms, 10) < 1 || parseInt(bathrooms, 10) > 8) {
        if (!bathrooms || typeof bathrooms !== 'number' || bathrooms < 1 || bathrooms > 8) {
            reject({
                status: 406,
                send: "bathrooms"
            });
        } else {
            resolve();
        }
    });
}

propertyCheck.prototype.checkHousingType = function(housingType) {
    return new Promise(function(resolve, reject) {
        var housingTypes = ["house", "condo", "townhome", "apartment"];
        if (!housingType || housingTypes.indexOf(housingType) === -1) {
            reject({
                status: 406,
                send: "housingType"
            });
        } else {
            resolve();
        }
    });
}

propertyCheck.prototype.checkPrice = function(price) {
    return new Promise(function(resolve, reject) {
        // if (!price || parseInt(price, 10) < 1 || parseInt(price, 10) > 2000) {
        if (!price || typeof bedrooms !== 'number' || price < 1 || price > 2000) {
            reject({
                status: 406,
                send: "price"
            });
        } else {
            resolve();
        }
    });
}

propertyCheck.prototype.checkUtilities = function(utilities) {
    return new Promise(function(resolve, reject) {
        if (!utilities) {
            reject({
                status: 406,
                send: "utilities"
            });
        } else {
            resolve();
        }
    });
}

propertyCheck.prototype.checkAvailability = function(availability) {
    return new Promise(function(resolve, reject) {
        // var availabilityTypes = ["true", "false"];
        // if (!availability || availabilityTypes.indexOf(availability) === -1) {
        if (!availability || typeof availability !== 'boolean') {
            reject({
                status: 406,
                send: "availability"
            });
        } else {
            resolve();
        }
    });
}

propertyCheck.prototype.checkLength = function(length) {
    return new Promise(function(resolve, reject) {
        // if (!length || parseInt(length, 10) < 1 || parseInt(length, 10) > 36) {
        if (!length || typeof length !== 'number' || length < 1 || length > 36) {
            reject({
                status: 406,
                send: "length"
            });
        } else {
            resolve();
        }
    });
}

propertyCheck.prototype.checkCats = function(catsOk) {
    return new Promise(function(resolve, reject) {
        // var catsTypes = ["true", "false"];
        // if (!catsOk || catsTypes.indexOf(catsOk) === -1) {
        if (!catsOk || typeof catsOk !== 'boolean') {
            reject({
                status: 406,
                send: "catsOk"
            });
        } else {
            resolve();
        }
    });
}

propertyCheck.prototype.checkDogs = function(dogsOk) {
    return new Promise(function(resolve, reject) {
        // var dogsTypes = ["true", "false"];
        // if (!dogsOk || dogsTypes.indexOf(dogsOk) === -1) {
        if (!dogsOk || typeof dogsOk !== 'boolean') {
            reject({
                status: 406,
                send: "dogsOk"
            });
        } else {
            resolve();
        }
    });
}

propertyCheck.prototype.checkPropertyTours = function(propertyTours) {
    return new Promise(function(resolve, reject) {
        var propertyToursTypes = ["true", "false"];
        // if (!propertyTours || propertyToursTypes.indexOf(propertyTours) === -1) {
        if (!propertyTours || typeof propertyTours !== 'boolean') {
            reject({
                status: 406,
                send: "propertyTours"
            });
        } else {
            resolve();
        }
    });
}

propertyCheck.prototype.checkDescription = function(description) {
    return new Promise(function(resolve, reject) {
        if (!description || description.length < 1 || description.length > 500) {
            reject({
                status: 406,
                send: "description"
            });
        } else {
            resolve();
        }
    });
}

propertyCheck.prototype.checkLastRenovationDate = function(lastRenovationDate) {
    return new Promise(function(resolve, reject) {
        if (!lastRenovationDate) {
            reject({
                status: 406,
                send: "lastRenovationDate"
            });
        } else {
            resolve();
        }
    });
}

/**
 * Duplicate Error Checking
 */
propertyCheck.prototype.duplicateProperty = function(property) {
    return new Promise(function(resolve, reject) {
        if (property) {
            reject({
                status: 409,
                send: "duplicate property"
            });
        } else {
            resolve();
        }
    });
}

/**
 * Check if user/session exists
 */
propertyCheck.prototype.propertyExists = function(property) {
    return new Promise(function(resolve, reject) {
        if (property && property.length > 0) {
            resolve({
                status: 200,
                send: property
            });
        } else {
            reject({
                status: 404,
                send: "property not found"
            });
        }
    });
}


module.exports = new propertyCheck();

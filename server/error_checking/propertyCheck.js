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
        if (!zipcode || zipcode.length !== 5 || parseInt(zipcode, 10) < 1 || parseInt(zipcode, 10) > 99999) {
            reject({
                status: 406,
                send: "zipcode"
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
        if (!bedrooms || bedrooms.length !== 1 || parseInt(bedrooms, 10) < 1 || parseInt(bedrooms, 10) > 8) {
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
        if (!bathrooms || bathrooms.length !== 1 || parseInt(bathrooms, 10) < 1 || parseInt(bathrooms, 10) > 8) {
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
        if (!price || parseInt(price, 10) < 1 || parseInt(price, 10) > 2000) {
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
        if (!availability || !(typeof availability == Boolean)) {
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
        if (!length || parseInt(length, 10) < 1 || parseInt(length, 10) > 36) {
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
        var catsTypes = ["true", "false"];
        if (!catsOk || catsTypes.indexOf(catsOk) === -1) {
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
        var dogsTypes = ["true", "false"];
        if (!dogsOk || dogsTypes.indexOf(dogsOk) === -1) {
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
        if (!propertyTours || propertyToursTypes.indexOf(propertyTours) === -1) {
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
        if (property) {
            resolve({
                status: 200,
                send: user
            });
        } else {
            reject({
                status: 404,
                send: "user not found"
            });
        }
    });
}

propertyCheck.prototype.sessionExistsLogin = function(session) {
    return new Promise(function(resolve, reject) {
        if (session) {
            reject({
                status: 400,
                send: "session exists"
            });
        } else {
            resolve();
        }
    });
}


propertyCheck.prototype.sessionExists = function(session) {
    return new Promise(function(resolve, reject) {
        if (session) {
            resolve({
                status: 200,
                send: session
            });
        } else {
            reject({
                status: 404,
                send: "session not found"
            });
        }
    });
}


module.exports = new propertyCheck();

'use strict';

/**
 * Dependencies
 */
var Promise = require('bluebird');
var bcrypt = require('../error_checking/bcryptHash.js');
var addressValidator = require('address-validator');
var Address = addressValidator.Address;
var _ = require('underscore');
var distance = require('google-distance');
var gt;
var gsu;

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

propertyCheck.prototype.checkAddress = function(street_input, city_input, state_input, zipcode_input) {
    return new Promise(function(resolve, reject) {
        if (!street_input) {
            reject({
                status: 406,
                send: "street"
            });
        } else if (!city_input) {
            reject({
                status: 406,
                send: "city"
            });
        } else if (!state_input) {
            reject({
                status: 406,
                send: "state"
            });
        } else if (!zipcode_input || typeof zipcode_input !== 'number' || zipcode_input < 1 || zipcode_input > 99999) {
            reject({
                status: 406,
                send: "zipcode"
            });
        } else {
            console.log(street_input + ", " + city_input + ", " + state_input + ", " + zipcode_input);
            resolve(street_input + ", " + city_input + ", " + state_input + ", " + zipcode_input);
            // var address = new Address({
            //     street: street_input,
            //     city: city_input,
            //     state: state_input,
            //     zipcode: zipcode_input
            // });

            // var validatedAddress;
            // addressValidator.validate(address, addressValidator.match.streetAddress, function(err, exact, inexact) {
            //     validatedAddress = _.map(exact, function(a) {
            //         return a.toString();
            //     });

            //     console.log(validatedAddress);

            //     if (validatedAddress && validatedAddress.length == 1) {
            //         resolve(validatedAddress);
            //     } else {
            //         reject({
            //             status: 404,
            //             send: "address"
            //         });
            //     }
            // });
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
        if (!price || typeof price !== 'number' || price < 1) {
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
        if (utilities) {
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
        if (catsOk && typeof catsOk !== 'boolean') {
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
        if (dogsOk && typeof dogsOk !== 'boolean') {
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
        if (propertyTours && typeof propertyTours !== 'boolean') {
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
        if (description && (description.length < 1 || description.length > 500)) {
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
 * Favorite properties error checking
 */
propertyCheck.prototype.checkFavoritesMax = function(favoriteProperties) {
    return new Promise(function(resolve, reject) {
        if (favoriteProperties.length >= 10) {
            reject({
                status: 406,
                send: "cannot favorite more than 10 properties"
            });
        } else {
            resolve();
        }
    });
}

propertyCheck.prototype.duplicateFavorite = function(favoriteProperties, propertyId) {
    return new Promise(function(resolve, reject) {
        if (favoriteProperties.indexOf(propertyId) > -1) {
            reject({
                status: 406,
                send: "property already favorited"
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

propertyCheck.prototype.distanceFromCampusGT = function(address) {
    return new Promise(function(resolve, reject) {
        distance.get({
            origin: address,
            destination: 'North Ave NW, Atlanta, GA 30332',
            units: 'imperial'
        }, function(err, data) {
            if (err) {
                reject({
                    status: 500,
                    send: "internal address error"
                });
            } else {
                data = data.distance.replace(" mi", "");
                resolve({
                    status: 200,
                    send: data
                });
            }
        });
    });
}

propertyCheck.prototype.distanceFromCampusGSU = function(address) {
    return new Promise(function(resolve, reject) {
        distance.get({
            origin: address,
            destination: '33 Gilmer Street SE Atlanta, GA',
            units: 'imperial'
        }, function(err, data) {
            if (err) {
                reject({
                    status: 500,
                    send: "internal address error"
                });
            } else {
                data = data.distance.replace(" mi", "");
                console.log("gsu: " + data);
                resolve({
                    status: 200,
                    send: data
                });
            }
        });
    });
}


module.exports = new propertyCheck();

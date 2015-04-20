'use strict';

/**
 * Dependencies
 */
var Promise = require('bluebird');

function ratingCheck() {}

/**
 * Invalid Input Error Checking
 */
ratingCheck.prototype.checkPropertyId = function(propertyId) {
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

ratingCheck.prototype.checkUsername = function(username) {
    return new Promise(function(resolve, reject) {
        if (!username) {
            reject({
                status: 406,
                send: "username"
            });
        } else {
            resolve();
        }
    });
}

ratingCheck.prototype.checkRatingOrReview = function(body) {
	return new Promise(function(resolve, reject) {
       if (!body.rating && !body.review) {
           reject({
               status: 406,
               send: "must add at least one: rating or review"
           });
       } else {
           resolve();
       }
   });
}

ratingCheck.prototype.checkRating = function(rating) {
   return new Promise(function(resolve, reject) {
       if (rating && (rating < 1 || rating > 10 || typeof rating !== 'number')) {
           reject({
               status: 406,
               send: "rating must be number between 1-10"
           });
       } else {
           resolve();
       }
   });
}

ratingCheck.prototype.checkReview = function(review) {
   return new Promise(function(resolve, reject) {
       if (review && (review.length < 1 || review.length > 1000)) {
           reject({
               status: 406,
               send: "review has 1000 character max"
           });
       } else {
           resolve();
       }
   });
}

ratingCheck.prototype.checkNewRating = function(rating) {
    return new Promise(function(resolve, reject) {
        if (!rating) {
            reject({
                status: 406,
                send: "rating"
            });
        } else {
            resolve();
        }
    });
}

ratingCheck.prototype.checkNewReview = function(review) {
    return new Promise(function(resolve, reject) {
        if (!review) {
            reject({
                status: 406,
                send: "review"
            });
        } else {
            resolve();
        }
    });
}

/**
* Duplicate/Permissions Error Checking
*/
ratingCheck.prototype.checkDuplicateRating = function(rating) {
    return new Promise(function(resolve, reject) {
        if (rating) {
            reject({
                status: 409,
                send: "user has already rated/reviewed this property"
            });
        } else {
            resolve();
        }
    });
}

ratingCheck.prototype.checkIfOwner = function(username, property) {
   return new Promise(function(resolve, reject) {
       if (property.ownerId === username) {
           reject({
               status: 406,
               send: "user cannot review own property"
           });
       } else {
           resolve();
       }
   })
}

/**
* Check if rating/review exists
*/
ratingCheck.prototype.ratingExists = function(rating) {
    return new Promise(function(resolve, reject) {
        if (rating) {
            resolve({
                status: 200,
                send: rating
            });
        } else {
            reject({
                status: 404,
                send: "rating/review not found"
            });
        }
    });
}


module.exports = new ratingCheck();
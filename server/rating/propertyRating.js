'use strict';

/**
 * Dependencies
 */
var propertyRatingModel = require('../models/propertyRatingModel.js');
var userModel = require('../models/userModel.js');
var propertyModel = require('../models/propertyModel.js');
var generalCheck = require('../error_checking/generalCheck.js');
var propertyCheck = require('../error_checking/propertyCheck.js');
var userCheck = require('../error_checking/userCheck.js');

function propertyRating() {}


propertyRating.prototype.addRating = function(req, res) {
	// given propertyId, username, rating/review
	// creates a rating and/or review

	var body = req.body;
	generalCheck.checkBody(body)
		.then(function(result) {
			return propertyCheck.checkPropertyId(body.propertyId);
		})
		.then(function(result) {
			return propertyModel.findOne({
				propertyId: body.propertyId
			}).exec();
		})
		.then(function(property) {
			return propertyCheck.propertyExists(property);
		})
		.then(function(result) {
		    return userCheck.checkUsername(body.username);
		})
		.then(function(result) {
		    return userModel.findOne({
		        username: body.username
		    }).exec();
		})
		.then(function(user) {
		    return userCheck.usernameExists(user);
		})
		.then(function(user) {
		    user.send = user.send.toObject();
		    delete user.send._id;
		    delete user.send.__v;
		    return user.send;
		})
		.then(function(user) {
		    return userCheck.studentProfile(user);
		})
		.then(function(result) {
			return propertyModel.findOne({
				propertyId: body.propertyId
			}).exec();
		})
		.then(function(property) {
			return userCheck.checkIfOwner(body.username, property);
		})
		.then(function(result) {
			return propertyCheck.checkRatingBody(body);
		})
		.then(function(result) {
			return propertyCheck.checkRating(body.rating);
		})
		.then(function(result) {
			return propertyCheck.checkReview(body.review);
		})
		.then(function(result) {
			return propertyRatingModel.find(
				{ rating: { $gt: 0 } }, { username: 1, _id: 0 } ).exec();
		})
		.then(function(usernames) {
			return userCheck.checkDuplicateRating(body.username, usernames);
		})
		.then(function(result) {
			var newPropertyRating = new propertyRatingModel();
			newPropertyRating.propertyId = body.propertyId;
			newPropertyRating.username = body.username;
			if (body.rating) {
				newPropertyRating.rating = body.rating;
			}
			if (body.review) {
				newPropertyRating.review = body.review;
			}

			return newPropertyRating.save();
		})
		.then(function(result) {
		    res.sendStatus(200);
		})
		.catch(function(error) {
		    console.log(error);
		    if (error.status == 406 || error.status == 409) {
		        res.status(error.status).send(error.send);
		    } else {
		        res.status(500).send("internal error");
		    }
		});

}

propertyRating.prototype.getRating = function(req, res) {
	// given propertyId
	// returns average rating and number of votes
	
	var body = req.body;
	generalCheck.checkBody(body)
		.then(function(result) {
			return propertyCheck.checkPropertyId(body.propertyId);
		})
		.then(function(result) {
			return propertyModel.findOne({
				propertyId: body.propertyId
			}).exec();
		})
		.then(function(property) {
			return propertyCheck.propertyExists(property);
		})
		.then(function(result) {
			return propertyRatingModel.find(
				{ rating: { $gt: 0 } }, { rating: 1, _id: 0 } ).exec();
		})
		.then(function(ratings) {
			var numberOfVotes = ratings.length;
			var sum = 0;
			ratings.forEach(function(r) {
				sum += r.rating;
			});
			var rating = { averageRating: sum/numberOfVotes, numberOfVotes: numberOfVotes};
			return rating;
		})
		.then(function(result) {
		    console.log(result);
		    res.status(200).send("retrieved property rating");
		})
		.catch(function(error) {
		    console.log(error);
		    if (error.status == 406 || error.status == 404) {
		        res.status(error.status).send(error.send);
		    } else {
		        res.status(500).send("internal error");
		    }
		});

}

propertyRating.prototype.getReviews = function(req, res) {
	// given propertyId
	// returns reviews and reviewer usernames

	var body = req.body;
	generalCheck.checkBody(body)
		.then(function(result) {
			return propertyCheck.checkPropertyId(body.propertyId);
		})
		.then(function(result) {
			return propertyModel.findOne({
				propertyId: body.propertyId
			}).exec();
		})
		.then(function(property) {
			return propertyCheck.propertyExists(property);
		})
		.then(function(result) {
			return propertyRatingModel.find({
				review: { $ne: null}
			}, {
				review: 1,
				username: 1,
				_id: 0
			}).exec();
		})
		.then(function(result) {
		    console.log(result);
		    res.status(200).send("retrieved property reviews");
		})
		.catch(function(error) {
		    console.log(error);
		    if (error.status == 406 || error.status == 404) {
		        res.status(error.status).send(error.send);
		    } else {
		        res.status(500).send("internal error");
		    }
		});

}

module.exports = new propertyRating();

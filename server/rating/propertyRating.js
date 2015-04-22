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
var ratingCheck = require('../error_checking/ratingCheck.js');

function propertyRating() {}


propertyRating.prototype.createRating = function(req, res) {
	// http://localhost:8080/property/rating/create POST

	var body = req.body;
	generalCheck.checkBody(body)
		.then(function(result) {
			return ratingCheck.checkPropertyId(body.propertyId);
		})
		.then(function(result) {
			return ratingCheck.checkUsername(body.username);
		})
		.then(function(result) {
			return ratingCheck.checkRatingOrReview(body);
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
		    return userCheck.checkIfStudent(user);
		})
		.then(function(result) {
			return propertyModel.findOne({
				propertyId: body.propertyId
			}).exec();
		})
		.then(function(property) {
			return ratingCheck.checkIfOwner(body.username, property);
		})
		.then(function(result) {
			return ratingCheck.checkRating(body.rating);
		})
		.then(function(result) {
			return ratingCheck.checkReview(body.review);
		})
        .then(function(result) {
            return propertyRatingModel.findOne({
                username: body.username
            }).exec();
        })
		.then(function(propertyRating) {
			return ratingCheck.checkDuplicateRating(propertyRating);
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

propertyRating.prototype.retrieveRating = function(req, res) {
	// http://localhost:8080/property/retrieve/rating POST
	// returns average rating and number of votes
	
	var body = req.body;
	generalCheck.checkBody(body)
		.then(function(result) {
			return ratingCheck.checkPropertyId(body.propertyId);
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
			var rating = { averageRating: sum/numberOfVotes, numberOfVotes: numberOfVotes };
			return rating;
		})
		.then(function(result) {
		    res.status(200).send(result);
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

propertyRating.prototype.retrieveReviews = function(req, res) {
	// http://localhost:8080/property/retrieve/reviews POST

	var body = req.body;
	generalCheck.checkBody(body)
		.then(function(result) {
			return ratingCheck.checkPropertyId(body.propertyId);
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
		    // console.log(result);
		    res.status(200).send(result);
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

propertyRating.prototype.updateRating = function(req, res) {
	// http://localhost:8080/property/rating/update POST

	var body = req.body;
	generalCheck.checkBody(body)
		.then(function(result) {
			return ratingCheck.checkUsername(body.username);
		})
		.then(function(result) {
			return ratingCheck.checkPropertyId(body.propertyId);
		})
		.then(function(result) {
			return ratingCheck.checkNewRating(body.rating);
		})
		.then(function(result) {
			return ratingCheck.checkRating(body.rating);
		})
		.then(function(result) {
			return propertyRatingModel.findOne({
				username: body.username,
				propertyId: body.propertyId
			}).exec();
		})
		.then(function(propertyRating) {
		    return ratingCheck.ratingExists(propertyRating);
		})
		.then(function(propertyRating) {
			propertyRating = propertyRating.send;

			propertyRating.rating = body.rating;
			return propertyRating.save();
		})
		.then(function(result) {
		    res.sendStatus(200);
		})
		.catch(function(error) {
		    console.log(error);

		    if (error.status == 404 || error.status == 406) {
		        res.status(error.status).send(error.send);
		    } else {
		        res.status(500).send("internal error");
		    }
		});

}

propertyRating.prototype.updateReview = function(req, res) {
	// http://localhost:8080/property/review/update POST

	var body = req.body;
	generalCheck.checkBody(body)
		.then(function(result) {
			return ratingCheck.checkUsername(body.username);
		})
		.then(function(result) {
			return ratingCheck.checkPropertyId(body.propertyId);
		})
		.then(function(result) {
			return ratingCheck.checkNewReview(body.review);
		})
		.then(function(result) {
			return ratingCheck.checkReview(body.review);
		})
		.then(function(result) {
			return propertyRatingModel.findOne({
				username: body.username,
				propertyId: body.propertyId
			}).exec();
		})
		.then(function(propertyRating) {
		    return ratingCheck.ratingExists(propertyRating);
		})
		.then(function(propertyRating) {
			propertyRating = propertyRating.send;

			propertyRating.review = body.review;
			return propertyRating.save();
		})
		.then(function(result) {
		    res.sendStatus(200);
		})
		.catch(function(error) {
		    console.log(error);

		    if (error.status == 404 || error.status == 406) {
		        res.status(error.status).send(error.send);
		    } else {
		        res.status(500).send("internal error");
		    }
		});

}

propertyRating.prototype.deleteRating = function(req, res) {
	// http://localhost:8080/property/rating/delete POST

	var body = req.body;
	generalCheck.checkBody(body)
		.then(function(result) {
			return ratingCheck.checkUsername(body.username);
		})
		.then(function(result) {
			return ratingCheck.checkPropertyId(body.propertyId);
		})
		.then(function(result) {
			return propertyRatingModel.findOne({
				username: body.username,
				propertyId: body.propertyId
			}).exec();
		})
		.then(function(propertyRating) {
		    return ratingCheck.ratingExists(propertyRating);
		})
		.then(function(propertyRating) {
		    propertyRating = propertyRating.send;

		    if (!propertyRating.review) {
		    	return propertyRating.remove();
		    } else {
		    	propertyRating.rating = undefined;
		    	return propertyRating.save();
		    }
		})
		.then(function(result) {
		    res.status(200).send("deleted rating successfully");
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

propertyRating.prototype.deleteReview = function(req, res) {
	// http://localhost:8080/property/review/delete POST

	var body = req.body;
	generalCheck.checkBody(body)
		.then(function(result) {
			return ratingCheck.checkUsername(body.username);
		})
		.then(function(result) {
			return ratingCheck.checkPropertyId(body.propertyId);
		})
		.then(function(result) {
			return propertyRatingModel.findOne({
				username: body.username,
				propertyId: body.propertyId
			}).exec();
		})
		.then(function(propertyRating) {
		    return ratingCheck.ratingExists(propertyRating);
		})
		.then(function(propertyRating) {
		    propertyRating = propertyRating.send;

		    if (!propertyRating.rating) {
		    	return propertyRating.remove();
		    } else {
		    	propertyRating.review = undefined;
		    	return propertyRating.save();
		    }
		})
		.then(function(result) {
		    res.status(200).send("deleted review successfully");
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

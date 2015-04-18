'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var propertyRatingSchema = new Schema({
    propertyId: String,
    username: String,
    rating: Number,
    review: String
}, {
    collection: 'propertyRating'
});

module.exports = mongoose.model('propertyRatingModel', propertyRatingSchema);

// rating: score between 1-10
// review: 1000 character max
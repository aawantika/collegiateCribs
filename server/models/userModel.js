'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
	username: String,
	password: String, 
	profileType: String,
    uuid: String
}, {
    collection: 'user'
});

module.exports = mongoose.model('userModel', userSchema);

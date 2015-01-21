'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var studentSchema = new Schema({
	uuid: String,
    profileType: String,
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    email: String,
    phone: Number,
    campus: String,
    image: String
}, {
    collection: 'student'
});

module.exports = mongoose.model('studentModel', studentSchema);

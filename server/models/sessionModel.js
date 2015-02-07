'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var sessionSchema = new Schema({
    sessionKey: String,
    username: String
}, {
    collection: 'session'
});

module.exports = mongoose.model('sessionModel', sessionSchema);


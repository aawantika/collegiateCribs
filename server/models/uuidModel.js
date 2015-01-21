'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var uuidSchema = new Schema({
    uuid: String
}, {
    collection: 'uuid'
});

module.exports = mongoose.model('uuidModel', uuidSchema);

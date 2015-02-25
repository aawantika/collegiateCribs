'use strict';

/**
 * Dependencies
 */
var propertyModel = require('../models/propertyModel.js');
var uuid = require('node-uuid');

function generateUuid() {}

generateUuid.prototype.newUuid = function(res) {
    var uuidInput = uuid.v4();
    newUuidAsync(uuidInput, function(newUuid) {
        uuidInput = newUuid;
    });
    return uuidInput;
}

function newUuidAsync(uuidInput, callback) {
    propertyModel.findOne({
        uuid: uuidInput
    }, function(err, uuid) {
        if (uuid || err) {
            getNewUuid(uuid.v4(), callback);
        } else {
            callback(uuidInput);
            return;
        }
    });
}


module.exports = new generateUuid();

'use strict';

/**
 * Dependencies
 */
var userModel = require('../models/userModel.js');
var uuid = require('node-uuid');

function generateUuid() {}

generateUuid.prototype.saveUuid = function(res) {
    var uuidInput = uuid.v4();
    getNewUuid(uuidInput, function(newUuid) {
        uuidInput = newUuid;
    });
    return uuidInput;
}

function getNewUuid(uuidInput, callback) {
    userModel.findOne({
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

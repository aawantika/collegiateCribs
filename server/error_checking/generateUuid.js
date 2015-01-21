'use strict';

/**
 * Dependencies
 */
var uuidModel = require('../models/uuidModel.js');
var uuid = require('node-uuid');

function generateUuid() {}

generateUuid.prototype.saveUuid = function(res) {
    var uuidInput = uuid.v4();
    getNewUuid(uuidInput, function(newUuid) {
        uuidInput = newUuid;
    });

    var newUuidModel = new uuidModel;
    newUuidModel.uuid = uuidInput;
    newUuidModel.save(function(err) {
        if (err) {
            res.status(500).send('error saving');
        } else {
            return uuidInput;
        }
    });
}

function getNewUuid(uuidInput, callback) {
    uuidModel.findOne({
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

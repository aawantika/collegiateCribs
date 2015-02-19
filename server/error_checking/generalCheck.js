'use strict';

var Promise = require('bluebird');

function generalCheck() {}

/**
 * Check for empty body
 */
generalCheck.prototype.checkBody = function(body) {
    return new Promise(function(resolve, reject) {
        if (!body || (JSON.stringify(body) == "{}" && body == "{}")) {
            reject({
                status: 406,
                send: "body"
            });
        } else {
            resolve();
        }
    });
}

module.exports = new generalCheck();

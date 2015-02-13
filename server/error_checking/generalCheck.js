'use strict';

function generalCheck() {}

/**
 * check for empty body
 */
generalCheck.prototype.checkBody = function(body) {
    if (!body || (JSON.stringify(body) == "{}" && body == "{}")) {
        throw {
            code: 406,
            status: "body"
        };
    }
}

module.exports = new generalCheck();

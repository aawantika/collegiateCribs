'use strict';

function generalCheck() {}

/**
 * check for empty body
 */
generalCheck.prototype.checkBody = function(body, res) {
    if (!body) {
        res.send(406, "err - body");
        next();
    }
}

module.exports = new generalCheck();
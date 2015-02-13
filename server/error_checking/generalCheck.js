'use strict';

function generalCheck() {}

/**
 * check for empty body
 */
generalCheck.prototype.checkBody = function(body) {
    if (!body || (JSON.stringify(body) == "{}" && body == "{}") || JSON.stringify(body) == "{}") {
    	return false;
        // res.status(406).send("body");
    }
    return true;
}

// function checkBody(body, callback) {
//     if (!body || (JSON.stringify(body) == "{}" && body == "{}") || JSON.stringify(body) == "{}") {
//     	;
//     }
// }

module.exports = new generalCheck();

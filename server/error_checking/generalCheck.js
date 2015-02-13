'use strict';

function generalCheck() {}

/**
 * check for empty body
 */
generalCheck.prototype.checkBody = function(body,res) {
    if (!body || (JSON.stringify(body) == "{}" && body == "{}") || JSON.stringify(body) == "{}") {
        res.status(406).send("body");
    	return false;
    }
    return true;
}

// function checkBody(body, callback) {
//     if (!body || (JSON.stringify(body) == "{}" && body == "{}") || JSON.stringify(body) == "{}") {
//     	;
//     }
// }

module.exports = new generalCheck();

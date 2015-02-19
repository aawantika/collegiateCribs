promises using q:
// http://mono.software/posts/Creating-NodeJS-modules-with-both-promise-and-callback-API-support-using-Q/
    userCheck.prototype.duplicateUsername = function(usernameFound, callback) {
        return new Promise(function(resolve, reject) {
            var deferred = Q.defer();

            if (usernameFound) {
                deferred.reject({
                    status: 409,
                    send: "duplicate username"
                });
            } else {
                deferred.resolve("no err: duplicate username");
            }

            deferred.promise.nodeify(callback);
            return deferred.promise;
        });
    }

promises using bluebird:
// http://www.jasonamyers.com/node-bluebird-testing/
    userCheck.prototype.checkFirstName = function(firstName) {
        return new Promise(function(resolve, reject) {
            var firstNameRegex = /^[a-zA-Z]+$/i;
            if (!firstName || firstName.length < 1 || firstName.length > 20 || !firstNameRegex.test(firstName)) {
                reject({
                    status: 406,
                    send: "firstName"
                });
            } else {
                resolve();
            }
        });
    }

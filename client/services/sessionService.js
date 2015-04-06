var login = angular.module("sessionService", []);

login.service('$sessionService', ['$http', function($http) {
    this.loginUser = function(json, callback) {
        var req = {
            method: "POST",
            url: "http://localhost:8080/login",
            data: json
        }

        $http(req).success(function(data, status) {
            callback(null, status, data);
        }).
        error(function(data, status) {
            callback(status, data);
        });
    };

    this.isLoggedIn = function(callback) { 
        var req = {
            method: "POST",
            url: "http://localhost:8080/loggedin",
        }

        $http(req).success(function(user) {
            console.log("SUCCESSFUL");
            console.log("dkfjla: ");
            console.log(user);
            callback(null, user);
        }).error(function(user) {
            console.log("unSUCCESSFUL");
            callback(user);
        });
    };

    this.logout = function(callback) {
        var req = {
            method: "POST",
            url: "http://localhost:8080/logout",
        }

        $http(req).success(function(data, status) {
            callback(null, status, data);
        }).error(function(data, status) {
            callback(status, data);
        });
    };

}]);

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

    this.isLoggedIn = function(json, callback) { //what does this return?
        var req = {
            method: "POST",
            url: "http://localhost:8080/isLoggedIn",
            data: json
        }

        $http(req).success(function(data, status) {
            callback(null, status, data);
        }).error(function(data, status) {
            callback(status, data);
        });
    };

    this.logout = function(json, callback) {
        var req = {
            method: "POST",
            url: "http://localhost:8080/logout",
            data: json
        }

        $http(req).success(function(data, status) {
            callback(null, status, data);
        }).error(function(data, status) {
            callback(status, data);
        });
    };

}]);
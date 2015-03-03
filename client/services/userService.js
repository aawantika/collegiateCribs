var user = angular.module("userService", []);

user.service('$userService', ['$http', function($http) {
    this.createUser = function(json, callback) {
        var req = {
            method: "POST",
            url: "http://localhost:8080/user/create",
            data: json
        }

        $http(req).success(function(data, status) {
            callback(null, status, data);
        }).
        error(function(data, status) {
            callback(status, data);
        });
    };

    this.retrieveUser = function(json, callback) {
        var req = {
            method: "POST",
            url: "http://localhost:8080/user/retrieve",
            data: json
        }

        $http(req).success(function(data, status) {
            callback(null, status, data);
        }).error(function(data, status) {
            callback(status, data);
        });
    };

    this.updateUser = function(json, callback) {
        var req = {
            method: "POST",
            url: "http://localhost:8080/user/update",
            data: json
        }

        $http(req).success(function(data, status) {
            callback(null, status, data);
        }).error(function(data, status) {
            callback(status, data);
        });
    };

     this.deleteUser = function(json, callback) {
        var req = {
            method: "POST",
            url: "http://localhost:8080/user/delete",
            data: json
        }

        $http(req).success(function(data, status) {
            callback(null, status, data);
        }).error(function(data, status) {
            callback(status, data);
        });
    };
}]);
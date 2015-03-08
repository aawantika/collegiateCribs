var property = angular.module("propertyService", []);

property.service('$propertyService', ['$http', function($http) {
    this.createProperty = function(json, callback) {
        var req = {
            method: "POST",
            url: "http://localhost:8080/property/create",
            data: json
        }

        $http(req).success(function(data, status) {
            callback(null, status, data);
        }).
        error(function(data, status) {
            callback(status, data);
        });
    };

    this.retrieveProperty = function(json, callback) {
        var req = {
            method: "POST",
            url: "http://localhost:8080/property/retrieve",
            data: json
        }

        $http(req).success(function(data, status) {
            callback(null, status, data);
        }).error(function(data, status) {
            callback(status, data);
        });
    };

    this.retrieveAllPropertyByUsername = function(json, callback) {
        var req = {
            method: "POST",
            url: "http://localhost:8080/property/retrieve/username",
            data: json
        }

        $http(req).success(function(data, status) {
            callback(null, status, data);
        }).error(function(data, status) {
            callback(status, data);
        });
    };

    this.updateProperty = function(json, callback) {
        var req = {
            method: "POST",
            url: "http://localhost:8080/property/update",
            data: json
        }

        $http(req).success(function(data, status) {
            callback(null, status, data);
        }).error(function(data, status) {
            callback(status, data);
        });
    };

    this.deleteProperty = function(json, callback) {
        var req = {
            method: "POST",
            url: "http://localhost:8080/property/delete",
            data: json
        }

        $http(req).success(function(data, status) {
            callback(null, status, data);
        }).error(function(data, status) {
            callback(status, data);
        });
    };
}]);

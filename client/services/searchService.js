var search = angular.module("searchService", []);

search.service('$searchService', ['$http', function($http) {
    this.searchLandlord = function(json, callback) {
        var req = {
            method: "POST",
            url: "http://localhost:8080/search/landlord",
            data: json
        }

        $http(req).success(function(data, status) {
            callback(null, status, data);
        }).
        error(function(data, status) {
            callback(status, data);
        });
    };

    this.searchProperty = function(json, callback) {
        var req = {
            method: "POST",
            url: "http://localhost:8080/search/property",
            data: json
        }

        $http(req).success(function(data, status) {
            callback(null, status, data);
        }).error(function(data, status) {
            callback(status, data);
        });
    };
}]);

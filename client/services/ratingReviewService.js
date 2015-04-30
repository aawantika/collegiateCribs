var ratingReview = angular.module("ratingReviewService", []);

ratingReview.service('$ratingReviewService', ['$http', function($http) {
    this.createRatingReview = function(json, callback) {
        var req = {
            method: "POST",
            url: "http://localhost:8080/property/rating/create",
            data: json
        }

        $http(req).success(function(data, status) {
            callback(null, status, data);
        }).
        error(function(data, status) {
            callback(status, data);
        });
    };

    this.retrieveRating = function(json, callback) {
        var req = {
            method: "POST",
            url: "http://localhost:8080/property/rating/retrieve",
            data: json
        }

        $http(req).success(function(data, status) {
            callback(null, status, data);
        }).error(function(data, status) {
            callback(status, data);
        });
    };

    this.retrieveReviews = function(json, callback) {
        var req = {
            method: "POST",
            url: "http://localhost:8080/property/review/retrieve",
            data: json
        }

        $http(req).success(function(data, status) {
            callback(null, status, data);
        }).error(function(data, status) {
            callback(status, data);
        });
    };

    this.updateRating = function(json, callback) {
        var req = {
            method: "POST",
            url: "http://localhost:8080/rating/update",
            data: json
        }

        $http(req).success(function(data, status) {
            callback(null, status, data);
        }).error(function(data, status) {
            callback(status, data);
        });
    };

    this.updateReview = function(json, callback) {
        var req = {
            method: "POST",
            url: "http://localhost:8080/review/update",
            data: json
        }

        $http(req).success(function(data, status) {
            callback(null, status, data);
        }).error(function(data, status) {
            callback(status, data);
        });
    };

    this.deleteRating = function(json, callback) {
        var req = {
            method: "POST",
            url: "http://localhost:8080/rating/delete",
            data: json
        }

        $http(req).success(function(data, status) {
            callback(null, status, data);
        }).error(function(data, status) {
            callback(status, data);
        });
    };

    this.deleteReview = function(json, callback) {
        var req = {
            method: "POST",
            url: "http://localhost:8080/review/delete",
            data: json
        }

        $http(req).success(function(data, status) {
            callback(null, status, data);
        }).error(function(data, status) {
            callback(status, data);
        });
    };
}]);

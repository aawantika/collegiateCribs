var login = angular.module("login",[]);

login.service('$createUser', ['$http', function($http) {
    this.createUser =  function(json, callback) {
        var req = {
            method: "POST",
            url: "http://localhost:8080/user/create",
            data: json
        }
        console.log("works");
        console.log(req);
        $http(req).success(function(data, status) {
            callback(null, status, data);
        }).
        error(function(data, status) {
            callback(status, data);
        });
    };
}]);

login.service('$fake', ['$http', function($http) {
    this.fake =  function(json, callback) {
        var req = {
            method: "POST",
            url: "http://localhost:8080/user/create",
            data: json
        }
        $http(req).success(function(data, status) {
            callback(null, data);
        }).
        error(function(data, status) {
            callback(data);
        });
    };
}]);
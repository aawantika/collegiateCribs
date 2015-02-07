var login = angular.module("login", []);

login.service('$loginService', ['$http', function($http) {
    this.createUser = function(json, callback) {
        var req = {
            method: "POST",
            url: "http://localhost:8080/user/create",
            data: json
        }
        console.log('ayy!');
        console.log(json);

        $http(req).success(function(data, status) {
            callback(null, status, data);
        }).
        error(function(data, status) {
            callback(status, data);
            console.log('AYYYYYYYYY');
            console.log(status);
            console.log(data);
        });
    };
}]);

login.service('$loginService', ['$http', function($http) {
    this.loginUser = function(json, callback) {
        var req = {
            method: "POST",
            url: "http://localhost:8080/login",
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

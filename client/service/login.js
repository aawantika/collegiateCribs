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
        });
    };

    this.loginUser = function(json, callback) {
        var req = {
            method: "POST",
            url: "http://localhost:8080/login",
            data: json
        }
        $http(req).success(function(data, status) {
            console.log("success");
            console.log(data);
            console.log(status);
            callback(null, status, data);
        }).
        error(function(data, status) {
            console.log("failure");
           console.log(data);
            console.log(status);
            callback(status, data);
        });
    };
}]);

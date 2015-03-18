var app = angular.module("addPropertyController", []);

app.controller('LandlordSignupController', ['$scope', '$sessionService', '$location', '$cookies', '$state', function($scope, $sessionService, $location, $cookies, $state) {
    $scope.alert = "";

    $scope.addProperty = function() {
    var cookie = {
        "username": $cookies.username,
        "sessionKey": $cookies.sessionKey
    }
    
        if (!$scope.username || !$scope.password) {
            $scope.alert = "Please fill in all required fields";
            return false;
        } else {
            $scope.alert = "all filled";
            $userService.updateUser(login, function(err, status, data) {
                if (!err) {
                     $cookies.username = data.username;
                     $cookies.sessionKey = data.sessionKey;
                     $state.go("home");
                 }
             });
         }
    };
}]);
var app = angular.module("propertyController", []);

app.controller('PropertyController', function($scope, $location, $state, $sessionService, $searchService, $propertyService, $userService, dataService, sendPropertyService) {
    $scope.alert = "";
    var propertyData = sendPropertyService.getData();


    $sessionService.isLoggedIn(function(err, user) {
        if (user !== '0') {
            inputUsername = user;
            $userService.retrieveUser({
                username: inputUsername
            }, function(err, status, data) {
                if (data.profileType == 'student') {

                } else if (err) {
                    $scope.alert("Error retrieving user");
                }
            });
        } else {
            $location.url('/login');
        }
    });


    $propertyService.retrieveProperty(propertyData, function(err, status, data) {
        if (!err) {
            $scope.property = data; 
        } else {
            $scope.alert("error retrieving properties");
        }
    });
});
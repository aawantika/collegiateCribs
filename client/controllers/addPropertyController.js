var app = angular.module("addPropertyController", []);

app.controller('LandlordSignupController', ['$scope', '$sessionService', '$location', '$cookies', '$state', function($scope, $sessionService, $location, $cookies, $state) {
    $scope.alert = "";
    var cookie = {
        "username": $cookies.username,
        "sessionKey": $cookies.sessionKey
    }

    $sessionService.isLoggedIn(cookie, function(err, status, data) {
        if (!err) {
            $scope.showPage = true;
        } else {
            $location.path("/");
        }
    });

    $scope.submitProperty = function () {
    	var newProperty = {
    		"ownerId" : cookies.username, 
    		"address" : $scope.address, 
    		"city": $scope.city,
    		"state": $scope.state, 
    		"zipcode": $scope.zipcode, 
    		"propertyType": $scope.housingType, 
    		"availability": $scope.availability, 
    		"price": $scope.price
    	}


        if (!newProperty.bedrooms || !newProperty.bathrooms 
        	||!newProperty.housingType || !newProperty.address 
        	||!newProperty.city ||!newProperty.state ||!newProperty.zipcode
        	||!newProperty.availability || !newProperty.price ) {
            $scope.alert = "Please fill in all required fields";
            return false;
        } else {
            $scope.alert = "all filled";
            $propertyService.createProperty(newProperty, function(err, status, data) {
                if (!err) {
                     $state.go("home");
                 }
            });
        }
    };
}]);
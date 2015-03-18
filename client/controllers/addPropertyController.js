var app = angular.module("addPropertyController", []);

app.controller('LandlordSignupController', ['$scope', '$sessionService', '$location', '$cookies', '$state', function($scope, $sessionService, $location, $cookies, $state) {
    $scope.alert = "";
    var cookie = {
        "username": $cookies.username,
        "sessionKey": $cookies.sessionKey
    }
    var user = {
    	"username":$cookies.username
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
    		"ownerId" : "", 
    		"address" : $scope.address, 
    		"city": $scope.city,
    		"state": $scope.state, 
    		"zipcode": $scope.zipcode, 
    		"propertyType": $scope.propertyType
    	}
    	$userService.retrieveUser(user, function(err, status, data) {
        	if (data.profileType == 'student') {
            	console.log("Change to Student Dashboard");
            	$state.go('home.studentDashboard');
        	} else {
            	console.log("Change to Landlord Dashboard");
        	}
    	});


        if (!$scope.bedrooms || !$scope.bathrooms 
        	||!$scope.propertyType || !$scope.address 
        	||!$scope.city ||!$scope.state ||!$scope.zipcode
        	|| !$scope.availability || !$scope.price ) {
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
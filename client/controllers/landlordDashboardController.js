var app = angular.module("landlordDashboardController", []);

app.controller('LandlordDashboardController', ['$scope', '$cookies', '$location', '$state', '$propertyService', function($scope, $cookies, $location, $state, $propertyService) {
    $scope.alert = "";
    $scope.username = $cookies.username + "'s";
    $scope.rating = "N/A";

    $scope.addProperty = function() {
        console.log("change to Add Property");
        $state.go('home.addProperty');
    };

    var landlord = {
        'username': $cookies.username
    }
    $propertyService.retrieveAllPropertyByUsername(landlord, function(err, status, data) {
        if (!err) {
            console.log(data);
            $scope.properties = data; 
        } else {
            $scope.alert("error retrieving properties");
        }
    });
}]);
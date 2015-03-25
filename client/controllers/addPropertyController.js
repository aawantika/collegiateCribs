var app = angular.module("addPropertyController", []);

app.controller('AddPropertyController', ['$scope', '$sessionService', '$propertyService', '$location', '$cookies', '$state', function($scope, $sessionService, $propertyService, $location, $cookies, $state) {
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

    $scope.submitProperty = function() {
        var newProperty = {
            "username": cookie.username,
            "address": $scope.address,
            "city": $scope.city,
            "state": $scope.state,
            "zipcode": parseInt($scope.zipcode),
            "distanceFromCampus" : 2, 
            "housingType": $scope.housingType,
            "bedrooms": parseInt($scope.bedrooms),
            "bathrooms": parseInt($scope.bathrooms),
            "price": parseInt($scope.price),
            "utilities": "88-100",
            "availability": 'yes' == ($scope.availability) || 'Yes' == $scope.availability,
            "length": 12, 
            "catsOk": $scope.catsOk == 'true', 
            "dogsOk": $scope.dogsOk == 'true', 
            "propertyTours": true, 
            "description": "ayooooooooo",
            "utilities":"88-100", 
            "lastRenovationDate": new Date(parseInt($scope.lastRenovationDate.year), 
                parseInt($scope.lastRenovationDate.month), parseInt($scope.lastRenovationDate.day))
        }
        $propertyService.createProperty(newProperty, function(err, status, data) {
                if (!err) {
                    console.log("going home"); 
                    $state.go("home");
                }
        });
        console.log(newProperty); 
        // if (!newProperty.bedrooms || !newProperty.bathrooms || !newProperty.housingType 
        //     || !newProperty.address || !newProperty.city || !newProperty.state || !newProperty.zipcode 
        //     || !newProperty.availability || !newProperty.price) {
        //     console.log(hello); 
        //     $scope.alert = "Please fill in all required fields";
        //     return false;
        // } else {
        //     // $scope.alert = "all filled";
        //     // $propertyService.createProperty(newProperty, function(err, status, data) {
        //     //     if (!err) {
        //     //         $state.go("home");
        //     //     }
        //     // });
        // }
    };
}]);
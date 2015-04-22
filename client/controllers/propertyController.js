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

    $scope.currReadOnly = true;
    $scope.rateReadOnly = false;

    $scope.hoveringOver = function(value) {
        $scope.overStar = value;
        $scope.percent = 100 * (value / 5);
    };

    $scope.submitReviewRating = function() {
        console.log($scope);
        
    }

    $scope.menuSearchEnter = function() {
        console.log('change to search');
        console.log("ayyy");
        if (!$scope.menuSearch) {
            $state.go('search');
        } else {
            $searchService.retrieveAllPropertyByUsername(landlord, function(err, status, data) {
                if (!err) {
                    $state.go('search');
                } else {
                    // $scope.alert("error retrieving properties");
                }
            });
        }
    }

    $scope.ratingStates = [{
        stateOn: 'glyphicon-ok-sign',
        stateOff: 'glyphicon-ok-circle'
    }, {
        stateOn: 'glyphicon-star',
        stateOff: 'glyphicon-star-empty'
    }, {
        stateOn: 'glyphicon-heart',
        stateOff: 'glyphicon-ban-circle'
    }, {
        stateOn: 'glyphicon-heart'
    }, {
        stateOff: 'glyphicon-off'
    }];

});

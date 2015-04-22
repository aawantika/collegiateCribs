var app = angular.module("homeController", ['miscServices']);

app.controller('HomeController', ['$scope', '$userService', '$sessionService', '$searchService', '$propertyService', '$location', '$state', function($scope, $userService, $sessionService, $searchService, $propertyService, $location, $state) {
    $scope.alert = "";
    $scope.showPage = false;
    var inputUsername;

    $sessionService.isLoggedIn(function(err, user) {
        if (user !== '0') {
            inputUsername = user;
            $scope.showHomePage = true;

            $userService.retrieveUser({
                username: inputUsername
            }, function(err, status, data) {
                if (data.profileType == 'student') {
                    $state.go('home.studentDashboard');
                } else if (data.profileType == "landlord") {
                    var landlord = {
                        "username": data.username
                    }
                    $propertyService.retrieveAllPropertyByUsername(landlord, function(err, status, data) {
                        if (!err) {
                            if (data.length == 0) {
                                $state.go("home.addProperty");
                            } else {
                                $state.go("home.landlordDashboard");
                            }
                        } else {
                            $scope.alert("error retrieving properties");
                        }
                    });
                } else {
                    $scope.alert("Error retrieving user");
                }
            });
        } else {
            $location.url('/login');
        }
    });

    $scope.menuSearchEnter = function() {
        console.log('change to search');

        if (!$scope.menuSearch) {
            $state.go('search');
        } else {
            $searchService.retrieveAllPropertyByUsername(landlord, function(err, status, data) {
                if (!err) {
                    $state.go('search');
                } else {
                    $scope.alert("error retrieving properties");
                }
            });
        }
    }

    $scope.logoutButton = function() {
        $sessionService.logout(function(err, status, data) {
            if (!err) {
                $scope.showPage = false;
                $state.go("start.login");
            }
        });
    };
}]);


app.controller('LandlordDashboardController', ['$scope', '$location', '$state', '$sessionService', '$propertyService', function($scope, $location, $state, $sessionService, $propertyService) {
    $scope.alert = "";
    $scope.rating = "N/A";

    $scope.addProperty = function() {
        console.log("change to Add Property");
        $state.go('home.addProperty');
    };
    $sessionService.isLoggedIn(function(err, user) {
        if (user !== '0') {
            inputUsername = user;
            $scope.showHomePage = true;

            $propertyService.retrieveAllPropertyByUsername({
                username: inputUsername
            }, function(err, status, data) {
                if (!err) {
                    console.log(data);
                    $scope.properties = data;
                } else {
                    $scope.alert("error retrieving properties");
                }
            });
        } else {
            $location.url('/login');
        }
    });
}]);



app.controller('StudentDashboardController', function($scope, $state, $sessionService, $userService, $propertyService, dataService) {
    $scope.alert = "";
    $scope.bedroomOptions = [{
        "id": "1",
        "label": "1"
    }, {
        "id": "2",
        "label": "2"
    }, {
        "id": "3",
        "label": "3"
    }, {
        "id": "4",
        "label": "4"
    }, {
        "id": "5",
        "label": "5"
    }, {
        "id": "6",
        "label": "6+"
    }];
    $scope.bathroomOptions = [{
        "id": "1",
        "label": "1"
    }, {
        "id": "2",
        "label": "2"
    }, {
        "id": "3",
        "label": "3"
    }, {
        "id": "4",
        "label": "4"
    }, {
        "id": "5",
        "label": "5"
    }, {
        "id": "6",
        "label": "6+"
    }];
    // $sessionService.isLoggedIn(function(err, user) {
    //     if (user !== '0') {
    //         inputUsername = user;
    // $userService.getFavoriteProperties({
    //     username: inputUsername,
    // }, function(err, status, data) {
    //     if (!err) {
    //         console.log(data);
    //         $scope.favorites = data;
    //     } else if (err) {
    //         $scope.alert("Error retrieving user");
    //     }
    // });
    //     } else {
    //         $location.url('/login');
    //     }
    // });
    $sessionService.isLoggedIn(function(err, user) {
        if (user !== '0') {
            inputUsername = user;
            $scope.showHomePage = true;

            $propertyService.retrieveAllPropertyByUsername({
                username: inputUsername
            }, function(err, status, data) {
                if (!err && data.length > 0) {
                    console.log(data);
                    $scope.subleases = data;
                } else if (err) {
                    $scope.alert("error retrieving properties");
                }
            });
            $userService.getFavoriteProperties({
                username: inputUsername,
            }, function(err, status, data) {
                if (!err) {
                    console.log(data);
                    $scope.favorites = data;
                } else if (err) {
                    $scope.alert("Error retrieving user");
                }
            });
        } else {
            $location.url('/login');
        }
    });
    $scope.simpleSearch = function() {
        var query = {}

        if ($scope.minPrice) {
            query['minPrice'] = parseInt($scope.minPrice);
        }
        if ($scope.maxPrice) {
            query.maxPrice = parseInt($scope.maxPrice);
        }
        if ($scope.bedrooms) {
            query.bedrooms = parseInt($scope.bedrooms);
        }
        if ($scope.bathrooms) {
            query.bathrooms = parseInt($scope.bathrooms);
        }
        dataService.setData(query);
        $state.go("search");
    };

    $scope.addSublease = function() {
        $state.go("home.addProperty");
    }
});
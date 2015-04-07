var app = angular.module("homeController", []);

app.service('dataService', function() {
    var data, queried;
    return {
        setData: function(queryData) {
            this.data = queryData;
            this.queried = false;
        },
        getData: function() {
            this.queried = true;
            return this.data;
        }
    };
});


app.controller('HomeController', ['$scope', '$userService', '$sessionService', '$propertyService', '$location', '$cookies', '$state', function($scope, $userService, $sessionService, $propertyService, $location, $cookies, $state) {
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
        $state.go('home.search');
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



app.controller('StudentDashboardController', function($scope, $state, dataService) {
    $scope.alert = "";

    $scope.simpleSearch = function() {
        var query = {
            "bedrooms": parseInt($scope.bedrooms),
            "bathrooms": parseInt($scope.bathrooms),
            "minPrice": parseInt($scope.minPrice),
            "maxPrice": parseInt($scope.maxPrice)
        }
        console.log("hello");
        dataService.setData(query);
        console.log("off to Search");
        $state.go("home.search");
    };
});

app.controller('SearchController', function($scope, $cookies, $location, $state, $sessionService, $searchService, dataService) {
    var query = {}
    var housingTypes = [];

    if (dataService.queried == true) {
        console.log(query);

        query = {
            "distanceFromCampus": parseInt($scope.distanceFromCampus),
            "minPrice": parseInt($scope.minPrice),
            "maxPrice": parseInt($scope.maxPrice),
            "bedrooms": parseInt($scope.bedrooms),
            "bathrooms": parseInt($scope.bathrooms),
            "housingType": this.housingTypes,
            "catsOk": $scope.catsOk == 'true',
            "dogsOk": $scope.dogsOk == 'true'
        }
    } else if (dataService.queried == false) {
        query = dataService.getData();
        $scope.minPrice = query.minPrice;
        $scope.maxPrice = query.maxPrice;
    }

    $searchService.searchProperty(query, function(err, status, data) {
        if (!err) {
            console.log(data);
            $scope.properties = data;
        } else {
            $scope.alert("error retrieving properties");
        }
    });

    $scope.updateHousingType = function() {
        housingTypes = [];
        if ($scope.typeHouse) {
            console.log("pushing house");
            housingTypes[housingTypes.length] = 'house';
        }
        if ($scope.typeCondo) {
            console.log("pushing condo");
            housingTypes[housingTypes.length] = 'condo';
        }
        if ($scope.typeTownhome) {
            console.log("pushingtownHome");
            housingTypes[housingTypes.length] = 'townhome';
        }
        if ($scope.typeApartment) {
            console.log("pushingApartment");
            housingTypes[housingTypes.length] = 'apartment';
        }
        $scope.change(housingTypes);
    }

    $scope.change = function(list) {
        var query = {
            "distanceFromCampus": parseInt($scope.distanceFromCampus),
            "minPrice": parseInt($scope.minPrice),
            "maxPrice": parseInt($scope.maxPrice),
            "bedrooms": parseInt($scope.bedrooms),
            "bathrooms": parseInt($scope.bathrooms),
            "housingType": list,
            "catsOk": $scope.catsOk == 'true',
            "dogsOk": $scope.dogsOk == 'true',
        }
        console.log(query);
        $searchService.searchProperty(query, function(err, status, data) {
            if (!err) {
                console.log(data);
                $scope.properties = data;
            } else {
                $scope.alert("error retrieving properties");
            }
        });
    }
});

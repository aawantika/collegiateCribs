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

app.service('')

app.controller('HomeController', ['$scope', '$userService', '$sessionService', '$propertyService', '$location', '$state', function($scope, $userService, $sessionService, $propertyService, $location, $state) {
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
    $scope.toSearch = function() {
        console.log('off to search');
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


app.controller('LandlordDashboardController', ['$scope', '$location', '$state', '$propertyService', function($scope, $location, $state, $propertyService) {
    $scope.alert = "";
    $scope.rating = "N/A";

    $scope.addProperty = function() {
        console.log("change to Add Property");
        $state.go('home.addProperty');
    };

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
        console.log("off to Search");
        $state.go("home.search");
    };
});

app.controller('SearchController', function($scope, $location, $state, $sessionService, $searchService, dataService) {
    var query = {}
    var housingTypes = [];

    $scope.campuses = [{
        "id": "gt",
        "label": "Georgia Tech"
    }, {
        "id": "gsu",
        "label": "Georgia State"
    }];
    
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

    if (dataService.queried == true) {
        console.log(query);

        query = {}
    } else if (dataService.queried == false) {
        query = dataService.getData();
        $scope.bathrooms = $scope.bathroomOptions;
        $scope.bedrooms = query.bedrooms;
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
        var query = {};

        if (list && list.length > 0) {
            query.housingType = list;
        }
        if ($scope.distanceFromCampus) {
            query.distanceFromCampus = parseInt($scope.distanceFromCampus);
        }
        if ($scope.minPrice) {
            query.minPrice = parseInt($scope.minPrice);
        }
        if ($scope.maxPrice) {
            query.maxPrice = parseInt($scope.maxPrice);
        }
        if ($scope.bedrooms && !isNaN($scope.bedrooms)) {
            query.bedrooms = parseInt($scope.bedrooms);
        }
        if ($scope.bathrooms && !isNaN($scope.bathrooms)) {
            query.bathrooms = parseInt($scope.bathrooms);
        }
        if ($scope.catsOk) {
            query.catsOk = $scope.catsOk;
        }
        if ($scope.dogsOk) {
            query.dogsOk = $scope.dogsOk;
        }
        $searchService.searchProperty(query, function(err, status, data) {
            if (!err) {
                $scope.properties = data;
                console.log($scope.properties);
            } else {
                // $scope.alert("error retrieving properties");
            }
        });
    }
    // $scope.goToProperty() = function() {

    // }
});
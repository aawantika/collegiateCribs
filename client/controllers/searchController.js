var app = angular.module("searchController", []);


var user = {};
app.controller('SearchController', function($scope, $location, $state, $sessionService, $searchService, $userService, dataService, sendPropertyService) {
    $scope.alerts = [];
    var query = {}
    var housingTypes = [];
    var user;

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

    $sessionService.isLoggedIn(function(err, user) {
        if (user !== '0') {
            inputUsername = user;
            $userService.retrieveUser({
                username: inputUsername
            }, function(err, status, data) {
                user = data;

                if (data.profileType == 'student') {
                    if (data.campus == 'gt') {
                        $scope.campus = $scope.campuses[0];

                        if (dataService.queried == true) {
                            query = {};
                        } else if (dataService.queried == false) {
                            query = dataService.getData();
                            $scope.bathrooms = $scope.bathroomOptions[query.bathrooms - 1];
                            $scope.bedrooms = $scope.bedroomOptions[query.bedrooms - 1];
                            $scope.minPrice = query.minPrice;
                            $scope.maxPrice = query.maxPrice;
                        }

                    } else {
                        $scope.campus = $scope.campuses[1];
                    }
                } else if (err) {
                    console.log("Error retrieving user");
                }
            });
        } else {
            $location.url('/login');
        }
    });

    $searchService.searchProperty(query, function(err, status, data) {
        var properties;
        if (!err) {
            properties = data;
            console.log("yes");
            for (var i = 0; i < properties.length; i++) {
                properties[i].favoriteButtonLabel = "Add to Favorites";
                // $userService.isFavorited({
                //     username: user,
                //     propertyId: properties[i].propertyId
                // }, function(err, status, data) {
                //     if (data == true) {
                //         properties[i].favoriteButtonLabel = "Favorited";
                //     } else if (data == false) {
                //         properties[i].favoriteButtonLabel = "Add to Favorites";
                //     } else if (err) {
                //         console.log("error");
                //     }
                // });
            }
            $scope.properties = properties;
            console.log(properties);
            for (var j = 0; j < properties.length; j++) {
                var retrieveUserQuery = {
                    username: properties[j].ownerId
                };

                $userService.retrieveUser(retrieveUserQuery, function(err, status, data) {
                    if (!err) {
                        $scope.user = data;
                    }
                });

                console.log($scope.user);
                // console.log($scope.firstName);
                // console.log($scope.lastName);

                // $scope.properties[j].firstName = firstName;
                // $scope.properties[j].lastName = lastName;
            }

            console.log($scope.properties);
        } else {
            // $scope.alert("error retrieving properties");
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
            if ($scope.campus) {
                query.campus = $scope.campus.id;
                query.distanceFromCampus = parseInt($scope.distanceFromCampus);
            } else {
                $scope.alerts.length = 0;
                $scope.alerts.push({
                    msg: 'Please select a campus'
                });

            }
        }
        if ($scope.minPrice) {
            query.minPrice = parseInt($scope.minPrice);
        }
        if ($scope.maxPrice) {
            query.maxPrice = parseInt($scope.maxPrice);
        }
        if ($scope.bedrooms && !isNaN($scope.bedrooms.id)) {
            query.bedrooms = parseInt($scope.bedrooms.id);
        }
        if ($scope.bathrooms && !isNaN($scope.bathrooms.id)) {
            query.bathrooms = parseInt($scope.bathrooms.id);
        }
        if ($scope.catsOk) {
            query.catsOk = $scope.catsOk;
        }
        if ($scope.dogsOk) {
            query.dogsOk = $scope.dogsOk;
        }

        $searchService.searchProperty(query, function(err, status, data) {
            var properties
            if (!err) {
                properties = data;
                for (var i = 0; i < properties.length; i++) {
                    properties[i].favoriteButtonLabel = "Add to Favorites";
                    // $userService.isFavorited({
                    //     username: user,
                    //     propertyId: properties[i].propertyId
                    // }, function(err, status, data) {
                    //     if (data == true) {
                    //         properties[i].favoriteButtonLabel = "Favorited";
                    //     } else if (data == false) {
                    //         properties[i].favoriteButtonLabel = "Add to Favorites";
                    //     } else if (err) {
                    //         console.log("error");
                    //     }
                    // });
                }
                $scope.properties = properties;
            } else {
                // $scope.alert("error retrieving properties");
            }
        });
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

    $scope.toSearch = function() {
        console.log('off to search');
        $state.go('search');
    }

    $scope.logoutButton = function() {
        $sessionService.logout(function(err, status, data) {
            if (!err) {
                $scope.showPage = false;
                $state.go("start.login");
            }
        });
    };

    $scope.goToProperty = function(propertyId) {
        var query = {}
        query.propertyId = propertyId;
        sendPropertyService.setData(query);
        $state.go('property');
    }

    //$scope.property.favoriteButtonLabel = "Add to Favorites";
    $scope.addToFavorites = function(propertyId) {
        $sessionService.isLoggedIn(function(err, user) {
            if (user !== '0') {
                inputUsername = user;
                propId = propertyId;
                console.log(inputUsername);
                console.log(propId);
                $userService.addFavoriteProperty({
                    username: inputUsername,
                    propertyId: propId
                }, function(err, status, data) {
                    if (!err) {
                        for (var i = 0; i < $scope.properties.length; i++) {
                            if ($scope.properties[i].propertyId === propId) {
                                $scope.properties[i].favoriteButtonLabel = "Favorited";
                                break;
                            }
                        }
                    } else if (err) {
                        $scope.alert("Error retrieving user");
                    }
                });
            } else {
                $location.url('/login');
            }
        });
    }

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
});

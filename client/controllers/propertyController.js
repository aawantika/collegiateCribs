var app = angular.module("propertyController", []);

app.controller('PropertyController', function($scope, $location, $state, $sessionService, $searchService, $propertyService, $userService, $ratingReviewService, dataService, sendPropertyService) {
    $scope.alert = "";
    var propertyData = sendPropertyService.getData();
    var inputUsername;

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
            if (data.dogsOk == true) {
                $scope.property.dogsOk = "Dogs";
            } else {
                $scope.property.dogsOk = "";
            }
            if (data.catsOk == true) {
                $scope.property.catsOk = "Cats";
            } else {
                $scope.property.catsOk = "";
            }
        } else {
            $scope.alert("error retrieving properties");
        }
    });

    var getReviews = {
        username: inputUsername,
        propertyId: propertyData.propertyId
    };

    $ratingReviewService.retrieveReviews(getReviews, function(err, status, data) {
        if (!err) {
            $scope.reviews = data;
        } else {
            console.log("error with adding new rating review");
        }
    });

    $ratingReviewService.retrieveRating(getReviews, function(err, status, data) {
        if (!err) {
            $scope.currentRating = data.averageRating;
        } else {
            console.log("error with adding new rating review");
        }
    });

    $scope.currReadOnly = true;
    $scope.rateReadOnly = false;

    $scope.hoveringOver = function(value) {
        $scope.overStar = value;
        $scope.percent = 100 * (value / 5);
    };

    $scope.submitReviewRating = function() {
        if ($scope.newRating && $scope.review) {
            var review = {
                username: inputUsername,
                propertyId: propertyData.propertyId,
                rating: $scope.newRating,
                review: $scope.review
            };

            $ratingReviewService.createRatingReview(review, function(err, status, data) {
                if (!err) {
                    console.log("added");
                    var getReviews = {
                        username: inputUsername,
                        propertyId: propertyData.propertyId
                    };

                    $ratingReviewService.retrieveReviews(getReviews, function(err, status, data) {
                        if (!err) {
                            $scope.reviews = data;
                            $ratingReviewService.retrieveRating(getReviews, function(err, status, data) {
                                if (!err) {
                                    $scope.currentRating = data.averageRating;
                                } else {
                                    console.log("error with adding new rating review");
                                }
                            });
                        } else {
                            console.log("error with adding new rating review");
                        }
                    });

                } else {
                    console.log("error with adding new rating review");
                }
            });
        } else if ($scope.review) {
            var review = {
                username: inputUsername,
                propertyId: propertyData.propertyId,
                review: $scope.review
            };

            $ratingReviewService.createRatingReview(review, function(err, status, data) {
                if (!err) {
                    console.log("added");
                    var getReviews = {
                        username: inputUsername,
                        propertyId: propertyData.propertyId
                    };

                    $ratingReviewService.retrieveReviews(getReviews, function(err, status, data) {
                        if (!err) {
                            $scope.reviews = data;
                            $ratingReviewService.retrieveRating(getReviews, function(err, status, data) {
                                if (!err) {
                                    $scope.currentRating = data.averageRating;
                                } else {
                                    console.log("error with adding new rating review");
                                }
                            });
                        } else {
                            console.log("error with adding new rating review");
                        }
                    });

                } else {
                    console.log("error with adding new rating review");
                }
            });
        } else if ($scope.newRating) {
            var rating = {
                username: inputUsername,
                propertyId: propertyData.propertyId,
                rating: $scope.newRating
            };

            console.log(rating)

            $ratingReviewService.createRatingReview(rating, function(err, status, data) {
                if (!err) {
                    console.log("added");
                    var getReviews = {
                        username: inputUsername,
                        propertyId: propertyData.propertyId
                    };

                    $ratingReviewService.retrieveRating(getReviews, function(err, status, data) {
                        if (!err) {
                            $scope.currentRating = data.averageRating;

                            $ratingReviewService.retrieveReviews(getReviews, function(err, status, data) {
                                if (!err) {
                                    $scope.reviews = data;
                                    console.log($scope.reviews[0].review);
                                    console.log($scope.reviews[0].username);
                                    console.log("added");
                                } else {
                                    console.log("error with adding new rating review");
                                }
                            });
                        } else {
                            console.log("error with adding new rating review");
                        }
                    });

                } else {
                    console.log("error with adding new rating review");
                }
            });
        }
        console.log($scope.newRating);
        console.log($scope.review);
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

var app = angular.module("addPropertyController", []);

app.controller('AddPropertyController', ['$scope', '$sessionService', '$propertyService', '$location', '$state', function($scope, $sessionService, $propertyService, $location, $state) {
        $scope.alerts = [];
        var data = undefined;

        $scope.stateOptions = [{
            "id": "ga",
            "label": "Georgia"
        }];

        $scope.housingOptions = [{
            "id": "house",
            "label": "House"
        }, {
            "id": "condo",
            "label": "Condominium"
        }, {
            "id": "townhome",
            "label": "Townhome"
        }, {
            "id": "apartment",
            "label": "Apartment"
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
            "label": "6"
        }, {
            "id": "7",
            "label": "7"
        }, {
            "id": "8",
            "label": "8"
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
            "label": "6"
        }, {
            "id": "7",
            "label": "7"
        }, {
            "id": "8",
            "label": "8"
        }];

        $sessionService.isLoggedIn(cookie, function(err, status, data) {
            if (!err) {
                $scope.showPage = true;
            } else {
                $location.path("/");
            }
        });
        $sessionService.isLoggedIn(function(err, user) {
            if (user !== '0') {
                $scope.showPage = true;
            } else {
                $location.url('/login');
            }
        });
        $scope.submitProperty = function() {
            $scope.submitted = true;

            var newProperty = {
                "username": "bob1",
                "street": $scope.street,
                "city": $scope.city,
                "state": $scope.state,
                "zipcode": parseInt($scope.zipcode),
                "housingType": $scope.housingType,
                "price": parseInt($scope.price),
                "bedrooms": parseInt($scope.bedrooms),
                "bathrooms": parseInt($scope.bathrooms),
                "length": parseInt($scope.leaseLength),
                "utilities": $scope.utilities,
                "description": $scope.description
            }

            if ($scope.pets) {
                if ($scope.pets.catsOk) {
                    newProperty.catsOk = $scope.pets.catsOk;
                }
                if ($scope.pets.dogsOk) {
                    newProperty.dogsOk = $scope.pets.dogsOk;
                }
            }

            if ($scope.propertyTours) {
                if ($scope.propertyTours === "yes") {
                    newProperty.propertyTours = true;
                } else if ($scope.propertyTours === "no") {
                    newProperty.propertyTours = false;
                }
            }

            if (data) {
                newProperty.lastRenovationDate = data;
            }

            var utilitiesRegex = /^([0-9][0-9]*-[0-9][0-9]*)+$/i;

            if (!$scope.street || !$scope.city || !$scope.state || !$scope.zipcode || isNaN(parseInt($scope.zipcode)) || $scope.zipcode.length != 5) {
                $scope.alerts.length = 0;
                $scope.alerts.push({
                    type: 'danger',
                    msg: 'Please fill in a valid address.'
                });
            } else if (!$scope.housingType) {
                $scope.alerts.length = 0;
                $scope.alerts.push({
                    type: 'danger',
                    msg: 'What is the housing type?'
                });
            } else if (!$scope.price || isNaN(parseInt($scope.price))) {
                $scope.alerts.length = 0;
                $scope.alerts.push({
                    type: 'danger',
                    msg: "What's the price of rent per month?"
                });
            } else if (!$scope.price || isNaN(parseInt($scope.price))) {
                $scope.alerts.length = 0;
                $scope.alerts.push({
                    type: 'danger',
                    msg: "What's the price of rent per month?"
                });
            } else if ($scope.utilities && !utilitiesRegex.test($scope.utilities)) {
                $scope.alerts.length = 0;
                $scope.alerts.push({
                    type: 'danger',
                    msg: "Invalid utilities format. eg. 80-100"
                });
            } else if (!$scope.bedrooms || !$scope.bathrooms) {
                $scope.alerts.length = 0;
                $scope.alerts.push({
                    type: 'danger',
                    msg: "How many bedrooms and bathrooms are there?"
                });
            } else if (!$scope.leaseLength || isNaN(parseInt($scope.price))) {
                $scope.alerts.length = 0;
                $scope.alerts.push({
                    type: 'danger',
                    msg: "How long is the lease or sublease?"
                });
            } else {
                console.log(newProperty);
                $propertyService.createProperty(newProperty, function(err, status, data) {
                    if (!err) {
                        $state.go("home.landlordDashboard");
                    } else {
                        if ((err === 404 && status === "address") || (err === 406)) {
                            $scope.alerts.length = 0;
                            $scope.alerts.push({
                                type: 'warning',
                                msg: "Make sure the address is correct."
                            });
                        }
                    }
                });
            }

            $scope.closeAlert = function(index) {
                $scope.alerts.splice(index, 1);
            };
        };

        $scope.today = function() {
            $scope.dt = new Date();
        };

        $scope.clear = function() {
            $scope.dt = null;
        };

        $scope.toggleMin = function() {
            $scope.minDate = $scope.minDate ? null : new Date();
        };

        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.opened = true;
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 0,
            showWeeks: 'false'
        };

        $scope.formats = ['MM-dd-yyyy', 'dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];

        $scope.getDate = function() {
            data = $scope.dt;
        }
    }])
    .directive('showErrors', function() {
        return {
            restrict: 'A',
            require: '^form',
            link: function(scope, el, attrs, formCtrl) {
                var inputEl = el[0].querySelector("[name]");
                var inputNgEl = angular.element(inputEl);
                var inputName = inputNgEl.attr('name');
                inputNgEl.bind('blur', function() {
                    el.toggleClass('has-error', formCtrl[inputName].$invalid);
                })
            }
        }
    });
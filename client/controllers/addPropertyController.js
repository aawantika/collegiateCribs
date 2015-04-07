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
            "id": "house",
            "label": "House"
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

        // $sessionService.isLoggedIn(cookie, function(err, status, data) {
        //     if (!err) {
        //         $scope.showPage = true;
        //     } else {
        //         $location.path("/");
        //     }
        // });

        $scope.submitProperty = function() {
            $scope.submitted = true;

            var newProperty = {
                "address": $scope.address,
                "city": $scope.city,
                "state": $scope.state,
                "zipcode": parseInt($scope.zipcode),
                "housingType": $scope.housingType,
                "price": parseInt($scope.price),
                "bedrooms": parseInt($scope.bedrooms),
                "bathrooms": parseInt($scope.bathrooms),
                "length": $scope.leaseLength,
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

            if (!newProperty.bedrooms || !newProperty.bathrooms || !newProperty.housingType || !newProperty.address || !newProperty.city || !newProperty.state || !newProperty.zipcode || !newProperty.availability || !newProperty.price) {
                $scope.alert = "Please fill in all required fields";
                return false;
            } else {
                $scope.alert = "all filled";
                $propertyService.createProperty(newProperty, function(err, status, data) {
                    if (!err) {
                        $state.go("home.landlordDashboard");
                    }
                });
            }
        };

        $scope.today = function() {
            $scope.dt = new Date();
        };

        $scope.clear = function() {
            $scope.dt = null;
        };
        $scope.clear();

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
    });;

app.controller('DatepickerDemoCtrl', function($scope) {

});

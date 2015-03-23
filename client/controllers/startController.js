'use strict'

var app = angular.module("startController", []);

app.controller('StartController', ['$scope', '$location', '$state', function($scope, $location, $state) {
    $scope.alert = "";
    $scope.toLogin = function() {
        $state.go('start.login');
    };

    $scope.toSignUp = function() {
        $state.go('start.signup');
    };
}]);

app.controller('LoginController', ['$scope', '$sessionService', '$location', '$cookies', '$state', function($scope, $sessionService, $location, $cookies, $state) {
        $scope.alerts = [];

        $scope.loginButton = function() {
            var login = {
                "username": $scope.username,
                "password": $scope.password,
            }

            if ($scope.username && $scope.password) {
                $sessionService.loginUser(login, function(err, status, data) {
                    if (!err) {
                        $cookies.username = data.username;
                        $cookies.sessionKey = data.sessionKey;
                        $state.go("home");
                    } else {
                        console.log(err == 406);
                        if (err == 404 || err == 406) {
                            $scope.alerts.push({
                                type: 'danger',
                                msg: 'Invalid credentials.'
                            });
                        }
                    }
                });
            } else {
                $scope.alerts.push({
                    msg: 'Username and password cannot be blank.'
                });
            }
        };

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };
    }])
    .directive('showErrors', function() {
        return {
            restrict: 'A',
            require: '^form',
            link: function(scope, el, attrs, formCtrl) {
                // find the text box element, which has the 'name' attribute
                var inputEl = el[0].querySelector("[name]");
                // convert the native text box element to an angular element
                var inputNgEl = angular.element(inputEl);
                // get the name on the text box so we know the property to check
                // on the form controller
                var inputName = inputNgEl.attr('name');

                // only apply the has-error class after the user leaves the text box
                inputNgEl.bind('blur', function() {
                    el.toggleClass('has-error', formCtrl[inputName].$invalid);
                })
            }
        }
    });

app.controller('SignupController', ['$scope', '$userService', '$state', '$stateParams', function($scope, $userService, $state, $stateParams) {
    $scope.alerts = [];

    $scope.toStudent = function() {
        $state.go('start.signup.student');
    };

    $scope.canSubmit = function() {
        var newUser = {
            "profileType": $scope.user.profileType,
            "firstName": $scope.user.firstName,
            "lastName": $scope.user.lastName,
            "username": $scope.user.username,
            "password": $scope.user.password,
            "confirmPassword": $scope.user.passConfirm,
            "email": $scope.user.email,
            "campus": $scope.user.campus
        }

        if (!newUser.firstName || !newUser.lastName || !newUser.username || !newUser.password || !newUser.confirmPassword || !newUser.email) {
            $scope.alert = "Property fill in all required fields";
            return false;
        } else if (newUser.password != newUser.confirmPassword) {
            $scope.alert = "Password confirm does not match Password";
            return false;
        } else {
            $scope.alert = "submittable";
            $userService.createUser(newUser, function(err, status, data) {
                $scope.alert = data + " " + status;
            });
        }
        
    };

    $scope.passMatch = function() {
        var pass = $scope.user.password;
        var passC = $scope.user.passConfirm;
        if ((pass || passC) && pass != passC) {
            $scope.passConAlert = "Password confirm doesn't match Password";
        } else {
            $scope.passConAlert = "";
        }
    };
}]);

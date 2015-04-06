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

    $scope.menuSearchEnter = function() {
        $state.go('home.search');
    }
}]);

app.controller('LoginController', ['$scope', '$userService', '$sessionService', '$propertyService', '$location', '$state', function($scope, $userService, $sessionService, $propertyService, $location, $state) {
        $scope.alerts = [];
        $scope.showPage = false;
        $scope.showLoginPage = false;
        var inputUsername;

        $sessionService.isLoggedIn(function(err, user) {
            if (user !== '0') {
                inputUsername = user;
                $scope.showPage = true;
                $scope.showLoginPage = false;

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
                $scope.showLoginPage = true;
                $location.url('/login');
            }
        });

        $scope.loginButton = function() {
            var login = {
                "username": $scope.username,
                "password": $scope.password,
            }

            if ($scope.username && $scope.password) {
                $sessionService.loginUser(login, function(err, status, data) {
                    if (!err) {
                        console.log("going home");
                        $state.go("home");
                    } else {
                        console.log("error");
                        console.log(err);
                        if (err == 404 || err == 406 || err == 401) {
                            $scope.alerts.length = 0;
                            $scope.alerts.push({
                                type: 'danger',
                                msg: 'Invalid credentials.'
                            });
                        }
                    }
                });
            } else {
                $scope.alerts.length = 0;
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

app.controller('SignupController', ['$scope', '$userService', '$sessionService', '$propertyService', '$state', '$stateParams', function($scope, $userService, $sessionService, $propertyService, $state, $stateParams) {
        $scope.alerts = [];
        $scope.myOptions = [{
            "id": "gt",
            "label": "Georgia Tech"
        }, {
            "id": "gsu",
            "label": "Georgia State"
        }];

        $scope.user = $scope.user || {
            firstName: "",
            lastName: "",
            username: "",
            password: "",
            passConfirm: "",
            email: "",
            phone: "",
            campus: ""
        };

        $scope.toStudent = function() {
            $state.go('start.signup.student');
        };

        $scope.toLandlord = function() {
            $state.go('start.signup');
        };

        $scope.canSubmit = function() {
            var newUser = {
                "profileType": $scope.profileType,
                "firstName": $scope.firstName,
                "lastName": $scope.lastName,
                "username": $scope.username,
                "password": $scope.password,
                "confirmPassword": $scope.confirmPassword,
                "email": $scope.email,
                "campus": $scope.user.campus
            }

            console.log($scope.user.campus);

            if (!$scope.profileType) {
                $scope.alerts.length = 0;
                $scope.alerts.push({
                    msg: 'Are you a student or a landlord?'
                });
            } else if (!$scope.firstName) {
                $scope.alerts.length = 0;
                $scope.alerts.push({
                    msg: 'First name cannot be blank.'
                });
            } else if (!$scope.lastName) {
                $scope.alerts.length = 0;
                $scope.alerts.push({
                    msg: 'Last name cannot be blank.'
                });
            } else if (!$scope.username) {
                $scope.alerts.length = 0;
                $scope.alerts.push({
                    msg: 'Username cannot be blank.'
                });
            } else if (!$scope.password || !$scope.confirmPassword) {
                $scope.alerts.length = 0;
                $scope.alerts.push({
                    msg: 'Password cannot be blank.'
                });
            } else if (!$scope.email) {
                $scope.alerts.length = 0;
                $scope.alerts.push({
                    msg: 'Email cannot be blank.'
                });
            } else if ($scope.password != $scope.confirmPassword) {
                $scope.alerts.length = 0;
                $scope.alerts.push({
                    msg: "Passwords don't match."
                });
            } else if ($scope.profileType == "student" && !$scope.user.campus) {
                $scope.alerts.length = 0;
                $scope.alerts.push({
                    msg: "What university are you from?"
                });
            } else {
                $userService.createUser(newUser, function(err, status, data) {
                    if (err) {
                        if (err == 406 && status === "username") {
                            $scope.alerts.length = 0;
                            $scope.alerts.push({
                                type: 'danger',
                                msg: "Username must be between 4 and 20 characters."
                            });
                        } else if (err == 406 && status === "password") {
                            $scope.alerts.length = 0;
                            $scope.alerts.push({
                                type: 'danger',
                                msg: "Password must be between 6 and 20 characters."
                            });
                        } else if (err == 406 && status.indexOf("phoneNumber") > -1) {
                            $scope.alerts.length = 0;
                            $scope.alerts.push({
                                type: 'danger',
                                msg: "Invalid phone format."
                            });
                        } else if (err == 409 && status.indexOf("username") > -1) {
                            $scope.alerts.length = 0;
                            $scope.alerts.push({
                                type: 'danger',
                                msg: "Username already exists."
                            });
                        } else if (err == 409 && status.indexOf("email") > -1) {
                            $scope.alerts.length = 0;
                            $scope.alerts.push({
                                type: 'danger',
                                msg: "Email already exists."
                            });
                        }
                    } else {
                        var login = {
                            "username": $scope.username,
                            "password": $scope.password,
                        }

                        if ($scope.username && $scope.password) {
                            $sessionService.loginUser(login, function(err, status, data) {
                                if (!err) {
                                    console.log("going home");
                                    $state.go("home");
                                } else {
                                    console.log("error");
                                    console.log(err);
                                    if (err == 404 || err == 406 || err == 401) {
                                        $scope.alerts.length = 0;
                                        $scope.alerts.push({
                                            type: 'danger',
                                            msg: 'Invalid credentials.'
                                        });
                                    }
                                }
                            });
                        }
                    }
                });
            }
        };

        $scope.passMatch = function() {
            var password = $scope.password;
            var confirmPassword = $scope.confirmPassword;
            if ((password || confirmPassword) && password != confirmPassword) {
                $scope.alerts.length = 0;
                $scope.alerts.push({
                    type: 'danger',
                    msg: "Passwords don't match"
                });
            } else {
                $scope.alerts.length = 0;
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
                var inputEl = el[0].querySelector("[name]");
                var inputNgEl = angular.element(inputEl);
                var inputName = inputNgEl.attr('name');
                inputNgEl.bind('blur', function() {
                    el.toggleClass('has-error', formCtrl[inputName].$invalid);
                })
            }
        }
    });

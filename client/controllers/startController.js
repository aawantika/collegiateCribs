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
                        if (err == 404 || err == 406) {
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

app.controller('SignupController', ['$scope', '$userService', '$state', '$stateParams', function($scope, $userService, $state, $stateParams) {
        $scope.alerts = [];

        $scope.toStudent = function() {
            $state.go('start.signup.student');
        };

        $scope.toLandlord = function() {
            // TODO:
            // MAKE SURE THAT THE START.SIGNUP.STUDENT STATE ISN'T BEING SHOWN HERE
            //TODO: ALSO MAKE SURE THAT THIS BECOMES START.SIGNUP.LANDLORD WHEN
            //THAT IS READY
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
                "campus": $scope.campus
            }

            // TO DO: FIGURE OUT HOW TO CONNECT PROFILETYPE BACK IN
// 
// 
// 
// 
// 
//__________________________________________________             
            if (!$scope.profileType) {
                $scope.alerts.length = 0;
                $scope.alerts.push({
                    msg: 'Are you a student or a landlord?'
                });
            } else

           
             if (!$scope.firstName) {
                console.log("here1");
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
            } 
             // ALSO FIGURE OUT HOW TO CONNECT CAMPUS BACK IN.
             // 
             // 
             // 
             // 

            else if ($scope.profileType == "student" && !$scope.campus) {
                $scope.alerts.length = 0;
                $scope.alerts.push({
                    msg: "What university are you from?"
                });
            } 
            else {
                $userService.createUser(newUser, function(err, status, data) {
                    if (err) {
                        console.log("ERR");
                    } else {

                    }
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

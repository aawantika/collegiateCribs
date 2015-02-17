'use strict'

var app = angular.module("app", [
    'ngRoute',
    'ngCookies',
    'login',
    'ui.router',
    'ng-polymer-elements'
]);
//^ a JSON of the dependencies for app

app.controller('LoginController', ['$scope', '$loginService', '$location', '$cookies', function($scope, $loginService, $location, $cookies) {
    $scope.alert = "";

    $scope.canSubmit = function() {
        var login = {
            "username": $scope.username,
            "password": $scope.password,
        }
        if (!$scope.username || !$scope.password) {
            $scope.alert = "Please fill in all required fields";
            return false;
        } else {
            $scope.alert = "all filled";
            $loginService.loginUser(login, function(err, status, data) {
                if (!err) {
                    $cookies.username = data.username;
                    $cookies.sessionKey = data.sessionKey;
                    $location.path("/home");
                }
            });
        }
    };
}]);

app.controller('EditAccountController', ['$scope', '$loginService', function($scope, $loginService) {
    $scope.alert = "";
    $scope.passConAlert = "";

    $scope.toStudent = function() {
        console.log("change to Student");
        var oldStudLord = document.getElementById("studLord");
        var newLabel = "<paper-dropdown-menu label='Campus*'>" +
            "<paper-dropdown class='dropdown core-transition core-closed'>" +
            '<core-menu class="menu" ng-model="campus" valueattr="label">' +
            '<paper-item class="core-selected" active label="GT">GT</paper-item>' +
            '<paper-item class="core-selected" active label="GSU">GSU</paper-item>' +
            '</core-menu>' +
            '</paper-dropdown>' +
            '</paper-dropdown-menu>';
        oldStudLord.innerHTML = newLabel;
    };

    $scope.toLandlord = function() {
        //make a drop down for 1-10 properties
        console.log("change to Landlord");
        var oldStudLord = document.getElementById("studLord");
        var newLabel = "<h3>Property</h3>\n"
        var numBed = "<paper-input-decorator label='Number of Bedrooms' floatingLabel> <input type=\"text\" ng-model=\"numBed\"></paper-input-decorator>\n"
        var numBath = "<paper-input-decorator label='Number of Bathrooms' floatingLabel><input type=\"text\" ng-model=\"numBath\"></paper-input-decorator>\n"
        var houseType = "<paper-input-decorator label='Housing Type' floatingLabel><input type=\"text\" ng-model=\"houseType\"></paper-input-decorator>\n"
        var addr = "<paper-input-decorator label='Address' floatingLabel><input type=\"text\" ng-model=\"address\"></paper-input-decorator>\n"
        var avail = "<paper-input-decorator label='Availability' floatingLabel><input type=\"text\" ng-model=\"avail\"></paper-input-decorator>\n"
        var price = "<paper-input-decorator label='Pricing' floatingLabel><input type=\"text\" ng-model=\"price\"></paper-input-decorator>\n"
        var pets = "<h4>Pet Policy</h4><br>\n" +
            '<core-toolbar style="background:transparent;' +
            '-webkit-box-shadow:none; -moz-box-shadow:none; box-shadow: none;">' +
            '<core-label horizontal layout center>' +
            '<paper-checkbox for ng-model="catsOk"></paper-checkbox>' +
            '<div>Cats</div>' +
            '</core-label>' +
            '<core-label horizontal layout center>' +
            '<paper-checkbox for ng-model="dogsOk"></paper-checkbox>' +
            '<div>Dogs</div>' +
            '</core-label>' +
            '</core-toolbar>';
        var newForm = newLabel.concat(numBed, numBath, houseType, addr, avail, price, pets);
        oldStudLord.innerHTML = newForm;
    };

    $scope.canSubmit = function() {
        var newUser = {
            "firstName": $scope.firstName,
            "lastName": $scope.lastName,
            "username": $scope.username,
            "password": $scope.password,
            "confirmPassword": $scope.passConfirm,
            "email": $scope.email
        }

        if (!newUser.firstName || !newUser.lastName || !newUser.username || !newUser.password || !newUser.confirmPassword || !newUser.email) {
            $scope.alert = "Please fill in all required fields";
            return false;
        } else if (newUser.password != newUser.confirmPassword) {
            $scope.alert = "Password confirm does not match Password";
            return false;
        } else {
            $scope.alert = "submittable";
            $loginService.createUser(newUser, function(err, status, data) {
                $scope.alert = data + " " + status;
            });
        }
    };

    $scope.passMatch = function() {
        var pass = $scope.password;
        var passC = $scope.passConfirm;
        if ((pass || passC) && pass != passC) {
            $scope.passConAlert = "Password confirm doesn't match Password";
        } else {
            $scope.passConAlert = "";
        }
    };
}]);

app.controller('HomeController', ['$scope', '$loginService', '$location', '$cookies', function($scope, $loginService, $location, $cookies) {
    $scope.alert = "";
    $scope.showPage = false;
    var cookie = {
        "username": $cookies.username,
        "sessionKey": $cookies.sessionKey
    }

    $loginService.isLoggedIn(cookie, function(err, status, data) {
        console.log(status);
        console.log(data);
        if (!err) {
            $scope.showPage = true;
            console.log(cookie);
        } else {
            $location.path("/");
        }
    });

    $scope.logoutButton = function() {
        $loginService.logout(cookie, function(err, status, data) {
            if (!err) {
                $scope.showPage = false;
                $location.path("/");
            }
        });
    };

}]);

app.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/login');

        $stateProvider.state('login', {
                url:'/login',
                controller: 'LoginController',
                templateUrl: '/client/html_pages/login.html'
            })
            .state('signup', {
                url:'/signup',
                controller: 'EditAccountController',
                templateUrl: '/client/html_pages/signup.html'
            })
            .state('home', {
                url:'/home',
                controller: 'HomeController',
                templateUrl: '/client/html_pages/home.html'
            });
    }])
    .directive('head', ['$rootScope', '$compile',
        function($rootScope, $compile) {
            return {
                restrict: 'E',
                link: function(scope, elem) {
                    var html = '<link rel="stylesheet" ng-repeat="(routeCtrl, cssUrl) in routeStyles" ng-href="{{cssUrl}}" >';
                    elem.append($compile(html)(scope));
                    scope.routeStyles = {};
                    $rootScope.$on('$routeChangeStart', function(e, next, current) {
                        if (current && current.$$route && current.$$route.css) {
                            if (!Array.isArray(current.$$route.css)) {
                                current.$$route.css = [current.$$route.css];
                            }
                            angular.forEach(current.$$route.css, function(sheet) {
                                delete scope.routeStyles[sheet];
                            });
                        }
                        if (next && next.$$route && next.$$route.css) {
                            if (!Array.isArray(next.$$route.css)) {
                                next.$$route.css = [next.$$route.css];
                            }
                            angular.forEach(next.$$route.css, function(sheet) {
                                scope.routeStyles[sheet] = sheet;
                            });
                        }
                    });
                }
            };
        }
    ]);

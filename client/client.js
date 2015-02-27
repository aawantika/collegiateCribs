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

app.controller('EditAccountController', ['$scope', '$loginService', '$state', '$stateParams', function($scope, $loginService, $state, $stateParams) {
    $scope.alert = $scope.alert||"";
    $scope.passConAlert = $scope.passConAlert||"";
    $scope.user=$scope.user||{
        firstName:"",
        lastName:"",
        username:"",
        password:"",
        passConfirm:"",
        email:"",
        phone:"",
        campus:""
    };

    $scope.toStudent = function() {
        console.log("change to Student");
        $state.go('signup.student');
    };

    $scope.toLandlord = function() {
        //make a drop down for 1-10 properties
        console.log("change to Landlord");
        $state.go('signup.landlord');
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
        var pass = $scope.user.password;
        var passC = $scope.user.passConfirm;
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
            .state('signup.landlord',{
                templateUrl: '/client/html_pages/landlordSignup.html',
                controller: 'EditAccountController',
                parent:'signup'
            })
            .state('signup.student',{
                templateUrl: '/client/html_pages/studentSignup.html',
                controller: 'EditAccountController',
                parent:'signup'
            })
            .state('home', {
                url:'/home',
                controller: 'HomeController',
                templateUrl: '/client/html_pages/home.html'
            }).state('test',{
                url:'/test',
                templateUrl: '/client/html_pages/studentDashboard.html'
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

app.run(
    ['$rootScope', '$state', '$stateParams',
      function ($rootScope, $state, $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;
      }
    ]);

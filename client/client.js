'use strict'

var app = angular.module("app", [
    'ngRoute',
    'ngCookies',
    'login',
    'ui.router',
    'ng-polymer-elements'
]);
//^ a JSON of the dependencies for app

app.controller('LoginController', ['$scope', '$loginService', '$location', '$cookies', '$state', function($scope, $loginService, $location, $cookies, $state) {
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
                    $state.go("home");
                }
            });
        }
    };
}]);

app.controller('EditAccountController', ['$scope', '$loginService', '$state', '$stateParams', function($scope, $loginService, $state, $stateParams) {
    $scope.alert = $scope.alert || "";
    $scope.passConAlert = $scope.passConAlert || "";
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
        console.log("change to Student");
        $state.go('start.signup.student');
    };

    $scope.toLandlord = function() {
        //make a drop down for 1-10 properties
        console.log("change to Landlord");
        $state.go('start.signup.landlord');
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

app.controller('HomeController', ['$scope', '$loginService', '$location', '$cookies', '$state', function($scope, $loginService, $location, $cookies, $state) {
    $scope.alert = "";
    $scope.showPage = false;
    var cookie = {
        "username": $cookies.username,
        "sessionKey": $cookies.sessionKey
    }
    var user = {
        "username": $cookies.username
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

    $loginService.retrieveUser(user, function(err, status, data) {
        console.log(status);
        console.log(data);
        if (data.profileType == 'student') {
            console.log("Change to Student Dashboard");
            $state.go('studentDashboard');
        } else {
            console.log("Change to Landlord Dashboard");
        }
    });

    $scope.menuSearchEnter() = function() {
        console.log('change to search');
        $state.go('search')
    }
    
    $scope.logoutButton = function() {
        $loginService.logout(cookie, function(err, status, data) {
            if (!err) {
                $scope.showPage = false;
                $location.path("/");
            }
        });
    };

}]);

app.controller('StartController', ['$scope', '$location', '$state', function($scope, $location, $state) {
    $scope.alert = "";
    $scope.toLogin = function() {
        console.log("change to Login");
        $state.go('start.login');
    };

    $scope.toSignUp = function() {
        //make a drop down for 1-10 properties
        console.log("change to sign up");
        $state.go('start.signup');
    };

}]);

app.controller('StudentDashboardController', ['$scope', function($scope) {
    console.log("StudentDashboardController");
}]);
app.controller('SearchController', ['$scope', function($scope) {
    console.log("SearchController");
}]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/login');

        $stateProvider.state('start', {
                controller: 'StartController',
                templateUrl: '/client/html_pages/start.html',
                abstract: true
            })
            .state('start.login', {
                url: '/login', 
                controller: 'LoginController',
                templateUrl: '/client/html_pages/login.html',
            })
            .state('start.signup', {
                url: '/signup',
                controller: 'EditAccountController',
                templateUrl: '/client/html_pages/signup.html',
            })
            .state('start.signup.landlord', {
                templateUrl: '/client/html_pages/landlordSignup.html',
                controller: 'EditAccountController',
            })
            .state('start.signup.student', {
                templateUrl: '/client/html_pages/studentSignup.html',
                controller: 'EditAccountController',
            })
            .state('home', {
                url: '/home',
                controller: 'HomeController',
                templateUrl: '/client/html_pages/home.html'
            })
            .state('studentDashboard', {
                url: '/studentDashboard',
                controller: 'StudentDashboardController',
                templateUrl: '/client/html_pages/studentDashboard.html'
            })
            .state('search', {
                url: '/search',
                controller: 'searchController',
                templateUrl: '/client/html_pages/search.html',
            })
            .state('test', {
                url: '/test',
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
        function($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ]);
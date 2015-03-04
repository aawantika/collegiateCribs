'use strict'

var app = angular.module("app", [
    'ngRoute',
    'ngCookies',
    'ui.router',
    'ng-polymer-elements',
    'startController',
    'homeController',
    'userService',
    'sessionService'
]);
//^ a JSON of the dependencies for app

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
                controller: 'HomeController',
                templateUrl: '/client/html_pages/home.html',
            })
            .state('home.studentDashboard', {
                url: '/studentDashboard',
                controller: 'StudentDashboardController',
                templateUrl: '/client/html_pages/studentDashboard.html'
            })
            .state('home.search', {
                url: '/search',
                controller: 'searchController',
                templateUrl: '/client/html_pages/search.html',
            })
            .state('test', {
                url: '/test',
                templateUrl: '/client/html_pages/lease.html'
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

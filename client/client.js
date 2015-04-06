'use strict'

var app = angular.module("app", [
    'ngRoute',
    'ngCookies',
    'ui.router',
    'ui.bootstrap',
    'startController',
    'homeController',
    'addPropertyController',
    'addPropertyController',
    'userService',
    'sessionService',
    'propertyService',
    'searchService'
]);


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
                controller: 'SignupController',
                templateUrl: '/client/html_pages/signup.html',
            })
            .state('start.signup.student', {
                templateUrl: '/client/html_pages/studentSignup.html',
                controller: 'SignupController',
            })
            .state('home', {
                url: '/dashboard',
                controller: 'HomeController',
                templateUrl: '/client/html_pages/home.html',
            })
            .state('home.addProperty', {
                url: '/addProperty',
                controller: 'AddPropertyController',
                templateUrl: '/client/html_pages/addProperty.html'
            })
            .state('home.studentDashboard', {
                controller: 'StudentDashboardController',
                templateUrl: '/client/html_pages/studentDashboard.html'
            })
            .state('home.landlordDashboard', {
                controller: 'LandlordDashboardController',
                templateUrl: 'client/html_pages/landlordDashboard.html'
            })
            .state('home.search', {
                url: '/search',
                controller: 'SearchController',
                templateUrl: '/client/html_pages/search.html',
            })
            .state('tika', {
                url: '/tika',
                templateUrl: '/client/html_pages/addProperty.html',
            })
            .state('test', {
                url: '/test',
                templateUrl: '/client/html_pages/property.html',
            }).state('test2', {
                url: '/test2',
                templateUrl: '/client/html_pages/landlordDashboard.html',
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

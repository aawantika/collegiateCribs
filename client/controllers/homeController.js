var app = angular.module("homeController", []);

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
            $state.go('home.studentDashboard');
        } else {
            console.log("Change to Landlord Dashboard");
        }
    });

    $scope.menuSearchEnter = function() {
        console.log('change to search');
        $state.go('home.search');
    }

    $scope.logoutButton = function() {
        $loginService.logout(cookie, function(err, status, data) {
            if (!err) {
                $scope.showPage = false;
                $state.go("start.login");
            }
        });
    };
}]);

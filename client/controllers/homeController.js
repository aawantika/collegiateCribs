var app = angular.module("homeController", []);

app.controller('HomeController', ['$scope', '$userService', '$sessionService', '$propertyService', '$location', '$cookies', '$state', function($scope, $userService, $sessionService, $propertyService, $location, $cookies, $state) {
    $scope.alert = "";
    $scope.showPage = false;
    var cookie = {
        "username": $cookies.username,
        "sessionKey": $cookies.sessionKey
    }
    var user = {
        "username": $cookies.username
    }

    $sessionService.isLoggedIn(cookie, function(err, status, data) {
        if (!err) {
            $scope.showPage = true;
        } else {
            $location.path("/");
        }
    });

    $userService.retrieveUser(user, function(err, status, data) {
        if (data.profileType == 'student') {
            console.log("Change to Student Dashboard");
            $state.go('home.studentDashboard');
        } else if (data.profileType == "landlord") {
                var landlord = {
                    "username": data.username
                }
                $propertyService.retrieveAllPropertyByUsername(landlord, function(err, status, data) {
                    if (!err) {
                        console.log(data);
                        if (data.length == 0) {
                            console.log("going to addProperty");
                            $state.go("home.addProperty");
                        } else {
                            console.log("it is going home");
                            $state.go("home.landlordDashboard");
                        }
                    } else {
                        $scope.alert("error retrieving properties");
                    }
                });
        }
        else {
            $scope.alert("Error retrieving user");
        }
    });

    $scope.menuSearchEnter = function() {
        console.log('change to search');
        $state.go('home.search');
    }

    $scope.logoutButton = function() {
        $sessionService.logout(cookie, function(err, status, data) {
            if (!err) {
                $scope.showPage = false;
                $state.go("start.login");
            }
        });
    };
}]);
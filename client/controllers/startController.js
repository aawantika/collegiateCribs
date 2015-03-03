var app = angular.module("startController", []);

app.controller('LoginController', ['$scope', '$sessionService', '$location', '$cookies', '$state', function($scope, $sessionService, $location, $cookies, $state) {
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
            $sessionService.loginUser(login, function(err, status, data) {
                if (!err) {
                    $cookies.username = data.username;
                    $cookies.sessionKey = data.sessionKey;
                    $state.go("home");
                }
            });
        }
    };
}]);

app.controller('EditAccountController', ['$scope', '$userService', '$state', '$stateParams', function($scope, $userService, $state, $stateParams) {
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
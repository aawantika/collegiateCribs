var app = angular.module("startController", []);

var server;

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

app.controller('LoginController', ['$scope', '$sessionService', '$propertyService', '$location', '$cookies', '$state', function($scope, $sessionService, $propertyService, $location, $cookies, $state) {
    $scope.alert = "";

    $scope.submitted = false;

    $scope.loginButton = function() {
        $scope.submitted = true

        server = {};
        var login = {
            "username": $scope.username,
            "password": $scope.password,
        }

        console.log($scope.username);

        $sessionService.loginUser(login, function(err, status, data) {
            if (!err) {
                console.log("profile type:" + data.profileType); 

                $cookies.username = data.username;
                $cookies.sessionKey = data.sessionKey;
                if (data.profileType == "landlord") {
                    var landlord = {
                        "username": data.username

                    }
                    $propertyService.retrieveAllPropertyByUsername(landlord, function(err,status,data) {
                        if (!err) {
                            if (data == null) 
                                console.log("going to addProperty"); 
                                $state.go("home.addProperty"); 
                            else 
                                                    console.log("123"); 

                                $state.go("home"); 
                        } 
                        else {
                            $scope.alert("error retrieving properties"); 
                        }
                    });
                } 
                else {
                    console.log("123"); 
                    $state.go("home");
                } 
        } else {
                if (err === 404) {
                    server.statusCode = status;
                    server.dataVal = data;
                    $scope.notFound = true;
                    $scope.alert = "ayy";
                }
        }
    });

    $scope.interacted = function(field) {
        return $scope.submitted || field.$dirty;
    };
    };
}]);

app.controller('SignupController', ['$scope', '$userService', '$state', '$stateParams', function($scope, $userService, $state, $stateParams) {
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

    // $scope.toLandlord = function() {
    //     //make a drop down for 1-10 properties
    //     console.log("change to Landlord");
    //     $state.go('start.signup.landlord');
    // };

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

        console.log($scope.user);

        console.log(newUser);
        if (!newUser.firstName || !newUser.lastName || !newUser.username || !newUser.password || !newUser.confirmPassword || !newUser.email) {
            $scope.alert = "Property fill in all required fields";
            return false;
        } else if (newUser.password != newUser.confirmPassword) {
            $scope.alert = "Password confirm does not match Password";
            return false;
        } else {
            $scope.alert = "submittable";
            console.log("HERE");
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
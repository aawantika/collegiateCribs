var app = angular.module("app", [
	'ngRoute',
	'login'
]);
//^ a JSON of the dependencies for app

var controllers= {};

app.controller('LoginController', ['$fake', function ($scope){
	$scope.alert = "";
	$scope.canSubmit = function(){
		if(!$scope.username||!$scope.password){
			$scope.alert="Please fill in all required fields";
			return false;
		}
		else{
			$scope.alert="all filled";
		}
	};
}]);

app.controller('EditAccountController', ['$scope', '$createUser', function ($scope,$createUser){
	$scope.alert="";
	$scope.passConAlert="";
	
	$scope.toStudent = function(){
		console.log("change to Student");
		var oldStudLord = document.getElementById("studLord");
		var newLabel= "<paper-input-decorator label='Campus' floatingLabel>";
		var newInput= "<input type=\"text\" ng-model=\"campus\"></paper-input-decorator>";
		oldStudLord.innerHTML = newLabel.concat(newInput);
	};
			
	$scope.toLandlord = function(){
		//make a drop down for 1-10 properties
		console.log("change to Landlord");
		var oldStudLord = document.getElementById("studLord");
		var newLabel=	"<h3>Property</h3>\n"
		var numBed=		"<paper-input-decorator label='Number of Bedrooms' floatingLabel> <input type=\"text\" ng-model=\"numBed\"></paper-input-decorator>\n"
		var numBath=	"<paper-input-decorator label='Number of Bathrooms' floatingLabel><input type=\"text\" ng-model=\"numBath\"></paper-input-decorator>\n"
		var houseType=	"<paper-input-decorator label='Housing Type' floatingLabel><input type=\"text\" ng-model=\"houseType\"></paper-input-decorator>\n"
		var addr=		"<paper-input-decorator label='Address' floatingLabel><input type=\"text\" ng-model=\"address\"></paper-input-decorator>\n"
		var avail=		"<paper-input-decorator label='Availability' floatingLabel><input type=\"text\" ng-model=\"avail\"></paper-input-decorator>\n"
		var price=		"<paper-input-decorator label='Pricing' floatingLabel><input type=\"text\" ng-model=\"price\"></paper-input-decorator>\n"
		var pets=		"<paper-input-decorator label='Pet Policy' floatingLabel><input type=\"text\" ng-model=\"pets\"></paper-input-decorator>\n"
		var newForm = newLabel.concat(numBed,numBath,houseType,addr,avail,price,pets);
		oldStudLord.innerHTML=newForm;
	};
	
	$scope.canSubmit = function(){
		var newUser = {
			"firstName":$scope.fname,
		 "lastName":$scope.lname,
		 "username":$scope.username,
		 "password":$scope.password,
		 "confirmPassword":$scope.passConfirm,
		 "email":$scope.email
		}
		 
		if(!newUser.firstName||!newUser.lastName||!newUser.username||!newUser.password||!newUser.confirmPassword||!newUser.email){
			$scope.alert="Please fill in all required fields";
			return false;
		} else if(newUser.password != newUser.confirmPassword){
			$scope.alert="Password confirm does not match Password";
			return false;
		}else{
			$scope.alert="submittable";
			$createUser.createUser(newUser, function(err, status, json) {
				console.log("ayylmao");
				console.log(status);
				console.log(json);
			});
		}
	};
	
	$scope.passMatch = function(){
		var pass = $scope.password;
		var passC= $scope.passConfirm;
		if((pass||passC) && pass!=passC){
			$scope.passConAlert="Password confirm doesn't match Password";
		}else{
			$scope.passConAlert="";
		}
	};
	
}]);
app.controller(controllers);
app.config(function ($routeProvider){
	$routeProvider.when('/',
	{
		controller: 'LoginController',
		templateUrl: '/client/html_pages/login.html'
	})
	.when('/signup',{
		controller: 'EditAccountController',
		templateUrl:'/client/html_pages/signup.html'
	})
	.otherwise({
		redirectTo: '/'
	});
})
.directive('head', ['$rootScope','$compile',
	function($rootScope, $compile){
		return {
			restrict: 'E',
			link: function(scope, elem){
				var html = '<link rel="stylesheet" ng-repeat="(routeCtrl, cssUrl) in routeStyles" ng-href="{{cssUrl}}" >';
				elem.append($compile(html)(scope));
                scope.routeStyles = {};
				$rootScope.$on('$routeChangeStart', function (e, next, current) {
					if(current && current.$$route && current.$$route.css){
						if(!Array.isArray(current.$$route.css)){
							current.$$route.css = [current.$$route.css];
						}
						angular.forEach(current.$$route.css, function(sheet){
							delete scope.routeStyles[sheet];
						});
					}
					if(next && next.$$route && next.$$route.css){
						if(!Array.isArray(next.$$route.css)){
							next.$$route.css = [next.$$route.css];
						}
						angular.forEach(next.$$route.css, function(sheet){
							scope.routeStyles[sheet] = sheet;
						});
					}
				});
			}
		};
	}
]);
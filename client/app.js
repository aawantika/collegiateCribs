var app = angular.module("app", [
	'ngRoute'
]);
//^ a JSON of the dependencies for app

var controllers= {};
controllers.LoginController = function ($scope){
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
};

controllers.EditAccountController = function ($scope){
	$scope.alert="";
	$scope.passConAlert="";
	
	$scope.toStudent = function(){
		console.log("change to Student");
		var oldStudLord = document.getElementById("studLord");
		var newLabel= "<label>Campus</label>\n";
		var newInput= "<input type=\"text\" ng-model=\"campus\">";
		oldStudLord.innerHTML = newLabel.concat(newInput);
	};
			
	$scope.toLandlord = function(){
		//make a drop down for 1-10 properties
		console.log("change to Landlord");
		var oldStudLord = document.getElementById("studLord");
		var newLabel=	"<h3>Property</h3>\n"
		var numBed=		"<div>Number of Bedrooms <input type=\"text\" ng-model=\"numBed\"></div>\n"
		var numBath=	"<div>Number of Bathrooms <input type=\"text\" ng-model=\"numBath\"></div>\n"
		var houseType=	"<div>Housing type <input type=\"text\" ng-model=\"houseType\"></div>\n"
		var addr=		"<div>Address <input type=\"text\" ng-model=\"address\"></div>\n"
		var avail=		"<div>Availability <input type=\"text\" ng-model=\"avail\"></div>\n"
		var price=		"<div>Pricing <input type=\"text\" ng-model=\"price\"></div>\n"
		var pets=		"<div>Pet Policy <input type=\"text\" ng-model=\"pets\"></div>\n"
		var newForm = newLabel.concat(numBed,numBath,houseType,addr,avail,price,pets);
		oldStudLord.innerHTML=newForm;
	};
	
	$scope.canSubmit = function(){
		var fname=$scope.fname;
		var lname=$scope.lname;
		var user =$scope.username;
		var pass =$scope.password;
		var passC=$scope.passConfirm;
		var email=$scope.email;
		if(!fname||!lname||!user||!pass||!passC||!email){
			$scope.alert="Please fill in all required fields";
			return false;
		} else if(pass != passC){
			$scope.alert="Password confirm does not match Password";
			return false;
		}else{
			$scope.alert="submittable";
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
	
};
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
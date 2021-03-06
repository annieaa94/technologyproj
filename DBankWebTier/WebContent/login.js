angular.module('app').controller("loginCtrl",
		['$scope', '$http', "LoginService", '$rootScope', function($scope, $http, LoginService, $rootScope) {
	
	$scope.dbConnection = "You are not connected to DB Server";
	$scope.connected = false;
	$scope.username={};
	$scope.username.text="";
	$scope.password={};
	$scope.password.text="";
	$scope.msg="";
	$scope.loggedIn = 0; //0 for false, 1 for true
	
		 $http.get("Connection")
		    .then(function(response) {
		    	
		    	
		    	if (response.data == "true") {
		    	
		    		$scope.connected = true;
		    		$scope.dbConnection = "You are connected to DB Server";
		    	} else {
		    		alert("not connected");
		    		$scope.connected = false;
		    		$scope.dbConnection = "You are not connected to DB Server";
		    		console.log(response);
		    	}
		    		
		    });
		
		 	$scope.login=function() {
		 		console.log("inside");
		 		$http({
		 			  method: 'GET',
		 			  url: 'LoginServlet',
		 			 params: {"username": $scope.username.text, "password": $scope.password.text}
		 			}).then(function successCallback(response) {
		 				console.log(response);
		 			   $scope.msg=response;
		 			   if (response.data === "Not a Valid Login Details") {
		 				   $scope.loggedIn = 0;
		 			   	   LoginService.setLoginStatus(0);
		 			   	   $rootScope.$broadcast('loginFail');
		 			   } else {
		 				   $scope.loggedIn = 1;
		 				  LoginService.setLoginStatus(1);
		 				  $rootScope.$broadcast('loginSuccess', $scope.username.text);
		 			   }
		 			  }, function errorCallback(response) {
		 				  console.log(response);
		 			    $scope.msg=response.data;
		 			  });
		 	}
		 	
		 	
}]);
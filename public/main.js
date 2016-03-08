angular.module('app')
	.controller('controllerOne', ['$scope', '$http', function($scope, $http){
		var s = $scope
		s.admin = function(){
			$http.get('/me')
				.then(function(serverData){
					if(!serverData.data.user){
						console.log('login sucka')
						window.location.href = 'http://localhost:3000/login'
					}
					else{
						window.location.href = 'http://localhost:3000/admin'
					}
				})
		}

	}])
angular.module('app')	
	.controller('adminController', ['$scope', '$http', function($scope, $http){
		var s = $scope
		s.logOut = function(){
			$http.get('/logout')
				.then(function(serverData){
					console.log("your'e outta here")
				})
		}
	}])
angular.module('app')	
	.controller('loginController', ['$scope', '$http', function($scope, $http){
		var s = $scope
		s.signUp = function(){
			console.log('signup', s.newUser)
			$http.post('/signUp', s.newUser)
				.then(function(serverData){
					
				})
		}	
		s.logIn = function(){
			$http.post('/login', s.user)
				.then(function(serverData){
					console.log(serverData.data)
				})
		}
	}])
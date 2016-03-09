angular.module('app')
	.controller('controllerOne', ['$scope', '$http', 'factory', function($scope, $http, factory){
		var s = $scope
		s.admin = function(){
			$http.get('/me')
				.then(function(serverData){
					console.log('verify function')
					console.log(serverData.data)
					if(!serverData.data.user){
						console.log('login sucka')
						window.location.href = 'http://localhost:3000/login'
					}
					else{
						console.log('your logged on')
						window.location.href = 'http://localhost:3000/admin'
					}
				})
		}

	}])
angular.module('app')	
	.controller('adminController', ['$scope', '$http', 'factory',  function($scope, $http, factory){
		console.log('admin yo')
		var s = $scope
		s.logOut = function(){
			$http.get('/logout')
				.then(function(serverData){
					console.log("your'e outta here")
				})
		}
		s.imgRemove = function(){
			$http.post('/imgremove')
				.then(function(serverData){
					console.log(serverData.data)
				})
		}
		s.submitBlog = function(){
			$http.post('/api/submitblog', s.entry)
				//.then(function(serverData.data){
				//	console.log(serverData.data)
				//	factory.blogArray.push(serverData.data)
				//	s.entry = {}
				//})
		}
	}])
angular.module('app')	
	.controller('loginController', ['$scope', '$http', 'factory', function($scope, $http, factory){
		var s = $scope
		s.signUp = function(){
			$http.post('/signUp', s.newUser)
				.then(function(serverData){
					console.log('verify function')
					if(!serverData.data.user){
						console.log('login sucka')
						window.location.href = 'http://localhost:3000/login'
					}
					else{
						console.log('your logged on')
						window.location.href = 'http://localhost:3000/admin'
					}
				})
		}	
		s.logIn = function(){
			$http.post('/logIn', s.user)
				.then(function(serverData){
					console.log('verify function', serverData.data)
					
					if(!serverData.data.user){
						console.log('login sucka')
						//window.location.href = 'http://localhost:3000/login'
					}
					else{
						console.log('your logged on')
						window.location.href = 'http://localhost:3000/admin'
					}
				})
		}
	}])

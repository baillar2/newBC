angular.module('app')
	.controller('controllerOne', ['$scope', '$http', 'factory', function($scope, $http, factory){
		var s = $scope
		$http.get('/api/blogContent')
			.then(function(serverData){
				factory.blogArray = serverData.data				
				s.blogArray = factory.blogArray.reverse()
			})
		$http.get('/api/imageContent')
			.then(function(serverData){
				factory.imageArray = serverData.data				
				s.imageArray = factory.imageArray
			})	
		s.admin = function(){
			$http.get('/me')
				.then(function(serverData){
					console.log('verify function')
					console.log(serverData.data)
					if(!serverData.data.user){
						console.log('login sucka')
						window.location.href = '/login'
					}
					else{
						console.log('your logged on')
						window.location.href = '/admin'
					}
				})
		}
		s.submitblog = function(){
			$http.post('/api/customer', s.cust)
				.then(function(serverData){

				})

		}
	}])
angular.module('app')	
	.controller('adminController', ['$scope', '$http', 'factory',  function($scope, $http, factory){
		var s = $scope
		$http.get('/api/blogContent')
			.then(function(serverData){
				factory.blogArray = serverData.data				
				s.blogArray = factory.blogArray.reverse()
			})
		$http.get('/api/imageContent')
			.then(function(serverData){
				factory.imageArray = serverData.data				
				s.imageArray = factory.imageArray
			})	
		s.logOut = function(){
			$http.get('/logout')	
		}
		s.imgRemove = function(){
			$http.post('/imgremove')
				.then(function(serverData){
					console.log(serverData.data)
					$http.get('/api/imageContent')
						.then(function(serverData){
							factory.imageArray = serverData.data				
							s.imageArray = factory.imageArray
						})	
				})
		}
		s.submitBlog = function(){
			$http.post('/api/submitblog', s.entry)
				.then(function(serverData){
					factory.blogArray.push(serverData.data)
					s.blogArray = factory.blogArray.reverse()
				})
		}
		s.blogRemove = function(){
			$http.post('/blogremove')
				.then(function(serverData){
					console.log(serverData.data)
					$http.get('/api/blogContent')
						.then(function(serverData){
							factory.blogArray = serverData.data				
							s.blogArray = factory.blogArray.reverse()
							})
				})
		}		
	}])
angular.module('app')	
	.controller('loginController', ['$scope', '$http', 'factory', function($scope, $http, factory){
		var s = $scope
		s.signUp = function(){
			$http.post('/signUp', s.newUser)
				.then(function(serverData){
					console.log('verify function')
					if(!serverData.data.success){
						console.log('login sucka')
						window.location.href = '/login'
					}
					else{
						console.log('your logged on')
						window.location.href = '/admin'
					}
				})
		}	
		s.logIn = function(){
			$http.post('/logIn', s.user)
				.then(function(serverData){
					console.log('verify function', serverData.data)
					
					if(!serverData.data.success){
						console.log('login sucka')
						window.location.href = '/login'
					}
					else{
						console.log('your logged on')
						window.location.href = '/admin'
					}
				})
		}
	}])

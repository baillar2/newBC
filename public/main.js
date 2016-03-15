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
		s.submitCust = function(){
			$http.post('/api/customer', s.cust)				
				.then(function(serverData){
					console.log('then statement')
					if(serverData.data){
						$('#emailmodal').modal()
						console.log(serverData.data)
					}
				})
		}		
	}])
angular.module('app')	
	.controller('adminController', ['$scope', '$http', 'factory', 'Upload', function($scope, $http, factory, Upload){
		var s = $scope
		s.image = {}
		s.entry = {}
		s.resizeCheck = function(image, width, height){
			return width > 800 || height > 400
		}

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
		$http.get('/api/clientContent')
			.then(function(serverData){
				factory.clientArray = serverData.data				
				s.clientArray = factory.clientArray
			})
		s.submitImage = function(){
			var uploader = Upload.upload({
				url: '/api/image',
				data : {
					file : s.image
				}
			})	
			uploader.then(function(serverData){
				console.log(serverData)
				factory.imageArray.push(serverData.data)
				s.imageArray = factory.imageArray
			})
		}
		
		s.logOut = function(){
			$http.get('/logout')	
		}
		s.imgRemove = function(photo){
			$http.post('/api/imgremove', photo)
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
			console.log(s.entry)
			var uploader = Upload.upload({
								url:'/api/submitblog',
								data: {
									file: s.entry.file.file,
									data: s.entry
								}
							})
			uploader.then(function(serverData){
				factory.blogArray.push(serverData.data)
				s.blogArray = factory.blogArray
			})
			
		}
		s.blogRemove = function(post){
			$http.post('/blogremove', post)
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

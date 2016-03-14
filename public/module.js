angular.module('app', ['ngRoute', 'ngFileUpload'])
	
	.config(function($routeProvider){
		$routeProvider
			.when('/', {
				templateUrl : './partials/about.html',
			})
			.when('/about', {
				templateUrl: './partials/about.html'
			})
			.when('/contact', {
				templateUrl: './partials/contact.html',
				controller: 'controllerOne'
			})
			.when('/blog', {
				templateUrl: './partials/blog.html'
			})
			.when('/services',{
				templateUrl: './partials/services.html'
			})
			.when('/home', {
				templateUrl: './partials/adminblog.html',
				controller: 'adminController'
			})
			.when('/adminBlog',{
				templateUrl: './partials/adminblog.html', 
				controller: 'adminController'
			})
			.when('/adminImage',{
				templateUrl: './partials/adminImage.html',
				controller: 'adminController'
			})
			.when('/adminclient',{
				templateUrl: './partials/adminclient.html'
			})
			.otherwise({
				templateUrl: './partials/about.html'
			})
	})
angular.module('app')
	.factory('factory', [function(){
		
		blogArray = []
		imageArray = []
		clientArray = []
		
		verify = function(serverData){
				console.log('verify function')
				if(!serverData.data.user){
					console.log('login sucka')
					window.location.href = '/login'
				}
				else{
					window.location.href = '/admin/home'
				}
				
		}
		return {
			blogArray : blogArray,
			imageArray : imageArray, 
			clientArray : clientArray,
			verify : verify
		}
	}])
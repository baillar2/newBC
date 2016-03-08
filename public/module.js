angular.module('app', ['ngRoute'])
	
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
			.when('/adminBlog',{
				templateUrl: './partials/adminblog.html'
			})
			.when('/adminImage',{
				templateUrl: './partials/adminImage.html'
			})
	})
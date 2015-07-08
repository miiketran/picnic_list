var myApp = angular.module("myApp",['ngRoute']);
myApp.config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: './../partials/dashboard.html'
    })
    .when('/new', {
      templateUrl: './../partials/new.html'
    })
    .when('/:id/show', {
      templateUrl: './../partials/show.html'
    })
    .when('/:id/edit', {
      templateUrl: './../partials/edit.html'
    })
    .otherwise({
      redirectTo: '/'
    })
});
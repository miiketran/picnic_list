var myApp = angular.module("myApp",['ngRoute']);
myApp.config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: './../partials/welcome.html'
    })
    .when('/questions', {
      templateUrl: './../partials/questions.html'
    })
    .when('/new_question', {
      templateUrl: './../partials/new_question.html'
    })
    .when('/question/:id', {
      templateUrl: './../partials/profile.html'
    })
    .when('/question/:id/new_answer', {
      templateUrl: './../partials/new_answer.html'
    })
    .otherwise({
      redirectTo: '/questions'
    })
});
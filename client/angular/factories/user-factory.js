myApp.factory('userFactory', function($http){
  var user;
  var factory = {};

  factory.getUser = function(callback){
    $http.get('/user').success(function(output){
      user = output;
      callback(user);
    })
  }
  return factory;

});

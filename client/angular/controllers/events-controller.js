myApp.controller('eventsController', function($scope, eventFactory, userFactory, $routeParams){
	$scope.events = []; 
	$scope.items = [];
	$scope.id = $routeParams.id;
	// $scope.newEvent.title = $scope.events[id].title;
	updateEvents();
  getUser();
  function getUser(){
    userFactory.getUser(function(output){
    	console.log($scope.user);
      $scope.user = output;
    })
  }

	function updateEvents(){
		eventFactory.getEvents(function(output){
			$scope.events = output;
		})
	}
	
	$scope.addItem = function(){
		$scope.items.push({
			name: $scope.newItem.name,
			quantity: $scope.newItem.quantity
		});

		$scope.newItem.quantity = "";
		$scope.newItem.name = "";
	}

	$scope.addItem2 = function(id){
		$scope.events[id].items.push({
			name: $scope.newItem.name,
			quantity: $scope.newItem.quantity
		});

		$scope.newItem.quantity = "";
		$scope.newItem.name = "";
	}

	$scope.addEvent = function(items){
		$scope.newEvent.items = items;
		eventFactory.addEvent($scope.newEvent, function(output){
			updateEvents();
			$scope.newEvent = {};
		})
	}

	$scope.updateEvent = function(id){

		var newEvent = {
			title: $scope.events[id].title,
			description: $scope.events[id].description,
			date: $scope.events[id].date,
			time: $scope.events[id].time,
			_id: $scope.events[id]._id,
			items: $scope.events[id].items
		}
		console.log(newEvent);
		eventFactory.updateEvent(newEvent, function(output){
			updateEvents();
			newEvent = {};
		})
	}

	$scope.removeItem = function(index){

	}
})
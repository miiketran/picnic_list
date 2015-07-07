myApp.controller('eventsController', function($scope, eventFactory, $routeParams){
	$scope.events = []; 
	$scope.items = [];
	$scope.id = $routeParams.id;

	updateEvents();

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
		$scope.newEvent._id = $scope.events[id]._id; 
		$scope.newEvent.items = $scope.events[id].items;
		eventFactory.updateEvent($scope.newEvent, function(output){
			updateEvents();
			$scope.newEvent = {};
		})
	}

	$scope.removeItem = function(index){

	}
})
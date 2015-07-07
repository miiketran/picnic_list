myApp.controller('showController', function($scope, eventFactory, $routeParams, $timeout){
	$scope.events = []; 
	$scope.items = [];
	$scope.id = $routeParams.id;
	$scope.itemClaim = {};

	updateEvents();

	$scope.turnOn = function(item){
		for (var i in $scope.events[$scope.id].items){
			if ($scope.events[$scope.id].items[i].name == item){
				$scope.events[$scope.id].items[i].truth = true;
			}
		};
	}

	$scope.claimItem = function(item){
		for (var i in $scope.events[$scope.id].items){
			if ($scope.events[$scope.id].items[i].name == item){
				if (typeof $scope.events[$scope.id].items[i].claims == 'undefined'){
					$scope.events[$scope.id].items[i].claims = [];
				}
				$scope.events[$scope.id].items[i].claims.push($scope.itemClaim);
				$scope.events[$scope.id].items[i].truth = false;
				$scope.itemClaim = {};
			}
		}
	}

	function addItemArray(){
		console.log($scope.events);
		for (var i in $scope.events[$scope.id].items){
			var itemArray = [];
			for (var j=1; j < $scope.events[$scope.id].items[i].quantity+1; j++){
				itemArray.push(j);
			}
			$scope.events[$scope.id].items[i].itemArray = itemArray;
		}
	}

	function updateEvents(){
		eventFactory.getEvents(function(output){
			$scope.events = output;
			addItemArray()
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
		$scope.newEvent.items = $scope.events[id].items;
		eventFactory.updateEvent($scope.newEvent, function(output){
			updateEvents();
			$scope.newEvent = {};
		})
	}

	$scope.removeItem = function(index){

	}
})
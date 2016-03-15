hqbase.controller('HqController', 
		function($scope, $http){

			$http.get('/api/roteiristas').then(function(response){
				$scope.roteiristas = response.data;
			});

			$http.get('/api/desenhistas').then(function(response){
				$scope.desenhistas = response.data;
			});

			$http.get('/api/selos').then(function(response){
				$scope.selos = response.data;
			});
		});

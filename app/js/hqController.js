hqbase.controller('HqController', 
		function($scope, $http){

			$scope.hq = {}
			$http.get('/api/roteiristas').then(function(response){
				$scope.roteiristas = response.data;
			});

			$http.get('/api/desenhistas').then(function(response){
				$scope.desenhistas = response.data;
			});

			$http.get('/api/selos').then(function(response){
				$scope.selos = response.data;
			});

			var url = "/api/hq",
			method = "POST"

			$scope.submit = function () {
				$.ajax({
					url : url,
					method : method,
					data : new FormData($('form')[0]),
					processData : false,
					contentType : false
				});
			};
		});

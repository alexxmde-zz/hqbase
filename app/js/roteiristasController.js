hqbase.controller("RoteiristasController",
		function($scope, $http) {
			$http.get('/api/roteiristas')
				.then(function(response){
					$scope.roteiristas = response.data;

				});
		});

hqbase.controller("RoteiristaController",
		function($scope, $http, $routeParams, $location){

			var uri = "/api/roteirista";
			var method = "POST";

			if ($routeParams.nome) {
				uri = encodeURI("/api/roteirista/" + $routeParams.nome);
				method = "PUT";

				$http.get('/api/roteirista/' + $routeParams.nome)
					.then(function(response){
						$scope.roteirista = response.data;
						console.log($scope.roteirista);

					});
			}

			$scope.submit = function(){
				$.ajax({
					url: uri,
					type: method,
					data : new FormData($('form')[0]),
					processData: false,
					contentType: false
				});

				$location.url('/roteiristas');
			};
		});

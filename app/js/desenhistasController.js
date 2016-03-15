hqbase.controller('DesenhistasController', 
		function ($scope, $http) {
			$http.get('/api/desenhistas').then(function(response){
				$scope.desenhistas = response.data;
			})
		


});


hqbase.controller('DesenhistaController', 
		function($scope, $http, $routeParams, $location) {

			var uri = "/api/desenhista",
			method = "POST";
			
			if ($routeParams.nome) {
				uri = encodeURI("/api/desenhista/" + $routeParams.nome);
				method = "PUT";

				$http.get(uri).then(function(response){
					$scope.desenhista = response.data;
				})			

			}

				$scope.submit = function () {
					$.ajax({
						url: uri,
						method: method,
						data: new FormData($('form')[0]),
					processData: false,
					contentType: false
				});
			};

	
});

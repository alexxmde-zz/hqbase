hqbase.controller('SelosController',
		function($scope, $http) {

			$http.get('/api/selos')
				.then(function(response) {
					$scope.selos = response.data;
					console.log(response.data);
				});

		});

hqbase.controller('SeloController', 
		function($scope, $http, $routeParams) {

			var method = "POST",
				url = "/api/selo";

			//Se há parametro, é PUT
			if ($routeParams.nome) {
				$http.get('/api/selos/' + $routeParams.nome)
					.then(function(response) {
						$scope.selo = response.data;
						method = "PUT";
						url = "/api/selo/" + $routeParams.nome;

					}); //$http.get
			}//if

			$scope.submit = function() {
				$.ajax({
					url: url,
					type: method,
					data: new FormData($('form')[0]),
					processData: false,
					contentType: false
				});
			};
		});



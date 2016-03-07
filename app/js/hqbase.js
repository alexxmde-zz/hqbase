var hqbase = angular.module('hqbase', ['ngRoute']);

//Routes
hqbase.config(['$routeProvider', 
	function($routeProvider){
		$routeProvider.when('/selos', {
			templateUrl: 'partials/selos.html',
			controller: 'SelosController'
		
		})
		.when('/selo/:nome', {
			templateUrl: 'partials/selo.html',
			controller: 'SeloController'
		})
		.when('/selo', {
			templateUrl: 'partials/selo.html',
			controller: 'SeloController'
		})
		.otherwise({
			redirectTo: '/selos'
		});
			
	}
]);

//Controllers
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
			}
		});



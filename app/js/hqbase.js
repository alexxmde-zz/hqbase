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
			$scope.selo = {nome: "DC"};
			if ($routeParams.nome) {

				$http.get('/api/selos/' + $routeParams.nome)
					.then(function(response) {
						$scope.selo = response.data;
					});
			}//if

		});



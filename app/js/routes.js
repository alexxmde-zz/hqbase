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



		.when('/roteiristas', {
			templateUrl: 'partials/roteiristas.html',
			controller: 'RoteiristasController'
		
		})

		.when('/roteirista', {
			templateUrl: 'partials/roteirista.html',
			controller: 'RoteiristaController'
		})

		.when('/roteirista/:nome', {
			templateUrl: 'partials/roteirista.html',
			controller: 'RoteiristaController'
		})
		.otherwise({
			redirectTo: '/selos'
		});
			
	}
]);



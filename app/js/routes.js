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

//Roteiristas

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
	

//Desenhistas

		.when('/desenhistas', {
			templateUrl: 'partials/desenhistas.html',
			controller: 'DesenhistasController'
		})

		.when('/desenhista/:nome', {
			templateUrl: 'partials/desenhista.html',
			controller: 'DesenhistaController'
		})

		.when('/desenhista', {
			templateUrl: 'partials/desenhista.html',
			controller: 'DesenhistaController'
		})
		
		//HQs
		.when('/hq', {
			templateUrl: 'partials/hq.html',
			controller: 'HqController'
		})

		.when('/hqs', {
			templateUrl : 'partials/hqs.html',
			controller : 'HqsController'
		})

		.when('/hq/:id', {
			templateUrl: 'partials/hq.html',
			controller : 'HqController'
		})

		.otherwise({
			redirectTo: '/selos'
		});
			
	}
]);



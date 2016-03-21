hqbase.controller('HqController', 
		function($scope, $http, $routeParams){

			$scope.hq = {};
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
			method = "POST";

			if($routeParams.id){
				$http.get(`/api/hq/${$routeParams.id}`).then(function(response){
					$scope.hq = response.data;
					console.log(response.data);
				});

			}

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


hqbase.controller('HqsController', 
		function($scope, $http){
			$http.get('/api/hqs').then(function(response){
				$scope.hqs = response.data;
			});
		});


hqbase.directive('linkMany', function(){
	return {
		restrict: 'E',
		scope : {
			entities : '=',
			domain : '='

		},

		templateUrl : 'partials/directives/link-many.html',
		link : function(scope) {
			for(let e of scope.entities) {
				let arrWords = e.nome.split(" ");
				e.sobrenome = arrWords[arrWords.length - 1];

				//Se não for o ultimo elemento, adiciona virgula.
				if (e !== scope.entities[scope.entities.length - 1]) {
					e.sobrenome += ', ';
				}


			}
		}

	};


});

hqbase.directive('hqbMultiSelect', function(){
	return {
		restrict: 'E',
		scope: {
			options : '=',
			chosens : '=',
			bind : '='
		},

		templateUrl : 'partials/directives/hqb-multi-select.html',
		link : function(scope){
			scope.addToMulti = function(e){
				e.preventDefault();
				var selectFrom = e.target.parentElement.children[0].options;
				var selectTo = e.target.parentElement.children[3];
				var selected = [];
				for(let o of selectFrom){
					if(o.selected)
						selectTo.appendChild(o);
				}
			};

			scope.removeFromMulti = function(e){
				e.preventDefault();
				var selectFrom = e.target.parentElement.children[3].options;
				var selectTo = e.target.parentElement.children[0];
				
				for(let o of selectFrom){
					if(o.selected)
						selectTo.appendChild(o);
					
				}
			};
		
		}
	};
});

























































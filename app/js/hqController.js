hqbase.controller('HqController', 
		function($scope, $http, $routeParams, $location){

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
				});

				url = `/api/hq/${$routeParams.id}`;
				method = "PUT";

			}

			$scope.submit = function () {
				
				var fd = new FormData($('form')[0]),
				selectRoteiristas = document.getElementById("roteiristasSelected").options,
				selectDesenhistas = document.getElementById("desenhistasSelected").options,

				roteiristasArr = [], desenhistasArr = [];

				for(let o of selectRoteiristas){
					//roteiristasArr.push(o.value);
					fd.append("roteiristas[]", o.value);
				}

				for(let o of selectDesenhistas){
					//desenhistasArr.push(o.value);
					fd.append("desenhistas[]", o.value);
				}


				$.ajax({
					url : url,
					method : method,
					data : fd,
					processData : false,
					contentType : false
				});

				$location.url("/hqs");
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


/*
 * Diretiva para montar dois selects multiples
 * lado a lado, o primeiro com os valores disponíves
 * e o segundo com os valores selecionados, amarrados
 * ao model.
 * */
hqbase.directive('hqbMultiSelect', function(){

	return {
		restrict: 'E',
		scope: {
			options : '=', //Valores disponíveis.
			chosens : '=', //Valores selecionados.
			nm : '@'
		},

		templateUrl : 'partials/directives/hqb-multi-select.html',

		link : function(scope){

			scope.$watch(
					function(){return scope.chosens;},
					function(newVal, oldVal){
						if(newVal){
							for(let c of scope.chosens){

								for(let o in scope.options){

									if(c._id === scope.options[o]._id){

										scope.options.splice(o, 1);
									}
								}
							}

						}
					});
				/* Primeiro, removemos das opções os valores já selecionados.*/
				if(scope.chosens){

				}

					/*
					 * Função ativada no click do botão de transferir
					 * valores do select da esquerda para select da direita.
					 */
			scope.addToMulti = function(e){
				e.preventDefault();

				//Obtem os selects.

				var selectFrom = document.getElementById(scope.nm + "Source");
				var selectTo = document.getElementById(scope.nm + "Selected")
					console.log(selectFrom);

				//Transfere os valores selecionados.
				for(let o of selectFrom){
					if(o.selected)
						selectTo.appendChild(o);
				}
			};

			/* 
			 * Função ativada no click do botão de transferir de volta
			 * valores do select da direita para a esquerda
			 */

			scope.removeFromMulti = function(e){
				e.preventDefault();

				//Obtem os selects.
				var selectFrom = document.getElementById(scope.nm + "Selected");
				var selectTo = document.getElementById(scope.nm + "Source");

				//Transfere os valores selecionados.
				for(let o of selectFrom){
					if(o.selected)
						selectTo.appendChild(o);
				}
			};

		}
	};
});

























































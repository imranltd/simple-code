(function(){

	angular
		.module('simpleCodeApp', [])
		.service('getColorsService', function($http) {
			return $http.get("data/data.json")
				.then(function(res){
					return res.data;
			});
		})
		.controller('simpleCodeController', ['$scope', 'getColorsService',
			function($scope, getColorsService) {
				var vm = this;

				getColorsService.then(function(data){
					console.log(data.colors);
					vm.colors = data.colors;
				});
			}
			
		])

		.directive('simpleButtons', function() {
			return {
				restrict: 'E',
				templateUrl: 'templates/simple-buttons.html'
			};
		});
		
}());
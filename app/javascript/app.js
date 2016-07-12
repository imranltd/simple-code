(function(){

	angular
		.module('starwarsApp', [])
		.controller('starwarsController', ['$scope',
			function($scope) {
				
			}
			
		])

		.directive('starwarsSearch', function() {
			return {
				restrict: 'E',
				templateUrl: 'templates/starwars-search.html'
			};
		});
		
}());
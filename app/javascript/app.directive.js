angular
	.module('MySimpleCodeAppDirective',[])
	.directive('simpleButtons', function(){
	return {
		restrict: 'E',
		templateUrl: 'templates/simple-buttons.html'
	};
});
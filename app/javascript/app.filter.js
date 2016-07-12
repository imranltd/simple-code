angular
	.module('simpleCodeAppFilter', ['ngSanitize'])
	.filter("sanitize", ['$sce', function($sce) {
  		return function(htmlCode){
    		return $sce.trustAsHtml(htmlCode);
  		};
  	}]);
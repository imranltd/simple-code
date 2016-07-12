angular.module('MySimpleCodeAppService', [])
	.service('MySimpleService', function($http, $webSql){
		this.getColor = function() {
			return $http.get("data/data.json")
			.then(function(res){
				return res.data;
			});
		};
	});
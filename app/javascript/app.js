(function(){

	angular
		.module('simpleCodeApp', ['ngSQLite'])
		.constant('DB_CONFIG', {
			newDB: {
				//id: key,
				name: { type: 'text', null: false },
				email: { type: 'text' },
				id_zone: { type: 'integer' }
			},
			zone: {
				id: 'key',
				name: { type: 'text', null: false }
			}
		})
 
		.run(function ($SQLite) {
			$SQLite.dbConfig({
				name: 'my-browser-db',
				description: 'Test DB',
				version: '1.0'
			});
		})
 
		.run(function ($SQLite, DB_CONFIG) {
			$SQLite.init(function (init) {
				angular.forEach(DB_CONFIG, function (config, name) {
					init.step();
					$SQLite.createTable(name, config).then(init.done);
				});
				init.finish();
			});
		})

		.factory('exampleClient', function ($SQLite) {
  			/*$SQLite.ready(function () { // The DB is created and prepared async. 
				this.selectAll(o.sql, o.params)
				.then(o.onEmpty, o.onError,
					function (result) {
						if (angular.isFunction(o.onResult)) o.onResult.apply(this, [ result.rows, result.count, result.result ]);
					}
				);
			});

			var clientID = 1;
			$SQLite.ready(function () { // The DB is created and prepared async. 
				this
					.selectFirst('SELECT * FROM client', [ clientID ])
					.then(
						//function () { console.log('Empty Result!'); },
						//function () { console.err('Error!'); },
						function (data) {
							console.log('54');
							console.dir(data);
							// Result! 
							// data.item 
							// data.count 
							// data.result 
						}
				);
			});
 
			var newClientData = {
				name: 'Eduardo Daniel Cuomo',
				email: 'eduardo.cuomo.ar@gmail.com',
				id_zone: 123
			};
	
			$SQLite.ready(function () {
				this.insert('client', newClientData) // this.replace 
				//.then(onResult, onError) 
			});
 
			$SQLite.ready(function () {
				this.execute('UPDATE zone SET name = ? WHERE id = ?', [ 'foo', 123 ])
				//.then(onFinish, onError) 
			});*/
		})

		.service('getColorsService', function($http) {
			return $http.get("data/data.json")
				.then(function(res){
					return res.data;
			});
		})
		.controller('simpleCodeController', ['$scope', 'getColorsService', '$SQLite',
			function($scope, getColorsService, $SQLite) {
				var vm = this;

				getColorsService.then(function(data){
					console.log(data.colors);
					vm.colors = data.colors;
				});

				var newClientData = {
				name: 'Imran',
				email: 'Sarwar',
				id_zone: 123
			};
	
			/*$SQLite.ready(function () {
				this.insert('newDB', newClientData) // this.replace 
				//.then(onResult, onError) 
			});*/

			/*var clientID = 1;*/
			$SQLite.ready(function () { // The DB is created and prepared async. 
				this.selectFirst('SELECT * FROM newDB WHERE name ="Imran"', [0])
				.then(function(data){data.result});

				function myFun(data){
					console.log(data);
				}
					//.then(
						//function () { console.log('Empty Result!'); },
						//function () { console.err('Error!'); },
						/*function (data) {
							console.log('115');
							console.dir(data);
							// Result! 
							// data.item 
							// data.count 
							// data.result 
						}*/
						//console.log('dd')
						//console.log(d);
				//);
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
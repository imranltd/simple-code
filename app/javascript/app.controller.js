angular
	.module('MySimpleCodeApp', 
				['angular-websql',
				 'MySimpleCodeAppService',
				 'simpleCodeAppFilter',
				 'MySimpleCodeAppDirective'])
	.controller('simpleCodeController', simpleCodeController);

function simpleCodeController($scope, MySimpleService, $webSql, $sce) {
	var vm = this,
		myDB = $webSql.openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);

	var activate = function(){
		vm.clearDB = clearDB;
		vm.showMessage = showMessage;
		getDataFromJSON();

	};

	var getDataFromJSON = function(){
		MySimpleService.getColor()
			.then(function(data){
				vm.colors = data.colors;
			})
		.then(createDatabase)
		.then(insertIntoDatabase);
	};

	var createDatabase = function(){
		myDB.createTable('colors', {
		  "color":{
		    "type": "TEXT",
		    "null": "NOT NULL"
		  },
		  "message":{
		    "type": "TEXT",
		    "null": "NULL"
		  },
		  "value": {
		    "type": "TEXT",
		    "null": "NOT NULL"
		  }
		});

	};

	var insertIntoDatabase = function() {
		myDB.selectAll('colors')
		.then(function(entries){
			if(entries.rows.length<7) {
				angular.forEach(vm.colors, function(value, key) {
					myDB.insert('colors', {
						"color": value.color,
						"message": value.message, 
						'value': value.value })
					.then(function(results) {
	  					console.dir(results);
					});
				});
			} else {
				console.log('data already in DB. Avoid adding duplicates.  Clear DB and refresh page'); 
			}
		});
	};

	var clearDB = function(){
		console.log('clearing tables');
		myDB.dropTable('colors');
	};

	var showMessage = function(color){
			myDB.select('colors', 
				{
					'color': color.color
				}
			)
			.then(function(results) {
				vm.message = [];

				for(i=0; i < results.rows.length; i++){

					if((results.rows.item(i).message) && 
					   (results.rows.item(i).message!='undefined')){
						vm.message.push(results.rows.item(i).message);
					} else{
						vm.message = ['We are <strong>SORRY</strong> there'+
							' are no messages for '+results.rows.item(i).color];
					}
				}
			});
	};

	activate();
}
var appSignup = angular.module("Signup", ["onsen"]);

appSignup.controller('signup_form', ['$scope', function($scope) {
	$scope.name = "";
	$scope.surname = "";
	$scope.tel = "";
	$scope.mail = "";
	$scope.pass = "";
	$scope.confirm_form = function(name, surname, tel, mail, password)
	{
		//TODO check password
		externalDB.add_user(name, surname, mail, tel, password,
			function()
			{
				console.log("%caccount successfully created", "color : green; font-style : italic");
				//TODO
			},
			function(err)
			{
				console.log("%cerror while creating account", "color : red;");
				console.log(err);
			});
	};
}]);


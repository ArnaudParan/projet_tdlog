var appSignup = angular.module("Signup", ["onsen"]);

appSignup.controller('signup_form', ['$scope', function($scope) {
	$scope.name = "";
	$scope.surname = "";
	$scope.tel = "";
	$scope.mail = "";
	$scope.pass = "";
	$scope.has_signed_up = false;
	$scope.sign_up_valid = false;
	$scope.confirm_form = function(name, surname, tel, mail, password)
	{
		//TODO check password
		externalDB.add_user(name, surname, mail, tel, password,
			function()
			{
				console.log("%caccount successfully created", "color : green; font-style : italic");
				$scope.sign_up_valid = true;
			},
			function(err)
			{
				console.log("%cerror while creating account", "color : red;");
				console.log(err);
			});
		$scope.has_signed_up = true;
	};
}]);


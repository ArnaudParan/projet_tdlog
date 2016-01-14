var appLogin = angular.module("Login", ["onsen"]);

appLogin.controller('login_form', ['$scope', function($scope) {
	$scope.mail = "";
	$scope.pass = "";
	$scope.confirm_log = function(mail, password){
		try {
			login_attempt(mail, password);
			//passer à la page suivante
		} catch(err) {
			alert(err.toString());
		}
	};
}]);

var login_attempt = function(mail, password)
{
	var mailIsCoherent = is_mail(mail);

	if (mailIsCoherent) {
		if (externalDB.log_user(mail, password)){
			console.log("connection attempt is successful");
			user_mail = mail;
			user_password = password;
			localDB.set_user_mail_pass(mail, password);
		}
		else {
			throw new CommonException(1000);
		}
	}
	else {
		throw new CommonException(2001);
	}
}

function is_mail(mail)
{
	var reg = new RegExp('^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$', 'i');

	if(reg.test(mail))
	{
		return true;
	}
	else
	{
		return false;
	}
}

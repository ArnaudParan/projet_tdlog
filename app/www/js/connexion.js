var appLogin = angular.module("Login", ["onsen"]);

appLogin.controller('login_form', ['$scope', function($scope) {
	$scope.mail = "";
	$scope.pass = "";
	$scope.confirm_log = function(mail, password){
		login_attempt(mail, password, function()
			{
				//passer à la page suivante
			});
	};
}]);

var login_attempt = function(mail, password, successCB, errorCB)
{
	errorCB = convertErrorCB(errorCB);
	var mailIsCoherent = is_mail(mail);

	if (mailIsCoherent) {
		externalDB.log_user(mail, password, function()
				{
					console.log("%clogin attempt is successful", "color : green; font-style : italic");
					user_mail = mail;
					user_password = password;
					localDB.set_user_mail_pass(mail, password);
					successCB();
				},
				errorCB);
	}
	else {
		errorCB(new CommonException(2001));
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

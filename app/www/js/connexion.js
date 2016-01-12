function login_attempt(mail, password, login_request_function)
{
	var mailIsCoherent = is_mail(mail);

	if (mailIsCoherent) {
		login_request_function(mail, password);
		user_mail = mail;
		user_password = password;
	}
	else {
		throw new CommonException(2001);
	}
}

//TODO not tested yet, server requiered
function send_login_request(mail, password)
{
	var response = $http({
		method: "POST",
	    	url: server_address + "/login/",
	    	data: {"mail": mail, "password": password},
	    	headers: {"Content-Type": "application/x-www-form-urlencoded"}
	});
	if (response != "success") { //TODO or whatever means success
		throw new CommonException(1000);
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

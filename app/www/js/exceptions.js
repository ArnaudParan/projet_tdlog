//Exception types like 1[0-9]{3} correspond to exceptions where the data expected from the server is not here
//Exception types like 2[0-9]{3} correspond to wrong user entries

var code_to_message = {
	1000 : "Incorrect mail or password in login attempt.",
	1001 : "You have tried to add one user which already exists.",
	1002 : "You've tried to create a new user with an incorrect tel or mail",
	1003 : "The user you've searched doesn't exist",
	1004 : "Unable to create the event",
	2001 : "Not an email while an email was requiered",
	2000 : "Unable to create the user database"
	};

function GeneralException(code, message)
{
	this.code = code;
	this.message = message;
}

GeneralException.prototype.code;
GeneralException.prototype.message;
GeneralException.prototype.toString = function()
{
	return "ERR_CODE: " + this.code +" \n" + this.message;
};

function CommonException(code)
{
	var message = code_to_message[code];
	GeneralException.call(this, code, message);
}

CommonException.prototype = new GeneralException();

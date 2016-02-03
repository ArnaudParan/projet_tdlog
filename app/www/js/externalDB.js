var externalDBHandler = function()
{
	this.server_address = "http://localhost:8080/";
}

//TODO not tested yet
externalDBHandler.prototype.log_user = function(mail, pass, successCB, errorCB)
{
	errorCB = convertErrorCB(errorCB);

	var params = "email=" + mail + "&mdp_hashe=" + pass;
	var reqPage = server_address + "";
	var req = new XMLHttpRequest();
	req.open("GET", reqPage + "?" + params, true); 
	req.onreadystatechange = stateChange;
	req.send(null); 
	function stateChange() 
	{ 
		if (req.readyState == 4 && req.status == 200) { 
			querySuccess(req.responseText);
		}
		else if (req.readyState == 4) {
			error("Error with the server : " + req.status); //TODO create exception
		}
	}

	function querySuccess(result)
	{
			var parsedResponse = JSON.parse(result); 
			if(parsedResponse.resultat == "fail") {
				console.log(parsedResponse.message_erreur);
				errorCB(new CommonException(parsedResponse.error));
			}
			else if (parsedResponse.resultat == "success") {
				successCB();
			}
			else {
				errorCB("erreur, requete ne renvoie ni success ni error"); //TODO create exception
			}
	}

	function error(err)
	{
		errorCB(err);
	}
}

//TODO replace with the actual code
externalDBHandler.prototype.log_user = function(mail, password, successCB, errorCB)
{

	errorCB = convertErrorCB(errorCB);
	successCB = convertSuccessCB(successCB);
	for (user of this.users) {
		if(user.mail == mail && user.password == password){
			successCB();
			return;
		}
	}
	errorCB(new CommonException(1000));
}

//TODO replace with the actual code
externalDBHandler.prototype.create_event = function(mail, password, event_name, addr, latitude, longitude, participantsId, date, successCB, errorCB)
{
	errorCB = convertErrorCB(errorCB);
	successCB = convertSuccessCB(successCB);
	var db_this = this;
	this.log_user(mail,
			password,
			function search_owner()
			{
				db_this.get_user_id(mail,
					function push_event(owner)
					{
						db_this.eventId++;
						var evt = new mock.external.Event(db_this.eventId,
							event_name,
							owner,
							participantsId,
							new Position(latitude, longitude),
							addr,
							date);
						db_this.events.push(evt);
						successCB(db_this.eventId);
					},
					error);
			},
			error);

	function error(err)
	{
		errorCB(err);
	}
}

//TODO replace with the actual code
externalDBHandler.prototype.get_user_id = function(mail, successCB, errorCB)
{
	errorCB = convertErrorCB(errorCB);
	for (user of this.users) {
		if(user.mail == mail){
			successCB(user.id);
			return;
		}
	}
	errorCB("not in db"); //TODO create exception
}

//TODO replace with the actual code
externalDBHandler.prototype.search_user = function(mail, password, keywords)
{
	//TODO returns an id if exists, and throws a CommonException(1003) if the user does not exist
}

//TODO replace with the actual code
externalDBHandler.prototype.set_pass = function(mail, password, new_password, successCB, errorCB)
{
	errorCB = convertErrorCB(errorCB);
	successCB = convertSuccessCB(successCB);
	var db_this = this;
	this.log_user(mail,
			password,
			function change_pass()
			{
				for (user of db_this.users) {
					if (user.mail == mail) {
						user.password = new_password;
						successCB();
						return;
					}
				}
			},
			error);

	function error(err)
	{
		errorCB(err);
	}
}

//TODO replace with the actual code
externalDBHandler.prototype.add_user = function(name, surname, mail, tel, password, successCB, errorCB)
{
	errorCB = convertErrorCB(errorCB);
	successCB = convertSuccessCB(successCB);
	for (user of this.users) {
		if (user.mail == mail) {
			errorCB(new CommonException(1001));
			return;
		}
	}

	if (!(this.is_mail(mail) && this.is_tel(tel))) {
		errorCB(new CommonException(1002));
		return;
	}

	this.currentId++;
	var addedUser = new mock.external.User(this.currentId,
			name,
			surname,
			mail,
			tel,
			0., 0.,
			password);
	this.users.push(addedUser);
	successCB();
}

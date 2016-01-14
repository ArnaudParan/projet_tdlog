/* dependencies
 * 	|->../abstractExternalDB.js
 * 	|->../exceptions.js
 */

//namespace mock
if (typeof mock == "undefined") {
	var mock = {};
}

mock.external = {}

mock.external.externalDB = function(currentId, users, events)
{
	AbstractLocalDB.call(this);
	this.currentId = currentId;
	this.users = users;
	this.events = events;
};
mock.external.externalDB.prototype = new AbstractLocalDB();
mock.external.externalDB.prototype.users;
mock.external.externalDB.prototype.events;

mock.external.externalDB.prototype.log_user = function(mail, password)
{
	for (user of this.users) {
		if(user.mail == mail && user.password == password){
			return true;
		}
	}
	return false;
}

mock.external.externalDB.prototype.set_pass = function(mail, password, new_password)
{
	if (this.log_user(mail, password)) {
		for (user of this.users) {
			if (user.mail == mail) {
				user.password = new_password;
			}
		}
	}
	else {
		throw new CommonException(1000);
	}
}

mock.external.externalDB.prototype.add_user = function(name, surname, mail, tel, password)
{
	for (user in this.users) {
		if (user.mail == mail) {
			throw new CommonException(1001);
			return;
		}
	}

	if (!(this.is_mail(mail) && this.is_tel(tel))) {
		throw new CommonException(1002);
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
}

mock.external.externalDB.prototype.is_mail = function(mail)
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

mock.external.externalDB.prototype.is_tel = function(tel)
{
	var reg = new RegExp('^\\+[0-9]{11}$');

	if(reg.test(tel))
	{
		return true;
	}
	else
	{
		return false;
	}
}

//////////////////////////////////

mock.external.externalDB.prototype.get_user_mail = function()
{
	return this.user.mail;
}

mock.external.externalDB.prototype.get_user_password = function()
{
	return this.user.password;
}

mock.external.externalDB.prototype.get_all_friends_id_names_tel = function()
{
	var transcripted_friends_id = Array();
	for (friend of this.friends_id) {
		var current_friend = {
			name : friend.name,
			surname : friend.surname,
			tel : friend.tel};
		transcripted_friends_id.push(current_friend);
	}
	return transcripted_friends_id;
}

mock.external.externalDB.prototype.search_friends_id = function(keyword)
{
	var matching_friends_id = Array();
	for (friend of this.friends_id) {
		if(this.match_keyword_friend(keyword, friend)){
			matching_friends_id.push(friend);
		}
	}
	return matching_friends_id;
}

mock.external.externalDB.prototype.match_keyword_friend = function(keyword, friend)
{
	if(mock.is_substr(keyword, friend.name)) {
		return true;
	}
	if(mock.is_substr(keyword, friend.surname)) {
		return true;
	}
	if(mock.is_substr(keyword, friend.mail)) {
		return true;
	}
	if(mock.corresponding_tel(keyword, friend.tel)) {
		return true;
	}
	return false;
}

mock.is_substr = function(keyword, word)
{
	if (word.indexOf(keyword) > -1) {
		return true;
	}
	return false;
}

mock.corresponding_tel = function(keyword, tel)
{
	if (tel.indexOf(keyword) > -1) {
		return true;
	}
	var country_tel = "0" + tel.substring(3);
	if (country_tel.indexOf(keyword) > -1) {
		return true;
	}
	return false;
}

mock.external.Event = function(id, name, owner, participants, position, address)
{
	this.id = id;
	this.name = name;
	this.owner = owner;
	this.participants = participants;
	this.position = position;
	this.address = address;
};
mock.external.Event.prototype.id;
mock.external.Event.prototype.name;
mock.external.Event.prototype.owner;
mock.external.Event.prototype.participants;
mock.external.Event.prototype.position;
mock.external.Event.prototype.address;

var Position = function(latitude, longitude)
{
	this.latitude = latitude;
	this.longitude = longitude;
};
Position.prototype.latitude;
Position.prototype.longitude;

mock.external.User = function(id, name, surname, mail, tel, latitude, longitude, password)
{
	this.id = id;
	this.name = name;
	this.surname = surname;
	this.mail = mail;
	this.tel = tel;
	this.position = new Position(latitude, longitude);
	this.password = password;
	this.friends_id = Array();
};

mock.external.User.prototype.id;
mock.external.User.prototype.name;
mock.external.User.prototype.surname;
mock.external.User.prototype.mail;
mock.external.User.prototype.tel;
mock.external.User.prototype.position;
mock.external.User.prototype.password;
mock.external.User.prototype.friends_id;

//externalDB inatialisation
mock.external.users = Array(
		new mock.external.User(0,
			"john",
			"doe",
			"john.doe@eleves.enpc.fr",
			"+336128745",
			0., 0.,
			"mot_de_passe"),
		new mock.external.User(1,
			"paran",
			"arnaud",
			"paran.arnaud@gmail.com",
			"+33650544817",
			0.1, 0.1,
			"pass de merde"),
		new mock.external.User(2,
			"lebastard",
			"simon",
			"simon.lebastard@eleves.enpc.fr",
			"+33750332043",
			0.2, 0.2,
			"il faut sauver willy"),
		new mock.external.User(3,
			"gillier",
			"adele",
			"adele.gillier@eleves.enpc.fr",
			"+34567853159",
			0.3, 0.3,
			"gros boobs"),
		new mock.external.User(4,
			"soulier",
			"eloise",
			"eloise.soulier@eleves.enpc.fr",
			"+44865874520",
			0.4, 0.4,
			"julien deur")
		);

mock.external.users[0].friends_id = [1, 2, 3, 4];
mock.external.users[1].friends_id = [0, 2];
mock.external.users[2].friends_id = [0, 1];
mock.external.users[3].friends_id = [0, 4];
mock.external.users[4].friends_id = [0, 3];

mock.external.events = Array(new mock.external.Event(1,
			"partouze entre amis chez jacquie et michel",
			mock.external.users[2],
			mock.external.users,
			new Position(0., 0.),
			"Merci qui?")
		);
mock.external.DB = new mock.external.externalDB(4, mock.external.users, mock.external.events);

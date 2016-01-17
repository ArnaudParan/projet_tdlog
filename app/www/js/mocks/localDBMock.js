/* dependencies
 * 	|->../abstractLocalDB.js
 */

//namespace mock
if (typeof mock == "undefined") {
	var mock = {};
}

mock.local = {}

mock.local.localDB = function(user, friends, events)
{
	AbstractLocalDB.call(this);
	this.user = user;
	this.friends = friends;
	this.events = events;
};
mock.local.localDB.prototype = new AbstractLocalDB();
mock.local.localDB.prototype.user;
mock.local.localDB.prototype.friends;
mock.local.localDB.prototype.events;

mock.local.localDB.prototype.set_user_mail_pass = function(mail, password)
{
	this.user.mail = mail;
	this.user.password = password;
}

mock.local.localDB.prototype.get_user_mail = function()
{
	return this.user.mail;
}

mock.local.localDB.prototype.get_user_password = function()
{
	return this.user.password;
}

mock.local.localDB.prototype.add_event = function(eventId, name, creatorId, participantsId, latitude, longitude, address, date)
{
}

mock.local.localDB.prototype.add_friend = function(id, tel, name)
{
	//TODO
}

mock.local.localDB.prototype.get_all_friends_names_tel = function()
{
	//TODO give Id and test
	var transcripted_friends = Array();
	for (friend of this.friends) {
		var current_friend = {
			id : friend.id,
			name : friend.name,
			surname : friend.surname,
			tel : friend.tel};
		transcripted_friends.push(current_friend);
	}
	return transcripted_friends;
}

mock.local.localDB.prototype.search_friends = function(keywords)
{
	var keywordsArray = keywords.split(" ");
	var matching_friends = Array();
	for (friend of this.friends) {
		var keywords_match = true;
		for (keyword of keywordsArray) {
			console.log(keyword);
			var wordMatch = this.match_keyword_friend(keyword, friend);
			keywords_match = keywords_match && wordMatch;
		}
		if(keywords_match){
			matching_friends.push(friend);
		}
	}
	return matching_friends;
}

mock.local.localDB.prototype.match_keyword_friend = function(keyword, friend)
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

mock.local.Event = function(id, name, owner, participants, position, address)
{
	this.id = id;
	this.name = name;
	this.owner = owner;
	this.participants = participants;
	this.position = position;
	this.address = address;
};
mock.local.Event.prototype.id;
mock.local.Event.prototype.name;
mock.local.Event.prototype.owner;
mock.local.Event.prototype.participants;
mock.local.Event.prototype.position;
mock.local.Event.prototype.address;

var Position = function(latitude, longitude)
{
	this.latitude = latitude;
	this.longitude = longitude;
};
Position.prototype.latitude;
Position.prototype.longitude;

mock.local.Friend = function(id, name, surname, mail, tel, latitude, longitude)
{
	this.id = id;
	this.name = name;
	this.surname = surname;
	this.mail = mail;
	this.tel = tel;
	this.position = new Position(latitude, longitude);
};
mock.local.Friend.prototype.id;
mock.local.Friend.prototype.name;
mock.local.Friend.prototype.surname;
mock.local.Friend.prototype.mail;
mock.local.Friend.prototype.tel;
mock.local.Friend.prototype.position;

mock.local.User = function(name, surname, mail, tel, latitude, longitude, password)
{
	this.password = password;
	mock.local.Friend.call(this, name, surname, mail, tel, latitude, longitude);
};

mock.local.User.prototype = new mock.local.Friend();
mock.local.User.prototype.password;

//localDB inatialisation
mock.local.user = new mock.local.User(0, "john", "doe", "john.doe@eleves.enpc.fr", "+336128745", 0., 0., "mot_de_passe");
mock.local.friends = Array(
		new mock.local.Friend(1,
			"paran",
			"arnaud",
			"paran.arnaud@gmail.com",
			"+33650544817",
			0.1,
			0.1),
		new mock.local.Friend(2,
			"lebastard",
			"simon",
			"simon.lebastard@eleves.enpc.fr",
			"+33750332043",
			0.2,
			0.2),
		new mock.local.Friend(3,
			"gillier",
			"adele",
			"adele.gillier@eleves.enpc.fr",
			"+34567853159",
			0.3,
			0.3),
		new mock.local.Friend(4,
			"soulier",
			"eloise",
			"eloise.soulier@eleves.enpc.fr",
			"+44865874520",
			0.4,
			0.4)
		);

mock.local.events = Array(new mock.local.Event(1,
			"partouze entre amis chez jacquie et michel",
			mock.local.friends[2],
			mock.local.friends,
			new Position(0., 0.),
			"Merci qui?")
		);
mock.local.DB = new mock.local.localDB(mock.local.user, mock.local.friends, mock.local.events);

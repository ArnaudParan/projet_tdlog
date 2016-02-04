/* dependencies
 * 	|->../abstractLocalDB.js
 */

//namespace mock
if (typeof mock == "undefined") {
	var mock = {};
}

mock.local = {}

mock.local.localDB = function()
{
	AbstractLocalDB.call(this);
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
	return(this.user.mail);
}

mock.local.localDB.prototype.get_user_password = function()
{
	return(this.user.password);
}

mock.local.localDB.prototype.add_event = function(eventId, name, creatorId, participantsId, latitude, longitude, address, date, successCB, errorCB)
{
	errorCB = convertErrorCB(errorCB);
	successCB = convertSuccessCB(successCB);
	this.events.push(new mock.local.Event(
				eventId,
				name,
				creatorId,
				participantsId,
				new Position(latitude, longitude),
				address,
				date));
	successCB();
}

mock.local.localDB.prototype.get_event = function(id, successCB, errorCB)
{
	errorCB = convertErrorCB(errorCB);
	for (evt of this.events) {
		if (evt.id === id) {
			result = {id : evt.id,
				name: evt.name,
				owner : evt.owner,
				part : evt.participants,
				lat : evt.position.latitude,
				lon : evt.position.longitude,
				addr : evt.address,
				date : evt.date
			};
			successCB(result);
			return;
		}
	}
	errorCB("event not found") //TODO create exception
}

mock.local.localDB.prototype.get_all_events = function(successCB, errorCB)
{
	errorCB = convertErrorCB(errorCB);
	result_list = new Array();
	for (evt of this.events) {
		var newEvent = new mock.local.Event(
			evt.id,
			evt.name,
			evt.owner,
			evt.participants,
			evt.position,
			evt.address,
			evt.date
			);
		result_list.push(newEvent);
	}
	if(result_list.length == this.events.length)
	{
		successCB(result_list);
		return;
	}
	errorCB("event not found") //TODO create exception
}

mock.local.localDB.prototype.add_friend = function(id, name, surname, mail, tel, successCB, errorCB)
{
	errorCB = convertErrorCB(errorCB);
	successCB = convertSuccessCB(successCB);
	var newFriend = new mock.local.Friend(id,
			name,
			surname,
			mail,
			tel,
			0.0,
			0.0
			);
	this.friends.push(newFriend);
	successCB();
}

mock.local.localDB.prototype.get_friend_by_id = function(id, successCB, errorCB)
{
	errorCB = convertErrorCB(errorCB);
	for (friend of this.friends) {
		if (friend.id === id) {
			var result = {
				id : friend.id,
				name : friend.name,
				surname : friend.surname,
				mail : friend.mail,
				tel : friend.tel
			};
			successCB(result);
			return;
		}
	}
}

mock.local.localDB.prototype.get_all_friends_names_tel = function(successCB, errorCB)
{
	this.get_all_friends(successCB, errorCB);
}

mock.local.localDB.prototype.get_all_friends = function(successCB, errorCB)
{
	errorCB = convertErrorCB(errorCB);
	var transcripted_friends = Array();
	for (friend of this.friends) {
		var current_friend = {
			id : friend.id,
			name : friend.name,
			surname : friend.surname,
			mail : friend.mail,
			tel : friend.tel};
		transcripted_friends.push(current_friend);
	}
	successCB(transcripted_friends);
}

mock.local.localDB.prototype.search_friends = function(keywords, successCB, errorCB)
{
	errorCB = convertErrorCB(errorCB);
	var keywordsArray = keywords.split(" ");
	var matching_friends = Array();
	for (friend of this.friends) {
		var keywords_match = true;
		for (keyword of keywordsArray) {
			var wordMatch = this.match_keyword_friend(keyword, friend);
			keywords_match = keywords_match && wordMatch;
		}
		if(keywords_match){
			matching_friends.push(friend);
		}
	}
	successCB(matching_friends);
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

mock.local.localDB.prototype.get_friend_id_by_tel = function(tel)
{
	for (friend of this.friends)
		if(friend.tel == tel)
			return friend.id;
	throw new CommonException(2002);
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

mock.local.Event = function(id, name, owner, participants, position, address, date)
{
	this.id = id;
	this.name = name;
	this.owner = owner;
	this.participants = participants;
	this.position = position;
	this.address = address;
	this.date = date;
};
mock.local.Event.prototype.id;
mock.local.Event.prototype.name;
mock.local.Event.prototype.owner;
mock.local.Event.prototype.participants;
mock.local.Event.prototype.position;
mock.local.Event.prototype.address;
mock.local.Event.prototype.date;

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

mock.local.events = Array(
		new mock.local.Event(1,
			"L'art dans les productions vidéoludiques françaises",
			mock.local.friends[2],
			mock.local.friends,
			new Position(0., 0.),
			"25 Quai d'Austerlitz",
			"05/02/2016"),
		new mock.local.Event(2,
			"Cinéma à Châtelet",
			2,
			[1, 2, 3, 4],
			new Position(0., 0.),
			"Gaumont Les Halles",
			"03/08/2016")				
		);
		
mock.local.DB = new mock.local.localDB(mock.local.user, mock.local.friends, mock.local.events);
mock.local.DB.user = mock.local.user;
mock.local.DB.friends = mock.local.friends;
mock.local.DB.events = mock.local.events;

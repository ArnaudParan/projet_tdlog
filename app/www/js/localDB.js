/* dependencies
 * 	|->abstractLocalDB.js
 * 	|->exceptions.js
 */
function isPositiveInteger(value) {
	var x;
	if (isNaN(value)) {
		return false;
	}
	x = parseFloat(value);
	if((x | 0) === x) {
		return x > 0;
	}
	return false;
}
var callbackWaiter = function(nbWaited, callback)
{
	this.nbWaited = nbWaited;
	if (!isPositiveInteger(nbWaited)) {
		throw "callbackWaiter declared with a nbWaited not integer";
		this.nbWaited = 0;
	}
	this.callback = callback;
	this.alreadyFiredNb = 0;
}
callbackWaiter.prototype
callbackWaiter.prototype.nbWaited;
callbackWaiter.prototype.callback;
callbackWaiter.prototype.alreadyFiredNb;
callbackWaiter.prototype.fire = function()
{
	if (++this.alreadyFiredNb === this.nbWaited) {
		this.callback();
	}
}

var localDBManager = function(successCB, errorCB)
{
	errorCB = convertErrorCB(errorCB);
	successCB = convertSuccessCB(successCB);
	AbstractLocalDB.call(this);
	this.storage = window.localStorage;
	this.dbName = "Database";
	this.dbVersion = "1.0";
	this.dbDisplayName = "app_test";

	var createDB = function(tx)
	{
		tx.executeSql('CREATE TABLE IF NOT EXISTS friends (id, name, surname, mail, tel, latitude, longitude)');
		tx.executeSql('CREATE TABLE IF NOT EXISTS events (id, creator_id, name, date, latitude, longitude, address)');
		tx.executeSql('CREATE TABLE IF NOT EXISTS event_participants (event_id, friend_id)');
	};

	var db_creation_error = function(err)
	{
		errorCB(err);
	};

	var db_created = function()
	{
		console.log("%cLocal DB successfully created", "color : green; font-style : italic");
		successCB();
	};

	this.db = window.openDatabase(this.dbName,
			this.dbVersion,
			this.dbDisplayName,
			200000);
	this.db.transaction(createDB, db_creation_error, db_created);
};
localDBManager.prototype = new AbstractLocalDB();
localDBManager.prototype.user;
localDBManager.prototype.friends;
localDBManager.prototype.events;

localDBManager.prototype.set_user_mail_pass = function(mail, password)
{
	this.storage.setItem("user_mail", mail);
	this.storage.setItem("user_password", password);
}

localDBManager.prototype.get_user_mail = function()
{
	var mail = this.storage.getItem("user_mail");
	return mail;
}

localDBManager.prototype.get_user_password = function()
{
	var password = this.storage.getItem("user_password");
	return password;
}

localDBManager.prototype.change_user = function(name, surname, tel)
{
	this.storage.setItem("user_name", name);
	this.storage.setItem("user_surname", surname);
	this.storage.setItem("user_tel", tel);
}

localDBManager.prototype.add_event = function(eventId, name, creatorId, participantsId, latitude, longitude, address, date, successCB, errorCB)
{
	errorCB = convertErrorCB(errorCB);
	successCB = convertSuccessCB(successCB);
	//TODO test sanity
	var nbWaitedCB = 1 + participantsId.length;
	var cbLauncher = new callbackWaiter(nbWaitedCB, successCB);
	var DB = this;
	var queryDB = function(tx)
	{
		tx.executeSql(DB.add_event_query(eventId, name, creatorId, participantsId, latitude, longitude, address, date));
	}
	var error = function(err)
	{
		console.log(err);
		errorCB(err);
	};

	var event_added = function()
	{
		cbLauncher.fire();
	};

	this.db.transaction(queryDB, error, event_added);
	for (participantId of participantsId) {
		this.add_event_participant(eventId, participantId, function(){cbLauncher.fire();}, error);
	}
}

localDBManager.prototype.add_event_query = function(id, name, creatorId, participantsId, latitude, longitude, address, date)
{
	var event_query = 'INSERT INTO events (id, creator_id, name, date, latitude, longitude, address) VALUES (' +
			id.toString() + ', ' +
			creatorId.toString() + ', ' +
			'"' + name + '", ' +
			'"' + date + '", ' +
			latitude.toString() + ', ' +
			longitude.toString() + ', ' +
			'"' + address + '");';
	return event_query;
}

localDBManager.prototype.add_event_participant = function(eventId, participantId, successCB, errorCB)
{
	errorCB = convertErrorCB(errorCB);
	successCB = convertSuccessCB(successCB);
	//TODO test sanity
	var DB = this;
	var queryDB = function(tx)
	{
		tx.executeSql(DB.add_event_participant_query(eventId, participantId));
	}
	var error = function(err)
	{
		console.log(err);
		errorCB(err);
	};

	var participant_added = function()
	{
		successCB();
	};

	this.db.transaction(queryDB, error, participant_added);
}

localDBManager.prototype.add_event_participant_query = function(eventId, participantId)
{
	var add_participants_query = 'INSERT INTO event_participants (event_id, friend_id) VALUES (' +
			eventId.toString() + ', ' +
			participantId.toString() +');';
	return add_participants_query;
}

localDBManager.prototype.get_event = function(id, successCB, errorCB)
{
	errorCB = convertErrorCB(errorCB);
	var evt = {};
	evt.participants = new Array();
	var cbLauncher = new callbackWaiter(2, function(){successCB(evt)});
	var error = function(err)
	{
		console.log(err);
		errorCB(err);
	};

	var querySuccess = function(tx, results)
	{
		/*
		if (results.rows.length >= 2) {
			console.log(results.rows);
			errorCB("db sanity") //TODO create exception for database sanity
				return;
		}
		*/
		evt.id = results.rows.item(0).id;
		evt.creatorId = results.rows.item(0).creator_id;
		evt.name = results.rows.item(0).name;
		evt.date = results.rows.item(0).date;
		evt.latitude = results.rows.item(0).latitude;
		evt.longitude = results.rows.item(0).longitude;
		evt.address = results.rows.item(0).address;
		cbLauncher.fire();
	};

	var queryDB = function(tx)
	{
		tx.executeSql('SELECT * FROM events WHERE id = ' + id.toString() , [], querySuccess, error);
	}
	this.get_event_participants(id, function(participants)
			{
				evt.participants = participants;
				cbLauncher.fire();
			},
			error);

	this.db.transaction(queryDB, error);
}

localDBManager.prototype.get_event_participants = function(evtId, successCB, errorCB)
{
	errorCB = convertErrorCB(errorCB);
	var error = function(err)
	{
		console.log(err);
		errorCB(err);
	};

	var querySuccess = function(tx, results)
	{
		var participants = new Array();
		var length = results.rows.length;
		for (var relationId = 0; relationId < length; relationId++) {
			participants.push(results.rows.item(relationId).friend_id);
		}
		successCB(participants);
	};

	var queryDB = function(tx)
	{
		tx.executeSql('SELECT * FROM event_participants WHERE event_id = ' + evtId.toString() , [], querySuccess, error);
	}

	this.db.transaction(queryDB, error);
}

localDBManager.prototype.add_friend = function(id, name, surname, mail, tel, successCB, errorCB)
{
	errorCB = convertErrorCB(errorCB);
	successCB = convertSuccessCB(successCB);
	//TODO test sanity
	var DB = this;
	var queryDB = function(tx)
	{
		tx.executeSql(DB.add_friend_query(id, name, surname, mail, tel));
	}
	var error = function(err)
	{
		console.log(err);
		errorCB(err);
	};

	var friend_added = function()
	{
		successCB();
	};

	this.db.transaction(queryDB, error, friend_added);
}

localDBManager.prototype.add_friend_query = function(id, name, surname, mail, tel)
{
	var friend_query = 'INSERT INTO friends (id, name, surname, mail, tel) VALUES (' +
			id.toString() + ', ' +
			'"' + name + '", ' +
			'"' + surname + '", ' +
			'"' + mail + '", ' +
			'"' + tel + '") ';
	return friend_query;
}

localDBManager.prototype.get_friend_by_id = function(id, successCB, errorCB)
{
	errorCB = convertErrorCB(errorCB);
	var error = function(err)
	{
		errorCB(err);
	};

	var querySuccess = function(tx, results)
	{
		//TODO test db sanity
		var db_friend = results.rows.item(0);
		var friend = {
			id : db_friend.id,
			name : db_friend.name,
			surname : db_friend.surname,
			mail : db_friend.mail,
			tel : db_friend.tel
		};
		successCB(friend);
	};

	var queryDB = function(tx)
	{
		tx.executeSql('SELECT * FROM friends WHERE id = ' + id.toString() , [], querySuccess, error);
	}

	this.db.transaction(queryDB, error);
}

localDBManager.prototype.drop_db = function(successCB, errorCB)
{
	errorCB = convertErrorCB(errorCB);
	successCB = convertSuccessCB(successCB);
	var dropDB = function(tx)
	{
		tx.executeSql('DROP TABLE friends');
		tx.executeSql('DROP TABLE events');
		tx.executeSql('DROP TABLE event_participants');
	};

	var db_drop_error = function(err)
	{
		errorCB(err);
	};

	var db_dropped = function()
	{
		console.log("%cWarning : the local DB has been dropped", "color : orange; font-style : italic");
		successCB();
	};

	this.db = window.openDatabase(this.dbName,
			this.dbVersion,
			this.dbDisplayName,
			200000);
	this.db.transaction(dropDB, db_drop_error, db_dropped);
}

//Deprecated, the function does not match her name anymore
localDBManager.prototype.get_all_friends_names_tel = function(successCB, errorCB)
{
	this.get_all_friends(successCB, errorCB);
}

localDBManager.prototype.get_all_friends = function(successCB, errorCB)
{
	errorCB = convertErrorCB(errorCB);
	var error = function(err)
	{
		console.log(err);
		errorCB(err);
	};

	var querySuccess = function(tx, results)
	{
		var friends = new Array();
		var length = results.rows.length;
		for (var db_id = 0; db_id < length; db_id++) {
			var friend = results.rows.item(db_id);
			friends.push({
				id : friend.id,
				name : friend.name,
				surname : friend.surname,
				mail : friend.mail,
				tel : friend.tel
			});
		}
		successCB(friends);
	};

	var queryDB = function(tx)
	{
		tx.executeSql('SELECT * FROM friends' , [], querySuccess, error);
	}

	this.db.transaction(queryDB, error);
}

localDBManager.prototype.search_friends = function(keywords, successCB, errorCB)
{
	errorCB = convertErrorCB(errorCB);
	var keywordsArray = keywords.split(" ");
	this.get_all_friends(search_from_friends, errorCB);
	var db = this;
	function search_from_friends(friends)
	{
		var matching_friends = Array();
		for (friend of friends) {
			var wordsMatch = true;
			for (keyword of keywordsArray) {
				var wordMatch = db.match_keyword_friend(keyword, friend);
				wordsMatch = wordsMatch && wordMatch;
			}
			if(wordsMatch) {
				matching_friends.push(friend);
			}
		}
		successCB(matching_friends);
	}
}

localDBManager.prototype.match_keyword_friend = function(keyword, friend)
{
	if(this.is_substr(keyword, friend.name)) {
		return true;
	}
	if(this.is_substr(keyword, friend.surname)) {
		return true;
	}
	if(this.is_substr(keyword, friend.mail)) {
		return true;
	}
	if(this.corresponding_tel(keyword, friend.tel)) {
		return true;
	}
	return false;
}

localDBManager.prototype.is_substr = function(keyword, word)
{
	if (word.indexOf(keyword) > -1) {
		return true;
	}
	return false;
}

localDBManager.prototype.corresponding_tel = function(keyword, tel)
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

localDBManager_user = { id : 0,
	name : "john",
	surname : "doe",
	mail : "john.doe@eleves.enpc.fr",
	tel : "+336128745",
	lat : 0.,
	long : 0.,
	pass : "mot_de_passe"};
localDBManager_friends = Array(
		{ id : 1,
			name : "paran",
			surname : "arnaud",
			mail : "paran.arnaud@gmail.com",
			tel : "+33650544817",
			lat : 0.1,
			long : 0.1},
		{id : 2,
			name : "lebastard",
			surname : "simon",
			mail : "simon.lebastard@eleves.enpc.fr",
			tel : "+33750332043",
			lat : 0.2,
			long : 0.2},
		{id : 3,
			name : "gillier",
			surname : "adele",
			mail : "adele.gillier@eleves.enpc.fr",
			tel : "+34567853159",
			lat : 0.3,
			long : 0.3},
		{id : 4,
			name : "soulier",
			surname : "eloise",
			mail : "eloise.soulier@eleves.enpc.fr",
			tel : "+44865874520",
			lat : 0.4,
			long : 0.4}
		);

localDBManager_events = Array({id : 1,
			name : "partouze entre amis chez jacquie et michel",
			creatorId : 2,
			participants : [1, 2, 3, 4],
			latitude : 0.,
			longitude : 0.,
			address : "Merci qui?",
			date : "16/09/1993"
		},
		{id : 2,
			name : "forever alone festival",
			creatorId : 3,
			participants : [],
			latitude : 0.,
			longitude : 0.,
			address : "lonely island",
			date : "17/09/1993"
		});

localDBManager_DB = new localDBManager(populateDB);

function populateDB()
{
	localDBManager_DB.set_user_mail_pass(localDBManager_user.mail, localDBManager_user.pass);
	for (friend of localDBManager_friends) {
		localDBManager_DB.add_friend(friend.id,
				friend.name,
				friend.surname,
				friend.mail,
				friend.tel
				);
	}
	for (evt of localDBManager_events) {
		localDBManager_DB.add_event(evt.id,
				evt.name,
				evt.creatorId,
				evt.participants,
				evt.latitude,
				evt.longitude,
				evt.address,
				evt.date
				);
	}
}

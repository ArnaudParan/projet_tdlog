/* dependencies
 * 	|->test_main.js
 * 	|->../mocks/localDB.js
 * 		|../abstractLocalDB.js
 */

test.suites.localDB = {}
test.suites.localDB.vars = {}

var vars = test.suites.localDB.vars;
var suite = test.suites.localDB;

suite.isPositiveInteger = function(assert)
{
	assert.ok(isPositiveInteger(10), "10 positive integer");
	assert.notOk(isPositiveInteger(-10), "-10 not positive integer");
	assert.notOk(isPositiveInteger(10.1), "10.1 not positive integer");
	assert.notOk(isPositiveInteger(0), "0 not positive integer");
	assert.notOk(isPositiveInteger(undefined), "undefined not positive integer");
}

suite.callbackWaiter = function(assert)
{
	var nbWaited = 10;
	var assertDone = assert.async(1);
	var waiter = new callbackWaiter(nbWaited, assertDone);
	for (nbFired = 0 ; nbFired < nbWaited - 1; nbFired++) {
		waiter.fire();
	}
	assert.ok(true, "has reached the count");
	waiter.fire();
}

suite.user_mail_pass_management = function(assert)
{
	var vars = test.suites.localDB.vars;
	var suite = test.suites.localDB;

	var mail = "marty.mcfly@wanadoo.fr";
	var pass = "back to the future";

	vars.DB.set_user_mail_pass(mail, pass);
	var actMail = vars.DB.get_user_mail();
	var actPass = vars.DB.get_user_password();
	assert.equal(actMail, mail, "mail checking");
	assert.equal(actPass, pass, "password checking");
}

suite.add_event = function(assert)
{
	var vars = test.suites.localDB.vars;
	var suite = test.suites.localDB;

	var assertDone = assert.async(1);
	var evt = vars.events[0];
	vars.DB.get_event(evt.id, function(db_evt)
		{
			assert.ok(isEqual(db_evt, evt), "adding event");
			assertDone();
		});
}

suite.add_event_participants = function(assert)
{
	var vars = test.suites.localDB.vars;
	var suite = test.suites.localDB;

	var assertDone = assert.async(1);
	var evt = vars.events[1];
	var participantId = 1;
	vars.DB.add_event_participant(2, participantId, test_added);

	function test_added ()
	{
		vars.DB.get_event_participants(evt.id, function get_parts(db_parts)
			{
				assert.equal(db_parts[0], participantId, "adding participant");
				assert.equal(db_parts.length, 1, "not adding too much participants");
				assertDone();
			});
	}
}

suite.add_friend = function(assert)
{
	var vars = test.suites.localDB.vars;
	var suite = test.suites.localDB;

	var assertDone = assert.async(1);
	var expFriend = {
		id : 1000,
		name : "cymes",
		surname : "michel",
		mail : "michel.cymes@france5.fr",
		tel : "+33684572310"
	}
	var test_added = function()
	{
		vars.DB.get_friend_by_id(expFriend.id,
		function(actFriend)
		{
			assert.ok(isEqual(actFriend, expFriend), "Friend correctly added");
			assertDone();
		});
	}

	vars.DB.add_friend(expFriend.id,
			expFriend.name,
			expFriend.surname,
			expFriend.mail,
			expFriend.tel,
			test_added);

}

suite.get_all_friends = function(assert)
{
	var vars = test.suites.localDB.vars;
	var suite = test.suites.localDB;

	var assertDone = assert.async(1);
	vars.DB.get_all_friends(function(friends)
			{
				var friend2 = vars.friends[2]
				assert.equal(friends[2].name, friend2.name, "name");
				assert.equal(friends[2].surname, friend2.surname, "surname");
				assert.equal(friends[2].tel, friend2.tel, "tel");
				assertDone();
			});
}

suite.search_friends = function(assert)
{
	var vars = test.suites.localDB.vars;
	var suite = test.suites.localDB;

	var assertDone = assert.async(5);
	var tel0 = "0650544817";

	var surname1 = vars.friends[1].surname.substring(2,5);

	var mail2 = vars.friends[2].mail;

	var name3 = vars.friends[3].name + "  " + vars.friends[3].surname;

	var search_assertion = function(keyword, expFriend,  message)
	{
		vars.DB.search_friends(keyword, function(actFriend)
				{
					assert.equal(actFriend[0].id, expFriend.id, message);
					assertDone();
				});
	}

	search_assertion(tel0, vars.friends[0], "keyword : french tel");
	search_assertion(surname1, vars.friends[1], "keyword : surname substr");
	search_assertion(mail2, vars.friends[2], "keyword : mail");
	search_assertion(name3, vars.friends[3], "keyword : name surname");

	vars.DB.search_friends("", function(all_friends)
			{
				assert.equal(all_friends.length, vars.friends.length, "empty chain");
				assertDone();
			});
}


suite.setUp = function(assert)
{
	var vars = test.suites.localDB.vars;
	var suite = test.suites.localDB;


	vars.user = { id : 0,
		name : "john",
		surname : "doe",
		mail : "john.doe@eleves.enpc.fr",
		tel : "+336128745",
		lat : 0.,
		long : 0.,
		pass : "mot_de_passe"};
	vars.friends = Array(
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

	vars.events = Array({id : 1,
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

	var assertDone = assert.async(vars.friends.length + vars.events.length);
	vars.DB = new localDBManager(populateDB);

	function populateDB()
	{
		vars.DB.set_user_mail_pass(vars.user.mail, vars.user.pass);
		for (friend of vars.friends) {
			vars.DB.add_friend(friend.id,
					friend.name,
					friend.surname,
					friend.mail,
					friend.tel,
					assertDone
					);
		}
		for (evt of vars.events) {
			vars.DB.add_event(evt.id,
					evt.name,
					evt.creatorId,
					evt.participants,
					evt.latitude,
					evt.longitude,
					evt.address,
					evt.date,
					assertDone
					);
		}
	}
}

suite.tearDown = function(assert)
{
	var vars = test.suites.localDB.vars;
	var suite = test.suites.localDB;

	var assertDone = assert.async(1);
	vars.DB.drop_db(function()
			{
				assertDone();
			});
}

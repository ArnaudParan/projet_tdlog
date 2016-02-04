/* dependencies
 * 	|->test_main.js
 * 	|->../mocks/localDBMock.js
 * 		|../abstractLocalDB.js
 */

test.suites.localDBMock = {}
test.suites.localDBMock.vars = {}

var vars = test.suites.localDBMock.vars;
var suite = test.suites.localDBMock;

suite.user_mail_pass_management = function(assert)
{
	var vars = test.suites.localDBMock.vars;
	var suite = test.suites.localDBMock;

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
	var vars = test.suites.localDBMock.vars;
	var suite = test.suites.localDBMock;

	var assertDone = assert.async(1);
	var evt = {
		id : 3,
		name : "festival de la verveine menthe",
		owner : 2,
		part : [1, 2, 3, 4],
		lat : 0.,
		lon : 0.,
		addr : "Merci qui?",
		date : "50/45/2123"
	};

	var test_added = function()
	{
		vars.DB.get_event(evt.id, function(db_evt)
			{
				assert.ok(isEqual(db_evt, evt), "adding event");
				assertDone();
			});
	}


	vars.DB.add_event(evt.id,
			evt.name,
			evt.owner,
			evt.part,
			evt.lat,
			evt.lon,
			evt.addr,
			evt.date,
			test_added);
}

suite.add_friend = function(assert)
{
	var vars = test.suites.localDBMock.vars;
	var suite = test.suites.localDBMock;

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

suite.get_all_events = function(assert)
{
	var suite = test.suites.localDBMock;
	var vars = suite.vars;

	var evts = vars.events;
	var assertDone = assert.async(1);
	vars.DB.get_all_events(function(evt_list)
			{
				assert.equal(evt_list.length, evts.length, "all events should be caught");
				assertDone();
			});
}

suite.get_all_friends_names_tel = function(assert)
{
	var vars = test.suites.localDBMock.vars;
	var suite = test.suites.localDBMock;

	var assertDone = assert.async(1);
	vars.DB.get_all_friends_names_tel(function(friends)
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
	var vars = test.suites.localDBMock.vars;
	var suite = test.suites.localDBMock;

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
	search_assertion(name3, vars.friends[3], "keyword : name substr");

	vars.DB.search_friends("", function(all_friends)
			{
				assert.equal(all_friends.length, vars.friends.length, "empty chain");
				assertDone();
			});
}

suite.get_friend_id_by_tel = function(assert)
{
	var vars = test.suites.localDBMock.vars;
	var suite = test.suites.localDBMock;
	
	var id = 1;
	var tel = vars.friends[id].tel;
	var non_existing_tel = "+33758315420";
	assert.equal(vars.DB.get_friend_id_by_tel(tel), id, "returns id when given corresponding tel");
	assert.throws(function(){vars.DB.get_friend_id_by_tel(non_existing_tel)}, new CommonException(2002), "throws error when friend doesn't exist");
}

suite.setUp = function()
{
	var vars = test.suites.localDBMock.vars;
	var suite = test.suites.localDBMock;

	vars.user = new mock.local.User(0, "john", "doe", "john.doe@eleves.enpc.fr", "+336128745", 0., 0., "mot_de_passe");
	vars.friends = Array(
			new mock.local.Friend(0,
				"paran",
				"arnaud",
				"paran.arnaud@gmail.com",
				"+33650544817",
				0.1, 0.1),
			new mock.local.Friend(1,
				"lebastard",
				"simon",
				"simon.lebastard@eleves.enpc.fr",
				"+33750332043",
				0.2, 0.2),
			new mock.local.Friend(2,
				"gillier",
				"adele",
				"adele.gillier@eleves.enpc.fr",
				"+34567853159",
				0.3, 0.3),
			new mock.local.Friend(3,
				"soulier",
				"eloise",
				"eloise.soulier@eleves.enpc.fr",
				"+44865874520",
				0.4, 0.4)
			);

	vars.events = Array(
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
	vars.DB = new mock.local.localDB();
	vars.DB.user = vars.user;
	vars.DB.friends = vars.friends;
	vars.DB.events = vars.events;
}

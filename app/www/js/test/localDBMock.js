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
	assert.equal(vars.DB.get_user_mail(), mail, "mail checking");
	assert.equal(vars.DB.get_user_password(), pass, "password checking");
}

suite.add_event = function(assert)
{
	var vars = test.suites.localDBMock.vars;
	var suite = test.suites.localDBMock;

	var evt = {
		id : 1,
		name : "festival de la verveine menthe",
		owner : 2,
		part : [1, 2, 3, 4],
		lat : 0.,
		lon : 0.,
		addr : "Merci qui?",
		date : "50/45/2123"
	};

	vars.DB.add_event(evt.id,
			evt.name,
			evt.owner,
			evt.part,
			evt.lat,
			evt.lon,
			evt.addr,
			evt.date);

	var db_evt = vars.DB.events[evt.id];
	assert.equal(db_evt.id, evt.id);
	assert.equal(db_evt.name, evt.name);
	assert.equal(db_evt.owner, evt.owner);
	assert.equal(db_evt.participants, evt.part);
	assert.equal(db_evt.address, evt.addr);
	assert.equal(db_evt.date, evt.date);

}

suite.get_all_friends_names_tel = function(assert)
{
	var vars = test.suites.localDBMock.vars;
	var suite = test.suites.localDBMock;

	var friends = vars.DB.get_all_friends_names_tel();
	var friend2 = vars.friends[2]
	assert.equal(friends[2].name, friend2.name, "name");
	assert.equal(friends[2].surname, friend2.surname, "surname");
	assert.equal(friends[2].tel, friend2.tel, "tel");
}

suite.search_friends = function(assert)
{
	var vars = test.suites.localDBMock.vars;
	var suite = test.suites.localDBMock;

	//TODO test substrings
	var tel0 = "0650544817";
	var friend0 = vars.DB.search_friends(tel0);

	var surname1 = vars.friends[1].surname.substring(2,5);
	var friend1 = vars.DB.search_friends(surname1);

	var mail2 = vars.friends[2].mail;
	var friend2 = vars.DB.search_friends(mail2);

	var name3 = vars.friends[3].name + "  " + vars.friends[3].surname;
	var friend3 = vars.DB.search_friends(name3);

	var all_friends = vars.DB.search_friends("");

	assert.equal(friend0[0].name, vars.friends[0].name, "name");
	assert.equal(friend1[0].mail, vars.friends[1].mail, "surname");
	assert.equal(friend2[0].surname, vars.friends[2].surname, "tel");
	assert.equal(friend3[0].mail, vars.friends[3].mail, "name + surname");
	assert.equal(all_friends.length, vars.friends.length, "empty chain");
}

suite.setUp = function()
{
	var vars = test.suites.localDBMock.vars;
	var suite = test.suites.localDBMock;

	vars.user = new mock.local.User(0, "john", "doe", "john.doe@eleves.enpc.fr", "+336128745", 0., 0., "mot_de_passe");
	vars.friends = Array(
			new mock.local.Friend(1,
				"paran",
				"arnaud",
				"paran.arnaud@gmail.com",
				"+33650544817",
				0.1, 0.1),
			new mock.local.Friend(2,
				"lebastard",
				"simon",
				"simon.lebastard@eleves.enpc.fr",
				"+33750332043",
				0.2, 0.2),
			new mock.local.Friend(3,
				"gillier",
				"adele",
				"adele.gillier@eleves.enpc.fr",
				"+34567853159",
				0.3, 0.3),
			new mock.local.Friend(4,
				"soulier",
				"eloise",
				"eloise.soulier@eleves.enpc.fr",
				"+44865874520",
				0.4, 0.4)
			);

	vars.events = Array(new mock.local.Event(1,
				"partouze entre amis chez jacquie et michel",
				2,
				[1, 2, 3, 4],
				new Position(0., 0.),
				"Merci qui?",
				"11/11/2011")
			);
	vars.DB = new mock.local.localDB(vars.user, vars.friends, vars.events);
}

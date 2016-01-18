/* dependencies
 * 	|->test_main
 * 	|->QUnit
 * 	|->../mock/externalDBMock.js
 * 		|->../abstractExternalDB.js
 */

test.suites.externalDBMock = {};
test.suites.externalDBMock.vars = {};

var suite = test.suites.externalDBMock;
var vars = suite.vars;

suite.login_attempt = function(assert)
{
	var suite = test.suites.externalDBMock;
	var vars = suite.vars;

	var goodMail = vars.users[1].mail;
	var goodPass = vars.users[1].password;
	assert.ok(vars.DB.log_user(goodMail, goodPass), "user identified");
	var badMail = "je_ne_suis_meme_pas_un_mail";
	var badPass = "";
	assert.notOk(vars.DB.log_user(badMail, badPass), "foreigner not identified");
}

suite.create_event = function(assert)
{
	var suite = test.suites.externalDBMock;
	var vars = suite.vars;

	var evt = {
		name : "folle réunion de tdlog chez adèle",
		owner : 0,
		part : [1, 2, 3, 4],
		pos : new Position(0., 0.),
		addr : "chez adèle BIATCH",
		date : "17/01/2016"}

	var mail = vars.users[evt.owner].mail;
	var pass = vars.users[evt.owner].password;

	vars.DB.create_event(
			mail,
			pass,
			evt.name,
			evt.addr,
			evt.lat,
			evt.lon,
			evt.part,
			evt.date
			);
	var db_evt = vars.DB.events[vars.DB.eventId];
	assert.equal(db_evt.name, evt.name);
	assert.equal(db_evt.address, evt.addr);
	assert.equal(db_evt.participants, evt.part);
	assert.equal(db_evt.date, evt.date);
	assert.equal(db_evt.owner, evt.owner);
}

suite.get_user_id = function(assert)
{
	var suite = test.suites.externalDBMock;
	var vars = suite.vars;

	var mail = vars.users[0].mail;
	assert.equal(vars.DB.get_user_id(mail), 0);
}

suite.set_pass = function(assert)
{
	var suite = test.suites.externalDBMock;
	var vars = suite.vars;

	var goodMail = vars.users[1].mail;
	var goodPass = vars.users[1].password;
	var newPass = "toto";
	vars.DB.set_pass(goodMail,  goodPass, newPass);
	assert.equal(newPass, vars.DB.users[1].password, "password changed");
	var badMail = "je_ne_suis_meme_pas_un_mail";
	var badPass = "";
	assert.throws(function(){vars.DB.set_pass(badMail,  badPass, newPass)}, new CommonException(1000), "exception wrong identification");
}

suite.add_user = function(assert)
{
	var suite = test.suites.externalDBMock;
	var vars = suite.vars;

	var goodUser = {
		name : "jane",
		surname : "doe",
		mail : "jane.doe@gmail.com",
		tel : "+33648751227",
		password : "peanutButter"
	}

	var badMail = {
		name : "michel",
		surname : "perrier",
		mail : "_michel.perrier@gmail.com",
		tel : "+336487512",
		password : "tmux"
	}

	vars.DB.add_user(goodUser.name,
		goodUser.surname,
		goodUser.mail,
		goodUser.tel,
		goodUser.password);

	var users_equal = function(usr1, usr2)
	{
		return usr1.name == usr2.name &&
			usr1.surname == usr2.surname &&
			usr1.mail == usr2.mail &&
			usr1.tel == usr2.tel &&
			usr1.password == usr2.password;
	}

	assert.ok(users_equal(vars.DB.users[vars.DB.currentId], goodUser));

	assert.throws(function(){
		vars.DB.add_user(badMail.name,
			badMail.surname,
			badMail.mail,
			badMail.tel,
			badMail.password);
	}, new CommonException(1002), "Exception 1002 when adding bad mail do DB");
	assert.throws(function(){
		vars.DB.add_user("",
			"",
			goodUser.mail,
			"+33640404040",
			"");
	}, new CommonException(1001), "Exception 1001 when adding same user");
}

suite.is_mail = function(assert)
{
	var suite = test.suites.externalDBMock;
	var vars = suite.vars;

	var goodMail = "a.correct.mail@mailer.com";
	var badMail1 = "_incorrect.mail@mailer.com";
	var badMail2 = "incorrect.mail";
	var badMail3 = "incorrect.mail@com";
	var badMail4 = "incorr&ct.mail@mailer.com";

	assert.ok(vars.DB.is_mail(goodMail), goodMail);
	assert.notOk(vars.DB.is_mail(badMail1), badMail1);
	assert.notOk(vars.DB.is_mail(badMail2), badMail2);
	assert.notOk(vars.DB.is_mail(badMail3), badMail3);
	assert.notOk(vars.DB.is_mail(badMail4), badMail4);
}

suite.is_tel = function(assert)
{
	var suite = test.suites.externalDBMock;
	var vars = suite.vars;

	var goodTel = "+33650544817";
	var badTel = "0650544817";

	assert.ok(vars.DB.is_tel(goodTel), goodTel);
	assert.notOk(vars.DB.is_tel(badTel), badTel);
}

suite.setUp = function() {
	var suite = test.suites.externalDBMock;
	var vars = suite.vars;

	vars.users = Array(
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

	vars.users[0].friends_id = [1, 2, 3, 4];
	vars.users[1].friends_id = [0, 2];
	vars.users[2].friends_id = [0, 1];
	vars.users[3].friends_id = [0, 4];
	vars.users[4].friends_id = [0, 3];

	vars.events = Array(new mock.external.Event(1,
				"partouze entre amis chez jacquie et michel",
				2,
				[1,2,3,4],
				new Position(0., 0.),
				"Merci qui?",
				"16/09/1993")
			);
	vars.DB = new mock.external.externalDB(4, vars.users, vars.events);
	vars.DB.eventId = 0;
}

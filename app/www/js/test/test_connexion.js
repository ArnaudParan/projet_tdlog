/* dependencies : 
 * 	|-> ../connexion.js
 * 	|-> test_main.js
 * 		|-> Qunit
*/

//QUnit.test("login_attempt", test.test_login_attempt);
//QUnit.test("is_mail", test.test_is_mail);

//login suite creation
test.suites.login = {};
test.suites.login.vars = {};

test.suites.login.vars.arnaud = {"mail":"paranarnaud@gmail.com", "pass":"0000"}
test.suites.login.vars.simon = {"mail":"simon.lebastard@eleves.enpc.fr", "pass":"111"}

test.suites.login.login_attempt = function(assert)
{
	var user1 = {"mail":"no@exception.thrown", "pass":"test"}
	var user2 = {"mail":"exception_thrown", "pass":"error"}

	var test_user = function(user)
	{
		var mail = user["mail"];
		var pass = user["pass"];
		login_attempt(mail, pass, mock_login_request);
	}
	test_user(test.suites.login.vars.arnaud);
	test_user(test.suites.login.vars.simon);
	assert.throws(function(){test_user(user1)},
			new CommonException(1000),
			"Exception 1000 when identification failed");
	assert.throws(function(){test_user(user2)},
			new CommonException(2001),
			"Exception 2001 when email is wrong");
}

test.suites.login.is_mail = function(assert)
{
	goodMail = "a.correct.mail@mailer.com";
	badMail1 = "_incorrect.mail@mailer.com";
	badMail2 = "incorrect.mail";
	badMail3 = "incorrect.mail@com";
	badMail4 = "incorr&ct.mail@mailer.com";

	assert.ok(is_mail(goodMail));
	assert.notOk(is_mail(badMail1));
	assert.notOk(is_mail(badMail2));
	assert.notOk(is_mail(badMail3));
	assert.notOk(is_mail(badMail4));
}

mock_login_request = function(mail, pass)
{
	var is_user = function(mail, pass, user)
	{
		usrMail = user["mail"];
		usrPass = user["pass"];
		return mail == usrMail && pass == usrPass;
	}

	if (!(is_user(mail, pass, test.suites.login.vars.arnaud) ||
		is_user(mail, pass, test.suites.login.vars.simon))) {
		throw new CommonException(1000);
	}
}

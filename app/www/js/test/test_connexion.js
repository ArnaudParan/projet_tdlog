/* dependencies : 
 * 	|-> ../connexion.js
 * 	|-> test_main.js
 * 		|-> Qunit
*/

//login suite creation
test.suites.login = {};
test.suites.login.vars = {};

test.suites.login.login_attempt = function(assert)
{
	/*
	var user2 = {mail :"exception_thrown", pass :"error"};

	var test_user = function(user)
	{
		var mail = user.mail;
		var pass = user.pass;
		login_attempt(mail, pass);
	}
	assert.throws(function(){test_user(user2)},
			new CommonException(2001),
			"Exception 2001 when email is wrong");
	*/
}

test.suites.login.is_mail = function(assert)
{
	goodMail = "a.correct.mail@mailer.com";
	badMail1 = "_incorrect.mail@mailer.com";
	badMail2 = "incorrect.mail";
	badMail3 = "incorrect.mail@com";
	badMail4 = "incorr&ct.mail@mailer.com";

	assert.ok(is_mail(goodMail), goodMail);
	assert.notOk(is_mail(badMail1), badMail1);
	assert.notOk(is_mail(badMail2), badMail2);
	assert.notOk(is_mail(badMail3), badMail3);
	assert.notOk(is_mail(badMail4), badMail4);
}

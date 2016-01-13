QUnit.test("login_attempt", test_login_attempt);
QUnit.test("is_mail", test_is_mail);

var arnaud = {"mail":"paran.arnaud@gmail.com", "pass":"0000"}
var simon = {"mail":"simon.lebastard@eleves.enpc.fr", "pass":"111"}

var mock_login_request = function(mail, pass)
{
	var is_user = function(mail, pass, user)
	{
		usrMail = user["mail"];
		usrPass = user["pass"];
		return mail == usrMail && pass == usrPass;
	}

	if (!(is_user(mail, pass, arnaud) ||
		is_user(mail, pass, simon))) {
		throw new CommonException(1000);
	}
}

function test_login_attempt(assert)
{
	var user1 = {"mail":"no@exception.thrown", "pass":"test"}
	var user2 = {"mail":"exception_thrown", "pass":"error"}

	var test_user = function(user)
	{
		var mail = user["mail"];
		var pass = user["pass"];
		login_attempt(mail, pass, mock_login_request);
	}
	test_user(arnaud);
	test_user(simon);
	assert.throws(function(){test_user(user1)},
			new CommonException(1000),
			"Exception 1000 when identification failed");
	assert.throws(function(){test_user(user2)},
			new CommonException(2001),
			"Exception 2001 when email is wrong");
}

function test_is_mail(assert)
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

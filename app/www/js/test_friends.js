
var users = Array({"name" : "paran",
			"surname" : "arnaud",
			"tel" : "+33650544817",
			"mail" : "paran.arnaud@gmail.com"},
		{"name" : "lebastard",
			"surname" : "simon",
			"tel" : "+33750332043",
			"mail" : "simon.lebastard@eleves.enpc.fr"}
		)
		
var users2 = Array({"name" : "paran",
			"surname" : "arnaud",
			"tel" : "+33650544817",
			"mail" : "paran.arnaud@gmail.com"}
		)

function test_search_user(assert)
{
}

var mock_get_all_friends = function ()
{
	return users;
}

var mock_get_req_friends = function (request)
{
	return users2;
}

function mock_user_searching(keyword)
{
	var corresponding_users = Array();
	for (var user in users) {
		if (keyword_correspondig_to_user(keyword, user)) {
			corresponding_users.concat(user);
		}
	}
	return corresponding_users;
}

function keyword_correspondig_to_user(keyword, user)
{
	if (corresponding_words(keyword, user["name"])){
		return true;
	}
	if (corresponding_words(keyword, user["surname"])){
		return true;
	}
	if (corresponding_words(keyword, user["tel"])){
		return true;
	}
	if (corresponding_words(keyword, user["mail"])){
		return true;
	}
	return false;
}

function corresponding_words(keyword, reference)
{
	return keyword == reference; //TODO return whether keyword is a substr
}

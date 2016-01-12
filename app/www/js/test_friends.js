
var users = Array({"name" : "paran",
			"surname" : "arnaud",
			"tel" : "+33650544817",
			"mail" : "paran.arnaud@gmail.com"},
		{"name" : "lebastard",
			"surname" : "simon",
			"tel" : "",
			"mail" : "simon.lebastard@eleves.enpc.fr"}
		)

function test_search_user(assert)
{
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

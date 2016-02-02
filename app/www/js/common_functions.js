function isEqual(exp, act)
{
	if (typeof(exp) !== "object" || typeof(act) !=="object") {
		return exp === act;
	}

	for (item in exp) {
		if (!isEqual(exp[item], act[item])) {
			return false;
		}
	}

	for (item in act) {
		if (!isEqual(exp[item], act[item])) {
			return false;
		}
	}
	return true;
}

function convertErrorCB(errorCB)
{
	if (typeof(errorCB) === "undefined") {
		return function(err)
		{
			console.log(err);
			throw err;
		};
	}
	else {
		return errorCB;
	}
}

function convertSuccessCB(successCB)
{
	if (typeof(successCB) === "undefined") {
		return function(){};
	}
	else {
		return successCB;
	}
}

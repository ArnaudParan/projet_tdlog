/* dependencies
 * 	|-> Qunit
*/

//namsepace test creation
var test = {
	Author : "Arnaud Paran",
	Version : "1.0",
	//a suite is added with test.suites.suiteName = {}
	//functions are added to a suite with test.suites.suiteName.functionName = function(assert)
	//with conventions of setUp, tearDown and var as reserved words
	suites : {}
};

test.load_tests = function(){
	for (suiteName in this.suites) {
		var suite = this.suites[suiteName];
		this.load_suite(suiteName, suite);
	}
};

test.load_suite = function(suiteName, suite) {
	this.create_suite(suiteName, suite);
	for (funcName in suite) {
		var func = suite[funcName];
		this.load_test_function(funcName, func);
	}
};

test.create_suite = function(suiteName, suite) {
	var setUpTearDown = {};
	if (typeof suite.setUp != "undefined") {
		setUpTearDown.beforeEach = suite.setUp;
	}
	if (typeof suite.tearDown != "undefined") {
		setUpTearDown.afterEach = suite.tearDown;
	}
	QUnit.module(suiteName, setUpTearDown);
};

test.load_test_function = function(funcName, func) {
	if (funcName != "tearDown" && funcName != "setUp" && funcName != "vars") {
		QUnit.test(funcName, func);
	}
};

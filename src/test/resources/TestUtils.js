var Assert = Java.type("org.junit.Assert");
var jsAssert = {};
var TestCase = Java.type("org.eclairjs.nashorn.TestCase");
var ComparisonFailure = Java.type("org.junit.ComparisonFailure");


function assertEquals()
{
	if (arguments.length>2)
	  Assert.assertEquals(arguments[0],arguments[1],arguments[2])
	else
	  Assert.assertEquals(arguments[0],arguments[1])

}

function assertTrue()
{
	if (arguments.length>1)
	  Assert.assertTrue(arguments[0],arguments[1])
	else
	  Assert.assertTrue(arguments[0])

}

function assertFalse()
{
	if (arguments.length>1)
	  Assert.assertFalse(arguments[0],arguments[1])
	else
	  Assert.assertFalse(arguments[0])

}

function assertContains()
{
	if (arguments.length>2)
	{
	  var msg=arguments[0];
	  var res=arguments[1];
	  var substr=arguments[2];
	}
	else
	{
	  var msg="Does not contain substring";
	  var res=arguments[0];
	  var substr=arguments[1];
	}
	if (res.indexOf(substr)<0)
		throw new ComparisonFailure(msg, substr, res);
}


function assertIntegerEquals() {
		if (arguments.length>2)
    	{
    	  var msg=arguments[0];
    	  var a=arguments[1];
    	  var b=arguments[2];
    	}
    	else
    	{
    	  var msg="ComparisonFailure";
    	  var a=arguments[0];
    	  var b=arguments[1];
    	}
	if (a === b) return;
	throw new ComparisonFailure(msg, a, b);
}

jsAssert.assertEquals = function() {

	if (a === b) return;
	throw new ComparisonFailure("Expected <" + a + "> but was <" + b + ">", a, b);
}

var console = {
	log: function(text) {
		print(text );
	}
}

var newStub = function() {
	return 	{
		called: [],
		__noSuchMethod__:  function(name, arg0, arg1, arg2, arg3, arg4, arg5) {
			var desc = {
				name: name,
				args: []
			};

			var args =  arguments;
			for (var i =  1; i < args.length; i++){
				if (typeof args[i] == "undefined") continue;
				desc.args.push(args[i]);
			}
			this.called.push(desc);
		},

		assertCalled: function(description) {

			var fnDescToString = function(desc) {
				return desc.name + "("+ desc.args.join(",") +")";
			};

			if (this.called.length < 1) Assert.fail('No functions called, expected: ' + fnDescToString(description));

			for (var i = 0; i < this.called.length; i++) {
				var fn = this.called[i];
				if (fn.name == description.name) {
					if (description.args.length != fn.args.length) continue;

					for (var j = 0; j < description.args.length; j++) {
						if (fn.args[j] == description.args[j]) return;
					}
				}
			}

			Assert.fail('No matching functions called. expected: ' +
					'<' + fnDescToString(description) + ")>" +
					' but had ' +
					'<' + this.called.map(fnDescToString).join("|") + '>'
			);
		}
	};
};

var tests = function(testObject) {
	var testCases = new java.util.ArrayList();
	for (var name in testObject) {
		if (testObject.hasOwnProperty(name) && typeof testObject[name] === "function") {
			testCases.add(new TestCase(name,testObject[name]));
		}
	}
	return testCases;
};
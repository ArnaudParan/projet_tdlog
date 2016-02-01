QUnit.module("common_functions");

QUnit.test("isEqual" , function(assert)
	{
		var expected = {
			a : 0,
			b : 0,
			c : 0
		};

		var subsetExp = {
			a : {
				b : 1,
				c : 2
			}
		}

		var subsetAct = {
			a : {
				b : 1,
				c : 2
			}
		}

		var copy = {
			a : 0,
			b : 0,
			c : 0
		};

		var subSet = {
			a : 0,
			b : 0
		};

		var extension = {
			a : 0,
			b : 0,
			c : 0,
			d : 0
		};
		assert.ok(isEqual(copy, expected), "Case when it is equal");
		assert.ok(isEqual(subsetAct, subsetExp), "Case when it has subsets");
		assert.notOk(isEqual(subSet, expected), "with a subset");
		assert.notOk(isEqual(extension, expected), "with an extension");
	}
);

var assert = require("assert");
var deepReduce = require("..");

var flattenDeep = function (array) {
  var length = array == null ? 0 : array.length;
  return length
    ? deepReduce(
        array,
        function (memo, value) {
          memo.push(value);
          return memo;
        },
        []
      )
    : [];
};

describe("flatten methods", function () {
  var array = [1, [2, [3, [4]], 5]];

  it("should treat sparse arrays as dense", function () {
    var array = [[1, 2, 3], Array(3)],
      expected = [1, 2, 3];

    expected.push(undefined, undefined, undefined);
    var actual = flattenDeep(array);
    assert.deepStrictEqual(actual, expected);
    assert.ok("4" in actual);
  });

  // it.only("should work with extremely large arrays", function () {
  //   var expected = Array(5e5);
  //   try {
  //     assert.deepStrictEqual(flattenDeep([expected]), expected);
  //   } catch (e) {
  //     assert.ok(false, e.message);
  //   }
  // });

  it("should work with empty arrays", function () {
    var array = [[], [[]], [[], [[[]]]]];

    assert.deepStrictEqual(flattenDeep(array), []);
  });

  it("should support flattening of nested arrays", function () {
    assert.deepStrictEqual(flattenDeep(array), [1, 2, 3, 4, 5]);
  });

  it("should return an empty array for non array-like objects", function () {
    var expected = [],
      nonArray = { "0": "a" };

    assert.deepStrictEqual(flattenDeep(nonArray), expected);
  });
});

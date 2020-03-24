var assert = require('assert');

var reduceDeep = require('..');

function flattenDeep(array) {
  var length = array == null ? 0 : array.length;

  return length
    ? reduceDeep(
        array,
        function (memo, value) {
          memo.push(value);
          return memo;
        },
        []
      )
    : [];
}

describe('flatten methods', function () {
  it('should treat sparse arrays as dense', function () {
    var array = [[1, 2, 3], Array(3)];
    var expected = [1, 2, 3];

    expected.push(undefined, undefined, undefined);
    var actual = flattenDeep(array);
    assert.deepStrictEqual(actual, expected);
    assert.ok('4' in actual);
  });

  // it("should work with extremely large arrays", function () {
  //   var expected = Array(5e5);
  //   try {
  //     assert.deepStrictEqual(flattenDeep([expected]), expected);
  //   } catch (e) {
  //     assert.ok(false, e.message);
  //   }
  // });

  it('should work with empty arrays', function () {
    var array = [[], [[]], [[], [[[]]]]];

    assert.deepStrictEqual(flattenDeep(array), []);
  });

  it('should support flattening of nested arrays', function () {
    var array = [1, [2, [3, [4]], 5]];

    assert.deepStrictEqual(flattenDeep(array), [1, 2, 3, 4, 5]);
  });

  it('should return an empty array for non array-like objects', function () {
    var nonArray = { '0': 'a' };

    assert.deepStrictEqual(flattenDeep(nonArray), []);
  });
});

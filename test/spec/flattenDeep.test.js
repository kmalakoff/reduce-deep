var assert = require('assert');
var constant = require('lodash.constant');

var reduceDeep = require('../..');

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

/**
 * Converts `array` to an `arguments` object.
 *
 * @private
 * @param {Array} array The array to convert.
 * @returns {Object} Returns the converted `arguments` object.
 */
function toArgs(array) {
  return function () {
    return arguments;
  }.apply(undefined, array);
}

var args = toArgs([1, 2, 3]);

describe('flatten methods', function () {
  it('should flatten `arguments` objects', function () {
    var array = [args, [args]];

    assert.deepEqual(flattenDeep(array), [1, 2, 3, 1, 2, 3]);
  });

  it('should treat sparse arrays as dense', function () {
    var array = [[1, 2, 3], Array(3)];
    var expected = [1, 2, 3];

    expected.push(undefined, undefined, undefined);
    var actual = flattenDeep(array);
    assert.deepEqual(actual, expected);
    assert.ok('4' in actual);
  });

  it('should flatten objects with a truthy `Symbol.isConcatSpreadable` value', function () {
    if (typeof Symbol === 'undefined' || !Symbol.isConcatSpreadable) return;
    var object = { '0': 'a', length: 1 };
    var array = [object];
    var expected = constant(['a'])();

    object[Symbol.isConcatSpreadable] = true;
    var actual = flattenDeep(array);
    assert.deepEqual(actual, expected);
  });

  // TODO: figure out how to handle sparse arrays
  // it('should work with extremely large arrays', function () {
  //   var expected = Array(5e5);
  //   try {
  //     assert.deepEqual(flattenDeep([expected]), expected);
  //   } catch (e) {
  //     assert.ok(false, e.message);
  //   }
  // });

  it('should work with empty arrays', function () {
    var array = [[], [[]], [[], [[[]]]]];

    assert.deepEqual(flattenDeep(array), []);
  });

  it('should support flattening of nested arrays', function () {
    var array = [1, [2, [3, [4]], 5]];

    assert.deepEqual(flattenDeep(array), [1, 2, 3, 4, 5]);
  });

  it('should return an empty array for non array-like objects', function () {
    var nonArray = { '0': 'a' };

    assert.deepEqual(flattenDeep(nonArray), []);
  });
});

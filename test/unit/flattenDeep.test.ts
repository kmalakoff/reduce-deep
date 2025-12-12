import assert from 'assert';
import constant from 'lodash.constant';

import reduceDeep from 'reduce-deep';

function flattenDeep(array) {
  const length = array == null ? 0 : array.length;

  return length
    ? reduceDeep(
        array,
        (memo, value) => {
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
  // biome-ignore lint/complexity/noArguments: Apply arguments
  return (() => arguments).apply(undefined, array);
}

const args = toArgs([1, 2, 3]);

describe('flatten methods', () => {
  it('should flatten `arguments` objects', () => {
    const array = [args, [args]];

    assert.deepEqual(flattenDeep(array), [1, 2, 3, 1, 2, 3]);
  });

  it('should treat sparse arrays as dense', () => {
    const array = [[1, 2, 3], Array(3)];
    const expected = [1, 2, 3];

    expected.push(undefined, undefined, undefined);
    const actual = flattenDeep(array);
    assert.deepEqual(actual, expected);
    assert.ok('4' in actual);
  });

  it('should flatten objects with a truthy `Symbol.isConcatSpreadable` value', () => {
    if (typeof Symbol === 'undefined' || !Symbol.isConcatSpreadable) return;
    const object = { 0: 'a', length: 1 };
    const array = [object];
    const expected = constant(['a'])();

    object[Symbol.isConcatSpreadable] = true;
    const actual = flattenDeep(array);
    assert.deepEqual(actual, expected);
  });

  // TODO: figure out how to handle sparse arrays
  // it('should work with extremely large arrays', function () {
  //   let expected = Array(5e5);
  //   try {
  //     assert.deepEqual(flattenDeep([expected]), expected);
  //   } catch (e) {
  //     assert.ok(false, e.message);
  //   }
  // });

  it('should work with empty arrays', () => {
    const array = [[], [[]], [[], [[[]]]]];

    assert.deepEqual(flattenDeep(array), []);
  });

  it('should support flattening of nested arrays', () => {
    const array = [1, [2, [3, [4]], 5]];

    assert.deepEqual(flattenDeep(array), [1, 2, 3, 4, 5]);
  });

  it('should return an empty array for non array-like objects', () => {
    const nonArray = { 0: 'a' };

    assert.deepEqual(flattenDeep(nonArray), []);
  });
});

## reduce-deep

Deep reduce an array.

```
var reduceDeep = require('reduce-deep');
var assert = require('assert');

function flattenDeep(array) {
  return reduceDeep(
    array,
    function (memo, value) {
      memo.push(value);
      return memo;
    },
    []
  );
}

var array1 = [1, [2, [3, [4]], 5]];
assert.deepStrictEqual(flattenDeep(array1), [1, 2, 3, 4, 5]);

var array2 = [[], [[]], [[], [[[]]]]];
assert.deepStrictEqual(flattenDeep(array2), []);
```

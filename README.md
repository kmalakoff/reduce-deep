# reduce-deep

Reduce the non-array values in a nested array into one result.

```bash
npm install reduce-deep
```

```js
import reduceDeep from 'reduce-deep';

const values = [1, [2, [3, 4]], 5];
const total = reduceDeep(values, (sum, value) => sum + value, 0);

console.log(total); // 15
```

The reducer receives `(memo, value, containingArray, index)`. Arrays,
`arguments` objects, and values marked with `Symbol.isConcatSpreadable` are
traversed recursively.

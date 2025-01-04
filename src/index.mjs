import isFlattenable from 'isflattenable';

function reduceDeep(array, fn, options) {
  let value;
  for (let i = 0; i < array.length; i++) {
    value = array[i];
    if (isFlattenable(value)) options.memo = reduceDeep(value, fn, options);
    else options.memo = fn(options.memo, value, array, i);
  }

  return options.memo;
}

export default function reduceDeeep(array, fn, memo) {
  const options = { memo: memo };
  reduceDeep(array, fn, options);
  return options.memo;
}

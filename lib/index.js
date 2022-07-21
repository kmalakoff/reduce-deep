var isFlattenable = require('isflattenable');

function reduceDeep(array, fn, options) {
  var value;
  for (var i = 0; i < array.length; i++) {
    value = array[i];
    if (isFlattenable(value)) options.memo = reduceDeep(value, fn, options);
    else options.memo = fn(options.memo, value, array, i);
  }

  return options.memo;
}

module.exports = function (array, fn, memo) {
  var options = { memo: memo };
  reduceDeep(array, fn, options);
  return options.memo;
};

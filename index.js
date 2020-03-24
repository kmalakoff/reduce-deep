function deepReduce(array, fn, options) {
  var value;

  for (var i = 0; i < array.length; i++) {
    value = array[i];
    if (Array.isArray(value)) options.memo = deepReduce(value, fn, options);
    else options.memo = fn(options.memo, value, array, i);
  }

  return options.memo;
}

module.exports = function (array, fn, memo) {
  var options = { memo };
  deepReduce(array, fn, options);
  return options.memo;
};

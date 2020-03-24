var reduceDeep = require('./reduceDeep');

module.exports = function flattenDeep(array) {
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
};

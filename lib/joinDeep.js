var reduceDeep = require('./reduceDeep');

module.exports = function joinDeep(array, sep) {
  var length = array == null ? 0 : array.length;
  var hasJoined = false;

  return length
    ? reduceDeep(
        array,
        function (memo, value) {
          if (hasJoined) memo += sep;
          else hasJoined = true;
          if (value !== undefined) memo += value;
          return memo;
        },
        ''
      )
    : '';
};

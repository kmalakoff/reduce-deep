"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return reduceDeeep;
    }
});
var _isflattenable = /*#__PURE__*/ _interop_require_default(require("isflattenable"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function reduceDeep(array, fn, options) {
    var value;
    for(var i = 0; i < array.length; i++){
        value = array[i];
        if ((0, _isflattenable.default)(value)) options.memo = reduceDeep(value, fn, options);
        else options.memo = fn(options.memo, value, array, i);
    }
    return options.memo;
}
function reduceDeeep(array, fn, memo) {
    var options = {
        memo: memo
    };
    reduceDeep(array, fn, options);
    return options.memo;
}
/* CJS INTEROP */ if (exports.__esModule && exports.default) { try { Object.defineProperty(exports.default, '__esModule', { value: true }); for (var key in exports) { exports.default[key] = exports[key]; } } catch (_) {}; module.exports = exports.default; }
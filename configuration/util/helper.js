"use strict";
exports.__esModule = true;
var path = require("path");
var _root = path.resolve(__dirname, "..", "..");
function root() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [_root].concat(args));
}
exports.root = root;

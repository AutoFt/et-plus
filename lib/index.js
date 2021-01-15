"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gulp_1 = require("gulp");
var config_1 = require("./utils/config");
var gen_vars_1 = require("./utils/gen-vars");
var task_1 = require("./utils/task");
exports.init = function (filePath) {
    filePath = {}.toString.call(filePath) === "[object String]" ? filePath : "";
    return gen_vars_1.init(filePath);
};
exports.run = function (opts) {
    if (opts === void 0) { opts = {}; }
    var _build = function () { return task_1.build(opts); };
    var _fonts = function () { return task_1.fonts(opts); };
    return gulp_1.series(_build, _fonts);
};
exports.watch = function (opts) {
    task_1.fonts(opts);
    return gulp_1.watch(opts.localVarsPath || config_1.default.localVarsPath, function () { return task_1.build(opts); });
};

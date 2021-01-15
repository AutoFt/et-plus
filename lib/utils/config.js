"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
exports.packageJson = {};
try {
    exports.packageJson = require(path_1.resolve(process.cwd(), "./package.json"));
}
catch (err) { }
var config = Object.assign({
    outFolderPath: "./theme",
    localVarsPath: "./element-variables.scss",
    elementTheme: "element-plus/packages/theme-chalk/",
    minimize: false,
}, exports.packageJson["et-plus"]);
exports.themePath = path_1.resolve(process.cwd(), "./node_modules/" + config.elementTheme);
exports.default = config;

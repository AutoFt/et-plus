"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var ora = require("ora");
var config_1 = require("./config");
exports.varsPath = path_1.resolve(config_1.themePath, "./src/common/var.scss");
exports.check = function () {
    if (!fs_1.existsSync(exports.varsPath)) {
        ora("please install `element-plus`").fail();
        process.exit(1);
    }
};
exports.init = function (filePath) {
    var spinner = ora("Generator variables file").start();
    var _filePath = path_1.resolve(process.cwd(), filePath ? filePath : config_1.default.localVarsPath);
    if (fs_1.existsSync(_filePath)) {
        spinner.text = "Variables file already exists.";
        spinner.fail();
    }
    else {
        fs_1.writeFileSync(_filePath, fs_1.readFileSync(exports.varsPath), "utf-8");
        spinner.succeed();
    }
    return Promise.resolve("End of mission");
};

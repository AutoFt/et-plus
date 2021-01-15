#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var config_1 = require("../utils/config");
var gen_vars_1 = require("../utils/gen-vars");
var index_1 = require("../index");
var opts = {};
var program = commander_1.version(config_1.packageJson.version)
    .option("-i --init [filePath]", "init variables file")
    .option("-w --watch", "watch variable changes then build")
    .option("-o --out [outPath]", "output path", function (out) {
    opts.outFolderPath = out;
})
    .option("-m --minimize", "compressed file", function (minimize) {
    opts.minimize = minimize !== "false";
})
    .option("-c --config [filePath]", "variables file", function (c) {
    opts.localVarsPath = c;
})
    .parse(process.argv);
gen_vars_1.check();
if (program.init) {
    index_1.init(program.init).then(function () { return process.exit(1); });
}
program.watch ? index_1.watch(opts) : index_1.run(opts)();
process.on("exit", function () { return console.log("End of mission"); });

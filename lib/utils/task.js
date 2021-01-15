"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gulp_1 = require("gulp");
var path_1 = require("path");
var fs_1 = require("fs");
var gulp_sass_1 = require("gulp-sass");
var nop = require("gulp-nop");
var cssmin = require("gulp-cssmin");
var ora = require("ora");
var autoprefixer = require("gulp-autoprefixer");
var rename = require("gulp-rename");
var config_1 = require("./config");
var gen_vars_1 = require("./gen-vars");
var noElPrefixFile = /(index|base|display)/;
exports.fonts = function (opts) {
    var spin = ora("build theme font").start();
    var stream = gulp_1.src(path_1.resolve(config_1.themePath, "./src/fonts/**"))
        .pipe(opts.minimize || config_1.default.minimize ? cssmin({ showLog: false }) : nop())
        .pipe(gulp_1.dest(path_1.resolve(opts.outFolderPath || config_1.default.outFolderPath, "./fonts")))
        .on("end", function () { return spin.succeed(); });
    return stream;
};
exports.build = function (opts) {
    var spin = ora("build element theme").start();
    fs_1.writeFileSync(gen_vars_1.varsPath, fs_1.readFileSync(path_1.resolve(process.cwd(), opts.localVarsPath || config_1.default.localVarsPath)), "utf-8");
    var stream = gulp_1.src(path_1.resolve(config_1.themePath, "./src/*.scss"))
        .pipe(gulp_sass_1.sync())
        .pipe(autoprefixer({ cascade: false }))
        .pipe(opts.minimize || config_1.default.minimize ? cssmin({ showLog: false }) : nop())
        .pipe(rename(function (path) {
        if (!noElPrefixFile.test(path.basename)) {
            path.basename = "el-" + path.basename;
        }
    }))
        .pipe(gulp_1.dest(opts.outFolderPath || config_1.default.outFolderPath))
        .on("end", function () { return spin.succeed(); });
    return stream;
};

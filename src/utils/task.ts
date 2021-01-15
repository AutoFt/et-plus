import { dest, src } from "gulp";
import { resolve } from "path";
import { readFileSync, writeFileSync } from "fs";
import { sync } from "gulp-sass";
import nop = require("gulp-nop");
import cssmin = require("gulp-cssmin");
import ora = require("ora");
import autoprefixer = require("gulp-autoprefixer");
import rename = require("gulp-rename");
import config, { IConfig, themePath } from "./config";
import { varsPath } from "./gen-vars";

const noElPrefixFile = /(index|base|display)/;

export const fonts = (opts: Partial<IConfig>) => {
  const spin = ora("build theme font").start();
  const stream = src(resolve(themePath, "./src/fonts/**"))
    .pipe(opts.minimize || config.minimize ? cssmin({ showLog: false }) : nop())
    .pipe(dest(resolve(opts.outFolderPath || config.outFolderPath, "./fonts")))
    .on("end", () => spin.succeed());
  return stream;
};

export const build = (opts: Partial<IConfig>) => {
  const spin = ora("build element theme").start();
  writeFileSync(
    varsPath,
    readFileSync(
      resolve(process.cwd(), opts.localVarsPath || config.localVarsPath)
    ),
    "utf-8"
  );
  const stream = src(resolve(themePath, `./src/*.scss`))
    .pipe(sync())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(opts.minimize || config.minimize ? cssmin({ showLog: false }) : nop())
    .pipe(
      rename((path) => {
        if (!noElPrefixFile.test(path.basename)) {
          path.basename = `el-${path.basename}`;
        }
      })
    )
    .pipe(dest(opts.outFolderPath || config.outFolderPath))
    .on("end", () => spin.succeed());
  return stream;
};

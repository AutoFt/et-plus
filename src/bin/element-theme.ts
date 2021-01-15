#!/usr/bin/env node
import { version } from "commander";
import { IConfig, packageJson } from "../utils/config";
import { check } from "../utils/gen-vars";
import { init, watch, run } from "../index";

const opts: Partial<IConfig> = {};

const program = version(packageJson.version)
  .option("-i --init [filePath]", "init variables file")
  .option("-w --watch", "watch variable changes then build")
  .option("-o --out [outPath]", "output path", (out) => {
    opts.outFolderPath = out;
  })
  .option("-m --minimize", "compressed file", (minimize) => {
    opts.minimize = minimize !== "false";
  })
  .option("-c --config [filePath]", "variables file", (c) => {
    opts.localVarsPath = c;
  })
  .parse(process.argv);

check();

if (program.init) {
  init(program.init).then(() => process.exit(1));
}

program.watch ? watch(opts) : (run(opts) as () => void)();

process.on("exit", () => console.log("End of mission"));

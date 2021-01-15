import { existsSync, readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import ora = require("ora");
import config, { themePath } from "./config";

export const varsPath = resolve(themePath, "./src/common/var.scss");

export const check = () => {
  if (!existsSync(varsPath)) {
    ora("please install `element-plus`").fail();
    process.exit(1);
  }
};

export const init = (filePath: string) => {
  const spinner = ora("Generator variables file").start();
  const _filePath = resolve(
    process.cwd(),
    filePath ? filePath : config.localVarsPath
  );
  if (existsSync(_filePath)) {
    spinner.text = "Variables file already exists.";
    spinner.fail();
  } else {
    writeFileSync(_filePath, readFileSync(varsPath), "utf-8");
    spinner.succeed();
  }
  return Promise.resolve("End of mission");
};

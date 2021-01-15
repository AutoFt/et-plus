import { series, watch as _watch } from "gulp";
import config, { IConfig } from "./utils/config";
import { init as _init } from "./utils/gen-vars";
import { build, fonts } from "./utils/task";

export const init = (filePath: string) => {
  filePath = {}.toString.call(filePath) === "[object String]" ? filePath : "";
  return _init(filePath);
};

export const run = (opts: Partial<IConfig> = {}) => {
  const _build = () => build(opts);
  const _fonts = () => fonts(opts);
  return series(_build, _fonts);
};

export const watch = (opts: Partial<IConfig>) => {
  fonts(opts);
  return _watch(opts.localVarsPath || config.localVarsPath, () => build(opts));
};

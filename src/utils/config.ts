import { resolve } from "path";

interface IPackageJson {
  readonly version: string;
  readonly etPlus: IConfig;
}

export interface IConfig {
  localVarsPath: string;
  outFolderPath: string;
  elementTheme: string;
  minimize: boolean;
}

export let packageJson: Partial<IPackageJson> = {};

try {
  packageJson = require(resolve(process.cwd(), "./package.json"));
} catch (err) {}

const config: IConfig = Object.assign(
  {
    outFolderPath: "./theme",
    localVarsPath: "./element-variables.scss",
    elementTheme: "element-plus/packages/theme-chalk/",
    minimize: false,
  },
  packageJson["etPlus"]
);

export const themePath = resolve(
  process.cwd(),
  `./node_modules/${config.elementTheme}`
);

export default config;

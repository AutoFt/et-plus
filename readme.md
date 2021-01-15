# element-theme-plus-ts

用于 Element-Plus 的主题生成器 cli 工具。

## 安装

```
npm i et-plus -D
```

## 使用

> 生成配置文件

```
./node_module/.bin/et -i [path]
```

> 根据配置文件生成主题

```
./node_module/.bin/et -o [path]
```

> 监听配置文件自动生成主题

```
./node_module/.bin/et -w
```

## Config

通过`package.json`配置:

```json
{
  "etPlus": {
    "outFolderPath": "./theme",
    "localVarsPath": "./element-variables.scss",
    "elementTheme": "element-plus/packages/theme-chalk/",
    "minimize": false
  }
}
```

## License

MIT

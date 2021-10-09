## webpack实践练习项目1

> 参考掘金文章-9个主要课题 [一步步从零开始用 webpack 搭建一个大型项目](https://juejin.cn/post/6844904007903772679)

> [完整24个课题模仿参照项目源码](https://github.com/yezishan/webpack-box)
### 前言

- 核心所用版本
  - "webpack": "^4.41.2"
  - "webpack-cli": "^3.3.10"
  - node 10.16.3
  - "webpack-dev-server": "^3.9.0"

本文从下面几个课题来实现

- 课题 1：[初探 webpack？探究 webpack 打包原理](#1)
- 课题 2：[搭建开发环境跟生产环境](#2)
- 课题 3：[基础配置之loader](#3)
- 课时 4：[webpack性能优化](#4)
- 课时 5：[手写loader实现可选链](#5)
- 课时 6：[webpack编译优化](#6)
- 课时 7：[多页面配置](#7)
- 课时 8：[手写一个webpack插件](#8)
- 课时 9：[构建 ssr](#9)

## 课题7. 多页面配置
- 注意
  - **弃用**： npm run build & npm run dev & npm run dll
  - **改成**： box build & box dev & box dll
  - **link**： npm link 将 box 命令链接到全局

- 本章内容
  - 使用
  - 改造为脚手架
  - 多页面配置
- 用到的新包
  - commander 命令行工具包


### 使用

```js
box build // # 不加参数则会编译所有页面，并清空 dist
box dev   // # 默认编译 index 页面

// # index2 是指定编译的页面。不会清空 dist
// # report 开启打包分析
box build index2 --report 
box dev index2 --report 
```

### 改造为脚手架
- 新增bin文件夹和box.config.js配置文件
- 在packagejson文件中新增
```js
"bin": {
    "box": "bin/box.js"
  },
// 新增完后，执行npm link后 ，本地就可以执行box命令了，
```


- 分成三个命令，进行不同操作

- build
- dev
- dll


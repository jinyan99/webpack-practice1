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

## 课题9. 构建ssr
> https://www.timsrc.com/article/35/server-side-rendering





本章概要

### 创建 box build:ssr
### 编译 ssr
与其他的编译没有什么区别，值得住的是

```js
target 指定为 umd 模式
globalObject 为 this
入口改为 ssr.jsx
```
```js
.libraryTarget('umd')
.globalObject('this')
```
- 新建build/ssr.js文件,上述操作都在该文件中更改即可

### 编译 jsx 语法

- 因为我们是用 react 写的，避免不了会用到 jsx 语法，所以我们需要在 babel-loader 中使用 @babel/preset-react
- 见config/babelLoader.js文件
`npm i @babel/preset-react -D`

- config/babelLoader.js
```js
if (tsx) {
  babelConf.presets.push('@babel/preset-react');
}
```

### 入口区分服务端/客户端
使用执行webpack构建命令时，执行ssr命令时，判断document不存在就是服务端，存在就是客户端。区分服务端跟客户端分别渲染，详见src/ssr.js文件
### 服务端渲染

将打包出来的 static 文件夹作为一个服务
访问 http://127.0.0.1:8080，进入服务端渲染的页面
再执行一遍 ssr.js 进行事件绑定

### 小结


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

#### 要实现的功能
```js
// 安装
npm i -g webpack-box
// 使用
webpack-box dev   # 开发环境
webpack-box build # 生产环境
webpack-box dll   # 编译差分包
webpack-box dev index   # 指定页面编译（多页面）
webpack-box build index # 指定页面编译（多页面）
webpack-box build index --report # 开启打包分析
webpack-box build:ssr  # 编译ssr
webpack-box ssr:server # 在 server 端运行

// 打包分析
npm run build --report # 开启打包分析
```


### <a id="1">课题1. 探究webpack打包原理</a>

> 都是简单的配置，见文章

#### 解析bundle如何加载模块

- bundle 是一个立即执行函数，可以认为它是把所有模块捆绑在一起的一个巨型模块。
- webpack 将所有模块打包成了 bundle 的依赖，通过一个对象注入

#### 动态import加载原理

#### 使用webpack-chain重写配置


### <a id="2">课题2. 搭建开发环境跟生产环境</a>
#### 需要的包
- ora：ora包用于命令行加载中显示加载中的效果，类似于前端页面的loading效果
#### 目录

见课题2分支目录
#### 通过webpack-chain实现可插拔配置

> 见build/base.js内容

- 作者这种可插拔配置的方式相当于webpack的基础配置文件，和config下内容直接写在一个文件中相比看起来更高级点，这个自动读取你的新增配置文件扩展你的基础通用webpakc配置文件，这就叫可插拔。
- 然后最终生成的这个build/base的基础配置文件就相当于webpack官方文档中的webpack.common.js通用配置文件。然后huildjs，devjs就是根据不同模式下的最终使用版webpack配置文件
#### 构建生产环境

> 见build/build.js

#### 构建开发环境（devserver）

#### 提取css

#### 自动生成html

#### 项目测试



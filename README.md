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

## 课题4. webpack性能优化

### 分离manifest,runtime,

```js
module.exports = (config, resolve) => {
  return () => {
    config
      .optimization
      // .runtimeChunk({
      //   name: "manifest"
      // })
      .runtimeChunk('single')
      // 实质类似的，只是名字不一样，分离出runtime chunk
  }
}
```


### Code spliting 代码分割

- 使用动态 import 或者 require.ensure 语法，在第一节已经讲解
- 使用 [babel-plugin-import](https://blog.csdn.net/weixin_43487782/article/details/118559079) 插件按需引入一些组件库

### Bundle spliting 打包分割 三方依赖

- 将公共的包提取到 chunk-vendors 里面，比如你require('vue')，webpack 会将 vue 打包进 chunk-vendors.bundle.js
- 用optimization.splitChunks选项配置

- 这个拆包出三房依赖，必须是项目代码里引入模块并使用的，才会触发`cacheGroups.vendors`分割三方依赖包功能，如引入lodash并使用了其中方法
```js
module.exports = (config, resolve) => {
  return () => {
    config
      .optimization.splitChunks({
        chunks: 'async',
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 3,
        maxInitialRequests: 3,
        cacheGroups: {
          vendors: {
            name: `chunk-vendors`, // 这个
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: 'initial'
          },
          common: {
            name: `chunk-common`,
            minChunks: 2,
            priority: -20,
            chunks: 'initial',
            reuseExistingChunk: true
          }
        }
      })
    config.optimization.usedExports(true)
  }
}

```

### Tree shaking 摇树

```js
// config/optimization.js
config.optimization.usedExports(true);
// src/treeShaking.js
export function square(x) {
  return x * x;
}

export function cube(x) {
  return x * x * x;
}

```
使用了 Tree Shaking
这里只导出了 cube 函数，并没有将 square 导出去

当然你可以看见 square 函数还是在 bundle 里面，但是在压缩的时候就会被干掉了，因为它并没有被引用


#### 如何使用tree-shaking？

- 确保代码是es6格式,即 export，import
- package.json中，设置 sideEffects
- 确保 tree-shaking 的函数没有副作用
- babelrc中设置presets [["@babel/preset-env", { "modules": false }]] 禁止转换模块，交由webpack进行模块化处理
- 结合uglifyjs-webpack-plugin

- 其实在 webpack4 我们根本不需要做这些操作了，因为 webpack 在生产环境已经帮我们默认添加好了，开箱即用！


### 开启gzip

- HTTP协议上的gzip编码是一种用来改进web应用程序性能的技术，web服务器和客户端（浏览器）必须共同支持gzip。目前主流的浏览器，Chrome,firefox,IE等都支持该协议。

简单来说，gzip是一种压缩技术。经过gzip压缩后页面大小可以变为原来的30%甚至更小，这样，用户浏览页面的时候速度会快得多。

- gzip文章：https://blog.csdn.net/sinat_34849421/article/details/114313031

```js
// CompressionWebpackPlugin.js
const CompressionWebpackPlugin = require('compression-webpack-plugin');

module.exports = (config, resolve) => {
  return () => {
    config.plugin('CompressionWebpackPlugin').use(CompressionWebpackPlugin, [
      {
        algorithm: 'gzip',
        test: /\.js(\?.*)?$/i,
        threshold: 10240,
        minRatio: 0.8
      }
    ]);
  };
};

```
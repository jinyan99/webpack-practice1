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

## 课题5. 手写loader实现可选链

### 什么是webpack-loader

webpack loader 是 webpack 为了处理各种类型文件的一个中间层，webpack 本质上就是一个 node 模块，它不能处理 js 以外的文件，那么 loader 就帮助 webpack 做了一层转换，将所有文件都转成字符串，你可以对字符串进行任意操作/修改，然后返回给 webpack 一个包含这个字符串的对象，让 webpack 进行后面的处理。如果把 webpack 当成一个垃圾工厂的话，那么 loader 就是这个工厂的垃圾分类！


### 可选链介绍

这里并不是纯粹意义上的可选链，因为 babel 跟 ts 都已经支持了，我们也没有必要去写一个完整的可选链，只是来加深一下对 loader 的理解， loader 在工作当中能帮助我们做什么？
用途 当我们访问一个对象属性时不必担心这个对象是 undefined 而报错，导致程序不能继续向下执行
解释 在 ? 之前的所有访问链路都是合法的，不会产生报错

```js
const obj = {
  foo: {
    bar: {
      baz: 2
    }
  }
}

console.log(obj.foo.bar?.baz) // 2
// 被转成 obj && obj.foo && obj.foo.bar && obj.foo.bar.baz
console.log(obj.foo.err?.baz) // undefined
// 被转成 obj && obj.foo && obj.foo.err && obj.foo.err.baz

```

### loader实现可选链
配置loader，options-chain-loader

```js
// config/OptionsChainLoader.js
module.exports = (config, resolve) => {
  const baseRule = config.module.rule('js').test(/.js|.tsx?$/);
  const normalRule = baseRule.oneOf('normal');
  return () => {
    normalRule
      .use('options-chain')
      .loader(resolve('options-chain-loader'))
  }
}

```

#### 实现原理
可选链问好修饰符----es6的语法用自定义loader实现

其实就是正则替换，loader 将整个文件全部转换成字符串，content 就是整个文件的内容，对 content 进行修改，修改完成后再返回一个新的 content 就完成了一个 loader 转换。是不是很简单？
下面的操作意思就是，我们匹配 obj.foo.bar?. 并把它转成 obj && obj.foo && obj.foo.bar && obj.foo.bar.

> 具体见options-chain-loader.js文件


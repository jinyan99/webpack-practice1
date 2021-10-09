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

## 课题6. webpack编译优化

### cache-loader

cache-loader 主要是将打包好的文件缓存在硬盘的一个目录里，一般存在 node_modules/.cache 下，当你再次 build 的时候如果此文件没有修改就会从缓存中读取已经编译过的文件，只有有改动的才会被编译，这样就大大降低了编译的时间。尤其是项目越大时越明显。

此项目使用前后数据对比 3342ms --> 2432ms 效果还是比较明显：构建编译时间能明显减少1000ms左右

这里只对 babel 加入了 cache-loader，因为我们的 ts/js 都是由 babel 进行编译的，不需要对 ts-loader 缓存（我们也没有用到

> 见config/cacheLoader.js文件

### DllPlugin
DllPlugin 是将第三方长期不变的包与实际项目隔离开来并分别打包，当我们 build 时再将已经打包好的 dll 包引进来就 ok 了
我提取了两个包 vue、react，速度差不多提升了 200ms，从 2698ms 到 2377ms
**打包 dll**：见build/dll.js，config/BundleAnalyzerPlugin
**将dll合并**：见config/useDllPlugin.js


### threadLoader
测试效果变差了 😅，线程数越小编译速度越快
> 见threadLoader.js

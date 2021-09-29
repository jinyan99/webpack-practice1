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

## 课题3. 基础配置之loader，ts、babel、css、less、sass、postcss

目录是这样的
|---- build
|---- lib
│──── config                // 配置目录
│   │── babelLoader.js      // babel-loader 配置
│   │── ForkTsChecker.js    // ts 静态检查
│   │── FriendlyErrorsWebpackPlugin.js // 友好错误提示
│   └── style
│──── src                   // 开发目录
│   │── style
│   │  │── app.css
│   │  │── index.less       // 测试 less
│   │  │── index.scss       // 测试 sass
│   │  └── index.postcss    // 测试 postcss
│   └── ts
│     └── index.ts          // 测试 ts
│── babel.js
│── postcss.config.js       // postcss 配置
│── tsconfig.json           // ts 配置
└──── dist                  // 打包后的目录
   │── app.bundle.js
   │── app.css
   └── index.html

### 配置 babel

- 见babelLoader.js文件

### 使用 babel 配置 ts

这里我们使用 babel 插件 @babel/preset-typescript 将 ts 转成 js，并使用 ForkTsCheckerWebpackPlugin、ForkTsCheckerNotifierWebpackPlugin 插件进行错误提示


### ts 静态类型检查

- 见config/ForkTsCheckerjs文件

### 友好错误提示插件

- 见FriendlyErrorsWebpackPlugin.js文件

### 配置样式，style，css、less、sass、postcss 等

- 见config/style.js文件

### postcss 配置

> https://www.jianshu.com/p/a52889370871

- postcss-loader可参考上面文章，这个loader还支持第三方插件的扩展，可以写在webpack配置文件中配置loader的options选项中，也可以在根目录下新建postcss.config.js配置文件会自动注入上下文。
  - 其中就可支持autoprefixer自动补齐前缀插件用在post-cssloader中，还有个postcss-px-to-viewport自动转换多端逻辑像素插件
- 插入postcss-loader配置，然后再根目录下写postcss配置文件
- 见postcss.config.js文件

```js
"postcss-loader": "^3.0.0",
"postcss-px-to-viewport": "^1.1.1",
"autoprefixer": "^10.3.6",
```


### 配置 autoprefixer

- 借助post-css-loader 配合使用的 autoprefixer 插件包自动补齐css前缀 `npm install --save -dev autoprefixer`
- 将该插件用在postcss配置文件中

### 编译前后css对比

### 开启 source map

- 当在源文件下会有一行注释，证明开启了 sourcemap `/*# sourceMappingURL=app.css.map*/` 



### 规范git提交

> 工具参考文档：https://www.cnblogs.com/mengfangui/p/12634845.html

- 规范提交commitizen
```js
"config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  }
```

- 生成git变更日志：conventional-changelog-cli：从git metadata生成变更日志。
> 切记：生成日志前必须更新下版本号`npm version prepatch -m "..."`，否则日志生成无效

- 至于vue-cli-plugin-commitlint插件 是基于vue封装的，git规范工具，详细另百度
  - 结合 `commitizen` `commitlint` `conventional-changelog-cli` `husky`，进行封装，一键安装，开箱即用的 `git commit` 规范。

### git husky 功能添加

- 需要安装 commitlint 工具
- "@commitlint/config-conventional": "^8.2.0",
- "commitlint": "^8.2.0",
- "vue-cli-plugin-commitlint": "^1.0.4",

###
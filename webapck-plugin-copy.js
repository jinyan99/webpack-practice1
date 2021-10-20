const fs = require('fs-extra')// node 的扩展文件系统模块
const globby = require('globby')// 目录文件查找的工具，支持多模式匹配

class CopyDirWebpackPlugin {
  constructor(options) {
    this.options = options;
  }
  // 入口函数 调用插件时候执行的
  apply(compiler) {
    const opt = this.options
    // done钩子事件的接口 执行这个回调
    compiler.plugin('done', (stats) => {
      if (process.env.NODE_ENV === 'production') {
        (async ()=>{
          const toFilesPath = await globby([`${opt.to}/**`, '!.git/**'])
          toFilesPath.forEach(filePath => fs.removeSync(filePath))// 删除
          const fromFilesPath = await globby([`${opt.from}/**`]) // 获取
          fromFilesPath.forEach(fromPath => {
            const cachePath = fromPath
            fromPath = fromPath.replace('dist', opt.to)
            const dirpaths = fromPath.substring(0, fromPath.lastIndexOf('/'))
            fs.mkdirpSync(dirpaths)
            fs.copySync(cachePath, fromPath)
          })
          console.log(`  完成copy ${opt.from} to ${opt.to}`)
        })()
      }
    });
  }
}

module.exports = CopyDirWebpackPlugin
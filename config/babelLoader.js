module.exports = ({config, resolve}) => {
  const baseRule = config.module.rule('js').test(/.js|.tsx?$/);
  const babelPath = resolve('babel.js')// 源码层面路径
  const babelConf = require(babelPath);
  const version = require(resolve('node_modules/@babel/core/package.json')).version
  return () => {
    baseRule
      .use('babel')
      // 应用层面路径
      .loader(require.resolve('babel-loader'))
      // 用require()查询模块位置，不加载模块内容，只返回解析的绝对路径文件名
      // require.resolve：是从目录node_modules中寻找该模块 返回路径文件名 ------ 适用于安装的第三方包文件名查找
      // resolve：用resolve是从当前进程执行路径下寻找该文件如从根目录下寻找.gitignore文件，返回文件内容 ---- 适用于自本地文件
      .options(babelConf({ version }))
   }
}
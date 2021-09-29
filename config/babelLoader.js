module.exports = (config, resolve) => {
  const baseRule = config.module.rule('js').test(/.js|.tsx?$/);
  const babelPath = resolve('babel.js')// 源码层面路径
  const babelConf = require(babelPath);
  const version = require(resolve('node_modules/@babel/core/package.json')).version
  return () => {
    baseRule
      .use('babel')
      // 应用层面路径
      .loader(require.resolve('babel-loader'))// 用require()查询模块位置，不加载模块内容，只返回解析的绝对路径文件名
      .options(babelConf({ version }))
   }
}
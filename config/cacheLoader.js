module.exports = ({config, resolve}) => {
  const baseRule = config.module.rule('js').test(/.js|.tsx?$/);
  const babelPath = resolve('babel.js')
  const babelConf = require(babelPath);
  const version = require(resolve('node_modules/@babel/core/package.json')).version
  return () => {
    baseRule
      .exclude
      .add(filepath => {
        // 不缓存 node_modules 下的文件
        return /node_modules/.test(filepath)
      })
      .end()
      .use('cache-loader')
      // 为项目使用cache-loader，作为编译优化手段，缓存构建好的包
      .loader('cache-loader')
      .options({
        // 缓存位置
        cacheDirectory: resolve('node_modules/.cache/babel')
      })
  }
}

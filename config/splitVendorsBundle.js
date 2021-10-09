// 提取3方依赖 单独打包
module.exports = ({config, resolve}) => {
  return () => {
    config
      .optimization.splitChunks({
        chunks: 'async',// 仅对异步进行优化
        minSize: 30000, // 最小chunk 大小
        minChunks: 1,
        maxAsyncRequests: 3,
        maxInitialRequests: 3,
        cacheGroups: {
          vendors: {
            name: `chunk-vendors`,
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
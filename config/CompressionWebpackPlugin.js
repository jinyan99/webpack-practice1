// 开启gzip压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin');

module.exports = ({config, resolve}) => {
  return () => {
    config.plugin('CompressionWebpackPlugin').use(CompressionWebpackPlugin, [
      {
        algorithm: 'gzip', // 开启http协议适用的gzip压缩
        test: /\.js(\?.*)?$/i,
        threshold: 1024,// 起始点界值，chunks大小大于此值1000字节才去算法压缩
        minRatio: 0.8// 压缩比率
      }
    ]);
  };
};

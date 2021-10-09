module.exports = function (config) {
  return {
    entry: 'src/main.js',
    dist: 'dist',
    publicPath: '/common/',
    port: 8888,
    pages: {
      index: {
        entry: 'src/main.js',
        template: 'public/index.html',
        filename: 'index.html',
      },
      index1: {
        entry: 'src/main.js',
        template: 'public/index.html',
        filename: 'index2.html',
      }
    },
    chainWebpack(config) {
    }
  }
}
const config = require('./base')();
const webpack = require('webpack');
const chalk = require('chalk');
const WebpackDevServer = require('webpack-dev-server');
const port = 8181;
const publicPath = '/common/';

config.devServer
  .quiet(true) // 除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见。
  .hot(true)
  .https(false)
  .disableHostCheck(true)
  .publicPath(publicPath) // 指定浏览器从/common/下访问bundle，此选项优先级比contentBase高
  .clientLogLevel('none');


// 开启source-map映射
config.devtool('cheap-source-map'); // 低开销的source-map
// config.set('devtool', 'inline-source-map'); // 内联的source-map

const compiler = webpack(config.toConfig()); // 拿到编译实例

// 拿到 devServer 参数
const chainDevServer = compiler.options.devServer;
const server = new WebpackDevServer( // Nodejs用法对devServer支持 https://v4.webpack.docschina.org/configuration/dev-server/
  compiler,
  Object.assign(chainDevServer, {}) // 将options作为2参传入
);// 返回一个server

['SIGINT', 'SIGTERM'].forEach(signal => {
  process.on(signal, () => {// 监听信号事件就退出：http://nodejs.cn/api/process.html#process_signal_events
    server.close(() => {
      process.exit(0);// 退出进程成功码
    });
  });
});
// 监听端口
server.listen(port);// 监听端口

new Promise(() => {
  compiler.hooks.done.tap('dev', stats => { // 这个相当于自定义插件，用tap去某个编译时期注册事件，当webpack runtime中到了对应时期会自动触发call注册所有对应的回调
    const empty = '    ';
    const common = `App running at:
    - Local: http://127.0.0.1:${port}${publicPath}\n`;
    console.log(chalk.cyan('\n' + empty + common));
  });
});

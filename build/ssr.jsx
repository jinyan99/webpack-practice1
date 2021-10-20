
  const path = require('path');
  const Config = require('webpack-chain');
  const config = new Config();
  const webpack = require('webpack');
  const rimraf = require('rimraf');
  const ora = require('ora');
  const chalk = require('chalk');
  const PATHS = {
    build: path.join(process.cwd(), 'static'),
    ssrDemo: path.join(process.cwd(), 'src', 'ssr.jsx')
  };
  const resolve = p => {
  // process.cwd() ---> 这是当前执行进程消费者单店层面的路径，require.resolve()是提供者层面的模块文件路径
  return path.join(process.cwd(), p);
};
console.log('22----')
  require('../config/babelLoader')(config, resolve,'tsx:true')();
  require('../config/HtmlWebpackPlugin')(
    config,
    
    {
      publicPath: '/',
      filename: 'client.ssr.html'
    }
  })();
console.log('22----')
  config
    .entry('ssr')
    .add(PATHS.ssrDemo)
    .end()
    .set('mode', 'development') //  production
    .output.path(PATHS.build)
    .filename('[name].js')
    .libraryTarget('umd') // 库目标为umd模式，可以被es规范可以被commonjs规范使用
    .globalObject('this') // 全局对象为this
    .library('[name]') // 库名字
    .end();

  rimraf.sync(path.join(process.cwd(), PATHS.build));
  const spinner = ora('开始构建项目...');
  spinner.start();

  webpack(config.toConfig(), function(err, stats) {
    spinner.stop();
    if (err) throw err;
    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n'
    );

    if (stats.hasErrors()) {
      console.log(chalk.red('构建失败\n'));
      process.exit(1);
    }
    console.log(chalk.cyan('build完成\n'));
  });


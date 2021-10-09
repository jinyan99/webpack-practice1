module.exports = (options) => {


const rimraf = require('rimraf');
const ora = require('ora'); // 命令行loading+进度条
const chalk = require('chalk'); // 日志颜色工具
const path = require('path');

// // 删除 dist 目录
// rimraf.sync(path.join(process.cwd(), 'dist'));
// 删除 dist 目录
options.clear && rimraf.sync(path.join(process.cwd(), 'dist'))

const config = require('./base')(options);
const webpack = require('webpack');
const spinner = ora('开始构建项目...');
spinner.start();

 if(typeof options.chainWebpack === 'function') {
    options.chainWebpack(config)
  }

// 采用nodejs方式执行webpack API而不是webpack-cli执行
webpack(config.toConfig(), function(err, stats) {
  spinner.stop();
  if (err) throw err;
  process.stdout.write(// 这块输出是构建打包成功后输出的dist目录chunks信息；console.log就是基于它实现,
    stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false, // 添加 chunk 信息（设置为 `false` 能允许较少的冗长输出）
      chunkModules: false // 将构建模块信息不添加到 chunk 信息
    }) + '\n\n'
  );

  if (stats.hasErrors()) {
    console.log(chalk.red('构建失败\n'));
    process.exit(1); // 0是成功 1是失败
  }

  console.log(chalk.cyan('build完成\n'));
});
}
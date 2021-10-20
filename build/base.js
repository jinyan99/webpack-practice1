const { findSync } = require('../lib');
const Config = require('webpack-chain');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const config = new Config();
const files = findSync('config'); // 同步读取文件夹下所有文件组成的数组
const path = require('path');
const resolve = p => {
  // process.cwd() ---> 这是当前执行进程消费者单店层面的路径，require.resolve()是提供者层面的模块文件路径
  return path.join(process.cwd(), p);
};
console.log(files,'看文件路径数组')

module.exports = () => {
  // 以后多用map，少用对象
  const map = new Map();

  files.map(_ => {// _就是每个文件路径
    const name = _.split('/')
      .pop() // 得到config文件夹下所有文件名带js结尾的，如某次遍历得到了一个base字符串
      .replace('.js', '');
    return map.set(name, require(_)(config, resolve,'允许使用jsxtsx语法')); // 得到每个文件的抛出的函数，执行传入config参数，resolve回调参数
  });

  map.forEach((v, key) => {
     // css 配置
     if (key === 'css') {
      v('css', /\.css$/);
    } else {
      v()
    }
  });

  config
    .plugin('CleanWebpackPlugin清理dist')
    .use(CleanWebpackPlugin);

  return config;
};

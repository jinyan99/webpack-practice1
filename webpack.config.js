





const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const rimraf = require('rimraf');

// 删除 dist 目录, 个人感觉用clean插件就不用这个吧
// rimraf.sync('dist');

console.log(process.env.NODE_ENV,'12---')

module.exports = {
  mode: process.env.NODE_ENV, // 应该是基于cross-env的功劳可以直接在编译阶段访问
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin(), // 每次构建前清理 /dist 文件夹
  ]
}
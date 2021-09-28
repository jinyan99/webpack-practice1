// css 提取插件 MiniCssExtractPlugin 配置单元
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (config, resolve) => {
  return () => {
    config
      // .oneOf('normal')
      .plugin('mini-css-extract')
      .use(MiniCssExtractPlugin);
  };
};

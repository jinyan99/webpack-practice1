// 这里我们使用 babel 插件 @babel/preset-typescript 将 ts 转成 js，
// 并使用 ForkTsCheckerWebpackPlugin、ForkTsCheckerNotifierWebpackPlugin 插件进行错误提示

module.exports = function (api) {
  return {
    'presets': [
      [
        '@babel/preset-env',
        {
          targets: {
            chrome: 59,
            edge: 13,
            firefox: 50,
            safari: 8,
          },
        },
      ],
      [
        '@babel/preset-typescript', 
        {
          'allExtensions': true
        }
      ]
    ],
    'plugins': [
      '@babel/plugin-transform-typescript', 
      'transform-class-properties',
      '@babel/proposal-object-rest-spread'
    ],
    compact: false// 不启用紧凑模式生成代码，默认是超出500kb的包就紧凑失效了超出限制
  }
}
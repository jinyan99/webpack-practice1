module.exports = ({config, resolve, options}) => {
  let name = 'app',
    entry = options.entry || 'src/main.js',
    dist = options.dist || 'dist';
    publicPath = options.publicPath || '/'
  if (options.name) {
    name = options.name;
    dist = `${dist}/${name}`
    entry = options.pages[name].entry;
  }
  return () => {
    
    config
      // 入口名称
      .entry(name)
      // 入口路径
      .add(resolve(entry))
      .end()// 结束entry选项的配置
      // 模式 "production" | "development" | "none"
      // .mode(process.env.NODE_ENV) 等价下面
      .set('mode', process.env.NODE_ENV)
      // 出口
      .output
      .path(resolve(dist))
      .filename('[name].bundle.js')
      .publicPath(publicPath);
  }
}
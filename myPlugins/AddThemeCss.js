// // 处理源码拼接库
const { ConcatSource } = require('webpack-sources')

/**
 * 当然主题换肤思路有很多，也有更好的方案，下面目前项目里用的方案可以改进
 * 实现思路：主题换肤 --- 换肤实现上比较low，但可以练习插件写法
 * 1. 就是先提前在业务代码层面定义好css全局变量，放在:root伪类选择器上或根元素document上
 * 2. 然后代码里不用css写变量颜色，直接写规范的色值就行---其实这样不太好
 * 3. 在webpack emit阶段时，遍历assest/css目录下的css结尾的文件
 *   1. 将代码里具体的色值如#000，替换成编译时指定的全局变量名字--primary，替换成全局变量就行
 *    因为业务app组件入口时已经将全局变量声明好了
 *   2. 这样就方便代码运行时，方便动态更换全局变量的赋值，实现换肤
 */

class AddThemeCss {
  constructor(options = {}) {
    this.options = options;
  }

  apply(compiler) {
    const {
      target = 'css/styles.css',
      rules = [],
    } = this.options;
    // FIXME: 样式文件支持配置化, target 支持的格式为 string 和 regexp, 这里应该用 schema-utils 校验参数合法性
    const isString = typeof target === 'string';
    if (!(isString || target instanceof RegExp)) process.exit(1);
    const test = (v) => (isString ? v === target : target.test(v));
    compiler.hooks.emit.tap('AddThemeCss', (compilation) => {
      const { assets } = compilation;
      for (const assetPath of Object.keys(assets)) {
        if (test(assetPath)) {
          const source = Object.entries(rules).reduce(
            // 就是将业务代码里的具体色值如 #e94d3d 替换成 --yunzhi-primary-1 全局变量
            (result, [targetColor, rule]) => result.replace(rule, targetColor.startsWith('--') ? `var(${targetColor})` : targetColor),
            assets[assetPath].source(),
          );
          compilation.assets[assetPath] = new ConcatSource(source);
        }
      }
    });
  }
}

module.exports = AddThemeCss;

/**
 * 用法
 */
//  const addThemeCss = new AddThemeCss({
//   target: /css\/.*.css$/,
//   rules: {
//     '--yunzhi-primary-1': /(#e94d3d)/ig,
//     // 意思就是把css源码里的颜色值替换成全局变量，初始化时编译成替换全局变量，然后代码运行时，由代码动态更换全局变量的赋值即可实现主题换肤
//     // 替换成固定值不行，就没法在代码运行时动态更换变量了
//     '--yunzhi-primary-2': /(#f86442)/ig,
//     '--yunzhi-primary-3': /(#b98749)/ig,
//     '--yunzhi-seconary-1': /(#e6f7ff)/ig,
//   },
// });

// plugins: [addThemeCss]
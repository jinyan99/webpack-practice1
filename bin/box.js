#!/usr/bin/env node

const chalk = require('chalk')
const program = require('commander') // 命令行工具
const packageConfig = require('../package.json');
const { cleanArgs } = require('../lib')
const path = require('path')
const __name__ = `build,dev,dll`

let boxConf = {}
let lock = false

try {
  // 记住写固定名字的配置文件的 框架原理是这样读取的----利用process.cwd()加写死的配置文件名字
  boxConf = require(path.join(process.cwd(), 'box.config.js'))()
} catch (error) { }

// build构建命令
program
  .usage('<command> [options]')
  .version(packageConfig.version)
  .command('build [app-page]')
  .description(`构建开发环境`)
  .option('-r, --report', '打包分析报告')
  .option('-d, --dll', '合并差分包')
  .option('-u, --user', '查看用户名')
  .action(async (name, cmd) => {
    // 当box build index1 -ru命令执行后
    // name就是命令中<command>中的[app-page]对应的实际值，cmd就是后面的可选参数[options]组成的对象：{ report: true, user: true }
    console.log(name, cmd,'看action回调参数')
    // @TODO 版本可能不一样，导致cmd参数类型可能对不上 此时加options可选项会报错
    const options = cleanArgs({options:Object.keys(cmd)})
    const args = Object.assign(options, { name }, boxConf)
    if (lock) return
    lock = true;
    if (boxConf.pages) {
      console.log(boxConf.pages,'36-----')
      Object.keys(boxConf.pages).forEach(page => {
        args.name = page;
        require('../build/build')(args)
      })
    } else {
      require('../build/build')(args)
    }
  });

// dev命令
program
  .usage('<command> [options]')
  .version(packageConfig.version)
  .command('dev [app-page]')
  .description(`构建生产环境`)
  .option('-d, --dll', '合并差分包')
  .action(async (name, cmd) => {
    const options = cleanArgs(cmd)
    const args = Object.assign(options, { name }, boxConf)
    if (lock) return
    lock = true;
    require('../build/dev')(args)
  });

// dll命令
program
  .usage('<command> [options]')
  .version(packageConfig.version)
  .command('dll [app-page]')
  .option('-u, --user', '查看用户名')
  .description(`编译差分包`)
  .action(async (name, cmd) => {
    const options = cleanArgs(cmd)
    const args = Object.assign(options, { name }, boxConf)
    if (lock) return
    lock = true;
    require('../build/dll')(args)
  });


// 最后执行 解析argv参数 ----> program.parse方法用于解析process.argv，解析后可以program.xxx使用
program.parse(process.argv).args && program.parse(process.argv).args[0];
program.commands.forEach(c => c.on('--help', () => console.log('打印帮助help了')))


// 进程的argv参数数组，0位是node的执行路径。1位是当前文件的执行路径，2位开始才是用户传的node命令行参数
/**
  * 
  下面是box build index1 -ru 的 process.argv打印结果
  [ '/usr/local/bin/node',
  '/usr/local/bin/box',
  'build',
  'index1',
  '-ru' ]

 */
if (process.argv[2] && !__name__.includes(process.argv[2])) {
  console.log()
  console.log(chalk.red(`  没有找到 ${process.argv[2]} 命令`))
  console.log()
  program.help()
}

if (!process.argv[2]) {
  program.help()
}

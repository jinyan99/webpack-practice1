const fs = require('fs')
const path = require('path');
const join = path.join;


/**
 * @param startPath  起始目录文件夹路径
 * @returns {Array} 深度优先返回文件夹下所有文件路径组成的数组
 */
function findSync(startPath) {
  const result = []
  function finder(path) {
    const files = fs.readdirSync(path)
    files.forEach((val, index) => {
      const fPath = join(path, val)
      const stats = fs.statSync(fPath) // 返回该文件路径所得内容概括信息 是个对象
      if (stats.isDirectory()) finder(fPath) // 判断是不是文件夹
      if (stats.isFile()) result.push(fPath) // 判断是不是文件
    })
  }
  finder(join(path.resolve(__dirname, '..'), startPath))
  return result
}

/**
 * @param cmd  
 * @returns {Array} 
 */
function cleanArgs(cmd) {
  const args = {}
  cmd.options.forEach(o => {
    const key = camelize(o.long.replace(/^--/, ''))
    if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
      args[key] = cmd[key]
    }
  })
  return args
}

function camelize(str) {
  return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '')
}


exports.cleanArgs = cleanArgs
exports.findSync = findSync;
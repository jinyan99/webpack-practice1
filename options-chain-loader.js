// 自定义loader ---- 实现可选链问号语法

// loader 将整个文件全部转换成字符串，content 就是整个文件的内容，对 content 进行修改，修改完成后再返回一个新的 content 就
// 完成了一个 loader 转换。是不是很简单？
/**
  * new RegExp(/([\$_\w\.]+\?\.)/,'g')  \?\.转义成无意义字符 直接写.就代表通配符

 */
module.exports = function(content) {
  // console.log(content,'看loader过程中文件内容')
  return content.replace(new RegExp(/([\$_\w\.]+\?\.)/,'g'),function(res) {
    // acc.tty?.
    let str  = res.replace(/\?\./,'');// acc.tty
    let arrs = str.split('.'); // [acc, tty]
    let strArr = [];
    for(let i = 1; i <= arrs.length; i++) {
      strArr.push(arrs.slice(0,i).join('.'));// [acc, acc.tty] 
    }
    let compile = strArr.join('&&'); // acc && acc.tty
    const done = compile + '&&' + str + '.' // acc && acc.tty && acc.tty.
    return  done;
  });
};

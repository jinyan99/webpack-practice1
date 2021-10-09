import TS from './ts/index.ts'
import _ from 'lodash';
import { cube1 } from './treeShaking';

console.log(cube1(2),'5');

require('./style/index.css')
require('./style/app.css')
require('./style/index.less')
require('./style/index.scss')
require('./style/index.postcss')

new TS();
console.log(_.includes([3],3))
const h2 = document.createElement('h2')
h2.className = 'test'
h2.innerText = 'testaaa'
document.body.append(h2);
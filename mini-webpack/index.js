// commen js 方式
// var add = require('add.js').default;  //使用的default导出，这里require后使用default才代表add.js的函数

// console.log(add(1,2))

// es6
import add from './add.js';

console.log(add(1,2))

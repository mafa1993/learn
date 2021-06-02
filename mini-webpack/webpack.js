const fs = require('fs'); // node 的文件系统函数
const path = require('path'); // path处理使用

// babel引入
const parser = require('@babel/parser');  //生成AST语法树使用
const traverse = require('@babel/traverse').default;  //遍历AST语法树使用
const babel = require("@babel/core");

/**
 * 分析模块
 * @param {*} file  文件路径
 */
function  getModuleInfo(file) {
    // 读取文件
    const body = fs.readFileSync(file,'utf-8');

    // 代码字符串解析，分析依赖，相当于编译
    const ast = parser.parser(body,{
        sourceType:'module'  // 根据什么类型 引入模块
    });

    // 查找依赖 import
    const deps = {}; // 存储依赖

    traverse(ast,{
        // visitor 访问者
        ImportDeclaration({node}){
            const dirname = path.dirname(file);  // 获取路径

            const absPath = './' + path.join(dirname,node); // 计算相对路径，相对于入口的路径
            deps[node.source.value] = absPath;
            
            
        }
    });

    //es6=》es5
    const {code} = babel.transformFromAst(ast,null,{
        presets:['@babel/preset-env']
    });

    const moduleInfo = {
        file,
        deps,
        code
    };

    return moduleINfo;

}

// 测试是否可以获取路径，依赖，代码
const info = getModuleInfo('./src/index.js');
console.log('info',info);   // node webpack.js

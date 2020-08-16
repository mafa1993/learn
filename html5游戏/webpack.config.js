const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:{
        app:resolve("src/web/index.ts"),//主入口
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',

                }
            }
        ]
    },
    resolve:{
        extensions:['.ts','.js'],  //导入不到后缀的文件名时，以什么后缀寻找
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:resolve(__dirname,'./src/web/index.html')
        })
    ]
};
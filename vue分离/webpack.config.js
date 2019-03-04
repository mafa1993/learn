const VueLoaderPlugin = require('vue-loader/lib/plugin');
const WebpackSystemRegister = require('webpack-system-register');
const vuePlugin = require('vue-loader/lib/plugin');
module.exports = {
    entry: {
        index: "./src/index.vue"
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new WebpackSystemRegister({}),
        new vuePlugin()
    ]
};

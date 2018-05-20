const path = require('path');
const webpack = require('webpack');
const WebpackChunkHash = require("webpack-chunk-hash");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const SaveChunkManifestAsJs = require('./plugin/SaveChunkManifestAsJsPlugin');

const contentBase = process.cwd();

module.exports = {
    entry: {
        vendor: path.join(contentBase, 'src', 'js', 'vendor', 'lib.js'),
        main: path.join(contentBase, 'src', 'js', 'main.js')
    },
    output: {
        path: path.join(contentBase, 'dist'),
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
            })
        }]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'runtime'],
            minChunks: Infinity
        }),
        new WebpackChunkHash(),
        new ExtractTextPlugin({
            filename: 'css/[name]-[contenthash:7].css'
        }),
        // 导出chunk-mnifest.json为一个js文件
        new SaveChunkManifestAsJs()
    ]
}
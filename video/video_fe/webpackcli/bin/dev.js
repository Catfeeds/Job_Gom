const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const baseConfig = require('../webpack/webpack.base.conf');
// TODO: 获取统一的端口,域名等配置

const compiler = webpack(baseConfig);
const server = new WebpackDevServer(compiler, {
    // contentBase: process.cwd(), // 默认process.cwd()
    stats: {
        colors: true
    },
    publicPath: '/assets/',
    compress: false, // 是否开启gzip压缩
    port: 8080,
    historyApiFallback: false,
    host: '0.0.0.0',
    https: false,
    // lazy: true, // 此配置需配合filename选项
    open: true,
    // openPage: '', // 打开指定页面
    overlay: true, // full-screen overlay in the browser when there are compiler errors or warnings
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    proxy: {

    }
});

server.listen(8080, '0.0.0.0', () => {
    console.log('server start at 8080');
});

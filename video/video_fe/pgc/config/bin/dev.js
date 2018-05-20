var webpack = require('webpack');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const WebpackDevServer = require('webpack-dev-server');
const merge = require('webpack-merge');
const path = require('path');
const configFun = require('../webpack/common.conf.js');
const paths = require('../paths');
const baseWebpackConfig = require('./webpack.base.conf.js');
const env = require('./env.config');
const hostile = require('hostile');

let port = 80;
if ((env != 'lcdev' || env != 'lcvdev') && process.argv.length > 3) {
    port = process.argv[3];
}

const config = configFun(port);

if (env === 'dev' || env === 'pre' || env === 'production') {
    hostile.remove('127.0.0.1', config['hosts'][env], function (err) {
        if (err) {
            console.error(err)
        } else {
            console.log('remove /etc/hosts successfully!')
            hostile.set('127.0.0.1', config['hosts'][env], function (err) {
                if (err) {
                    console.error(err)
                } else {
                    console.log('set /etc/hosts successfully!')
                }
            });
        }
    });
    process.on('SIGINT', function() {
        hostile.remove('127.0.0.1', config['hosts'][env], function (err) {
            if (err) {
                console.error(err);
            } else {
                console.log('remove /etc/hosts successfully!');
                process.exit();
            }
        });
    });
}

console.log(config);
let webpackConfig = merge(baseWebpackConfig, {
    devtool: 'source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new FriendlyErrorsPlugin(),
        new HtmlWebpackPlugin({  //根据模板插入css/js等生成最终HTML
            filename: paths.dist + '/index.html', //生成的html存放路径，相对于 path
            template: paths.base + '/view/index.html', //html模板路径
            hash: false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(env)
            }
        }),
        new OpenBrowserPlugin({
             url: config.urls[env]
        }),
        new ExtractTextPlugin({
            filename: 'css/[name].css'
        })
    ]
});
const compiler = webpack(webpackConfig);


const server = new WebpackDevServer(compiler, {
    https: env === 'production',
    stats: {
        // `webpack --colors` equivalent
        colors: true,
        // Add errors
        errors: true,
        // Add details to errors (like resolving log)
        hash: true,
        // Sort the modules by a field
        modulesSort: "field",
    },
    historyApiFallback: true,
    hot: true,
    contentBase: process.cwd(),
    publicPath: config['publicPath'][env],
    // publicPath: 'http://js.dev.meixincdn.com/m/vpgc/dist',
    host: '0.0.0.0',
    port: port,
    disableHostCheck: true,
    compress: true,
    headers: {
        'Access-Control-Allow-Origin': '*' // 字体文件跨域
    },
    before: function(app){
        app.get('/m/vpgc/dist/js/runtime.js', function(req, res){
            res.send('(function(){console.log("runtime.js")})()');
        });
    },
    proxy: {
        '^/m/vpgc/dist/**/**': {
            target: config[env],
            secure: false,
            pathRewrite: function(p, req){
                console.log(p);
                // return p.replace(/\/pgc/, '');
                var r = /(.*\/.*)(-[\da-z]{7})(\.(?:js|css))/;
                var rimg = /(.*)(\.(?:png|gif|jpe?g))/;
                if(!r.test(p)){ // 重写图片
                    return p.replace(/\/m\/vpgc/, '');
                } else {
                    // 重写 '/m/vh5/dist/js/video_detail-1873949.js'
                    console.log(p.replace(r, function(input, $1, $2, $3){
                        return $1 + $3;
                    }));
                    return p.replace(r, function(input, $1, $2, $3){
                        return $1 + $3;
                    });
                }
            }
        }
    }
});

server.listen(port, "0.0.0.0", function() {
    // console.log(`Starting server on http://search.dev.video.api:${port}`);
    console.log(`http://localhost:${port}`);
});

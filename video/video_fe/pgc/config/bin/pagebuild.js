const path = require('path');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const chokidar = require('chokidar');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const paths = require('../paths');
const { renderAll } = require('./view.js');

const port = 4546;

const compiler = webpack({
    entry: {
        app: path.join(paths.pagebuild, 'pagebuild.js')/*,
        vendor: ['jquery', 'react', 'react-dom', 'redux']*/
    },
    output: {
        path: paths.dist,
        filename: 'js/[name].js'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            'css': paths.css
        }
    },
    module: {
        rules: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                include: [path.join(__dirname, '../../src/')],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader'
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function() {
                                return [
                                    require('autoprefixer')({
                                        browsers: ['Android >= 4.4', '> 1%'],
                                        remove: false
                                    })
                                ];
                            }
                        }
                    }, {
                        loader: 'sass-loader'
                    }]
                })
            }, {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [paths.js]
            }, {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    context: 'src/imgs',
                    publicPath: '../',
                    name: 'imgs/[path][name]-[hash:7].[ext]'
                }
            }, {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    context: 'src/fonts',
                    publicPath: '../',
                    name: 'fonts/[path][name]-[hash:7].[ext]'
                }
            }]
    },
    devtool: 'source-map',
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin({
            filename: 'css/[name].css'
        }),
/*        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'js/vendor.js',
            minChunks: Infinity
        }),*/
        new OpenBrowserPlugin({
            url: `http://localhost:${port}/pagebuild/html/`
        }),
    ]
});

const server = new WebpackDevServer(compiler, {
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
    contentBase: process.cwd(),
    publicPath: `/`,
    compress: true, // 开启gzip压缩
    host: '0.0.0.0',
    disableHostCheck: true,
    overlay: true,
    hot: true,
    headers: {
        'Access-Control-Allow-Origin': '*' // 字体文件跨域
    },
    proxy: {
        '^/vpgc/dist/**/**': {
            target: `http://localhost:${port}`,
            secure: false,
            pathRewrite: function(p, req){
                var r = /(.*\/.*)(\.(?:js|css))/;
                var rimg = /(.*\/.*)(\.(?:png|gif|jpe?g))/;
                //console.log(p);
                //console.log(p.replace(/\/vpgc/, ''));
                return p.replace(/\/vpgc\/dist/, '');
            }
        }
    }
});

const viewPath = path.join(paths.pagebuild, 'ejs');

chokidar.watch(viewPath)
    .on('add', filePath => renderAll())
    .on('change', filePath => renderAll())
    .on('unlink', filePath => renderAll());
renderAll();


server.listen(port, "0.0.0.0", function() {
    console.log(`Starting server on http://localhost:${port}`);
    // opn(`http://localhost:${config.port}`);
});

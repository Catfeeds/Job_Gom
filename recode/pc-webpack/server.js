'use strict';

var fs = require('fs');
var path = require('path');
var express = require('express');
var webpack = require('webpack');
var proxyMiddleware = require('http-proxy-middleware');
//var WebpackDevServer = require('webpack-dev-server');

let app = express();
let config = require('./webpack.config');
let compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
	hot: true,
	historyApiFallback: true,
	inline: true,
	progress: true,
	stats: {
		colors: true,
	}
}));

//代理服务器   后代restful地址 api接口
app.use('/api', proxyMiddleware({
  target: 'http://www.baidu.com/',
  changeOrigin: true
}));

app.use(require('webpack-hot-middleware')(compiler));

//将其他路由，全部返回index.html
app.get('*', (req, res) => {
  res.redirect('/dist/html');
})

app.get('/dist/html', (req, res) => {
  res.sendFile(path.resolve(__dirname, './dist/html/index.html'));
})

app.listen(3000, () => {
  console.log('service opened.');
})

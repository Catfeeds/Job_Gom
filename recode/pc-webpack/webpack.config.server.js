'use strict';

var webpack = require('webpack');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

let config = require('./webpack.config');

config.devServer = {
  historyApiFallback : true,
  hot : true,
  inline : true,
  contentBase : '/dist',
  port : 3000,

  proxy : {
    '/api/**' : {
      target : "http://www.baidu.com/",
      logLevel : 'debug',
      secure : false,
      changeOrigin : true
    }
  }
}

config.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new OpenBrowserPlugin({
    url: 'http://localhost:3000/dist/html/index.html'
  })
);

module.exports = config;

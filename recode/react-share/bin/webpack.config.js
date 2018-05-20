var webpack = require('webpack');
var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: './src/app.js',
  output: {
      path: path.resolve(__dirname, '..', 'build'),
      filename: "bundle.js"
  },
  devtool: 'eval-source-map',
  module: {
      rules: [{
          test: /\.js[x]?$/,
          exclude: /node_modules/,
          use: [{
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'stage-0', 'react']
            }
          }],
      }, {
          test: /\.css$/,
          loader: "style-loader!css-loader"
      }]
  },
  devServer : {
    historyApiFallback : true,
    hot : true,
    inline : true,
    contentBase : '/build',
    port : 3000
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: "react-Component",
      filename: "index.html",
			template: "./src/template/index.html",
      inject : 'body',
  		minify : {
        removeComments: true,
        collapseWhitespace: false
  		},
			chunksSortMode: 'dependency'
		}),
  ]
};

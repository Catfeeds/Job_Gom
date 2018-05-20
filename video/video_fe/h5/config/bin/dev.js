const path = require('path');
const opn = require('opn');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const chokidar = require('chokidar');

const paths = require('../paths');
const config = require('../webpack/common.conf.js');
const webpackConfig = require('../webpack/webpack.dev.conf.js');
const { renderAll } = require('./view.js');

const compiler = webpack(webpackConfig);

const server = new WebpackDevServer(compiler, {
	stats: 'none',
	contentBase: process.cwd(),
	publicPath: 'http://js.pre.meixincdn.com/m/vh5/dist',
	compress: true, // 开启gzip压缩
	host: '0.0.0.0',
	disableHostCheck: true,
	headers: {
		'Access-Control-Allow-Origin': '*'
	},
	proxy: {
		'^/m/vh5/dist/**/**': {
            target: 'http://js.pre.meixincdn.com',
            secure: false,
            pathRewrite: function(path, req){
            	// var s = '/m/vh5/dist/js/video_detail-1873949.js'
            	var r = /(.*\/.*)(-.*)(\.(?:js|css))/;
            	return path.replace(r, function(input, $1, $2, $3){
            		return $1 + $3;
            	});
            }
        }
	}
});

const viewPath = path.join(paths.view, 'ejs');
const viewSrcPath = path.join(paths.view, 'ejs', 'page');
function renderFor(filePath) {
	if (filePath.indexOf(viewSrcPath) === 0) {
		render(filePath);
	}
}
chokidar.watch(viewPath)
	.on('add', filePath => renderAll())
	.on('change', filePath => renderAll())
	.on('unlink', filePath => renderAll());


server.listen(config.port, "0.0.0.0", function() {
	console.log(`Starting server on http://localhost:${config.port}`);
	// opn(`http://localhost:${config.port}`);
});

const path = require('path');
const opn = require('opn');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const chokidar = require('chokidar');

const paths = require('../paths');
const config = require('../webpack/common.conf.js');
const env = require('../webpack/env.conf');
const webpackConfig = require('../webpack/webpack.dev.conf.js');
const { renderAll } = require('./view.js');

const compiler = webpack(webpackConfig);

const server = new WebpackDevServer(compiler, {
	stats: 'none',
	contentBase: process.cwd(),
    /*https: true,*/
	publicPath: 'http://js.dev.meixincdn.com/m/vm/dist',
	compress: true, // 开启gzip压缩
	host: '0.0.0.0',
	disableHostCheck: true,
	headers: {
        'Access-Control-Allow-Origin': '*' // 字体文件跨域
	},
	proxy: {
		'^/m/vm/dist/**/**': {
            target: 'http://js.dev.meixincdn.com',
            secure: false,
            pathRewrite: function(p, req){
            	var r = /(.*\/.*)(-.*)(\.(?:js|css))/;
            	var rimg = /(.*)(\.(?:png|gif|jpe?g))/;
            	if(!r.test(p)){ // 重写图片
            		return p.replace(/\/m\/vm/, '');
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
	renderAll();
//const viewPath = path.join(paths.view, 'ejs');
//
//if (env === 'dev') {
//	let ck = chokidar.watch(viewPath);
//  ck.on('add', filePath => renderAll())
//      .on('change', filePath => renderAll())
//      .on('unlink', filePath => renderAll());
//  renderAll();
//}


server.listen(config.port, "0.0.0.0", function() {
	console.log(`Starting server on http://localhost:${config.port}`);
	// opn(`http://localhost:${config.port}`);
});

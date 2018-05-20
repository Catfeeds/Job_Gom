const paths = require('../paths');

module.exports = {
	assetsRoot: paths.dist,
	port: process.argv.length > 3 ? process.argv[3] : 80,
	publicPath: {
		dev: 'http://js.dev.meixincdn.com/m/vm/dist',  // http://js.dev.meixincdn.com
		pre: 'http://js.pre.meixincdn.com/m/vm/dist', // http://js-pre.meixincdn.com/CDN8080
		production: 'https://js.meixincdn.com/m/vm/dist' // https://js.meixincdn.com
	}
};

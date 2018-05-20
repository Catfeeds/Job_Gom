var path = require('path');
var fs = require('fs');
var eslint = require('rollup-plugin-eslint');
var commonjs = require('rollup-plugin-commonjs');
var nodeResolve = require('rollup-plugin-node-resolve');
var typescript = require( 'rollup-plugin-typescript');
var env = process.env.NODE_ENV || 'production';

var config = {
    entry: path.join(__dirname, '../src/index.js'),
    plugins: [
        // eslint(),
        commonjs({
            include: 'node_modules/**',
            extensions: [
                '.js'
            ]
        }),
        nodeResolve({
            browser: true
        }),
        typescript({
			typescript: require('typescript'),
			include: ['**/*.ts', '**/*.js'],
			exclude: ['node_modules/**']
		})
    ]
};

if (env === 'dev') {
    var distDir = path.join(__dirname, '../../../dist/js');

    if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir);
    }
    module.exports = Object.assign({
        format: 'umd',
        moduleName: 'customModule',
        dest: path.join(distDir, 'index.js')
    }, config);
} else {
    module.exports = config;
}

const path = require('path');

const ora = require('ora');
const chalk = require('chalk');
const inquirer = require('inquirer');
const webpack = require('webpack');
const env = require('../webpack/env.conf');
console.log(env);
const webpackConfig = require('../webpack/webpack.prod.conf.js');

process.env.NODE_ENV = env;

const spinner = ora(`building for ${process.env.NODE_ENV} ...`);
spinner.start();

webpack(webpackConfig, function(err, stats) {
	spinner.stop();
	if (err) throw err;
	process.stdout.write(stats.toString({
		colors: true,
		modules: false,
		children: false,
		chunks: false,
		chunkModules: false
	}) + '\n\n');

	console.log(chalk.cyan('  Build complete.\n'));
});

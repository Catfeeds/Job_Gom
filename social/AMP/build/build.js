// https://github.com/shelljs/shelljs
require('./check-versions')();
require('shelljs/global');

var fs = require('fs');
var path = require('path');
var inquirer = require('inquirer');
const {js_beautify} = require('js-beautify');
const {exec, execSync} = require('child_process');
var config = require('../config');
var ora = require('ora');
var webpack = require('webpack');
var webpackConfig = require('./webpack.prod.conf');

console.log(
	'  Tip:\n' +
	'  Built files are meant to be served over an HTTP server.\n' +
	'  Opening index.html over file:// won\'t work.\n'
);

var spinner = ora('');

var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory);
// rm('-rf', assetsPath);
mkdir('-p', assetsPath);
// cp('-R', 'static/*', assetsPath);
// cp('-R', 'src/assets/css/theme/*', path.join(__dirname, '../node_modules/'));

function execPromise(cmd) {
	return new Promise((resolve, reject) => {
		exec(cmd, (err, stdout, stderr) => {
			if (err) return reject(err);
			resolve(stdout);
		});
	});
}

function checkSt() {
	return new Promise((resolve, reject) => {
		exec('git status -s', (err, stdout, stderr) => {
			if (err) return reject(err);
			return resolve(!!stdout);
		});
	});
}

function webpackGo(cb) {
	spinner.stop();
	spinner.text = `building for ${config.build.env}`;
	spinner.start();
	webpack(webpackConfig, function(err, stats) {
		if (err) throw err;
		spinner.stop();
		process.stdout.write(stats.toString({
			colors: true,
			modules: false,
			children: false,
			chunks: false,
			chunkModules: false
		}) + '\n');
		if (cb) cb();
	});
}

webpackGo();

// inquirer
// 	.prompt([{
// 		type: 'confirm',
// 		name: 'newVersion',
// 		message: 'publish new version?',
// 		default: false
// 	}])
// 	.then((answer) => {
// 		if (answer.newVersion) {
// 			return inquirer.prompt([{
// 				type: 'input',
// 				name: 'version',
// 				message: 'which version?',
// 				default: JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'))).version
// 			}]);
// 		} else {
// 			return {
// 				version: false
// 			};
// 		}
// 	})
// 	.then((answer) => {
// 		spinner.text = `building for ${config.build.env}...`;
// 		spinner.start();

// 		if (answer.version) {
// 			webpackGo(() => {
// 				spinner.stop();
// 				spinner.text = `publishing version: ${answer.version}`;
// 				spinner.start();
// 				// 发布新版本，按照版本号写 package.json／打新tag／推送到release分支／推送所有tag
// 				let pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8'));
// 				pkg.version = answer.version;
// 				fs.writeFileSync(path.join(__dirname, '../package.json'), js_beautify(JSON.stringify(pkg), {
// 					'indent_size': 4,
// 					'indent_with_tabs': false
// 				}));
// 				execPromise(`git tag ${answer.version}`)
// 					.then(() => {
// 						return execPromise(`git subtree push --prefix=dist origin release`);
// 					})
// 					.then(() => {
// 						return checkSt();
// 					})
// 					.then((is) => {
// 						if (is) {
// 						 	return execPromise(`git add . && git commit -m 'publish new version: ${answer.version}' && git push --tags && git push`);
// 						} else {
// 							return execPromise(`git push --tags`);
// 						}
// 					})
// 					.then(() => {
// 						spinner.stop();
// 					})
// 					.catch((e) => {
// 						console.log(e);
// 					});
// 			});
// 		} else {
// 			webpackGo(() => {
// 				spinner.stop();

// 				checkSt()
// 					.then((is) => {
// 						if (is) {
// 							return execPromise(`git add . && git commit -m 'publish new build' && git push`)
// 						} else {
// 							return null;
// 						}
// 					})
// 			});
// 		}
// 	})

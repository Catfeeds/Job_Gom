
import path from 'path';
import test from 'ava';

// import 'babel-register';

import { SeleniumRunner } from 'browsertime';
import * as rollup from 'rollup';
import babel from 'rollup-plugin-babel';

// note: 由于rollup禁用ES2015模块处理，而ava的import 'babel-register'会使用babelrc，导致rollup报错，只能把逻辑写入一个测试

test('event', async x => {
	// 首先绑定事件，回调中向结果加入一个WebElement，触发一次，解绑事件，再触发一次，然后关闭浏览器
	let option = {
		filepath: path.join(__dirname, '../script/event.spec.js'),
		close: false
	}
	let {res, runner, script} = await buildBroswerTest(option);
	console.log(res);
	x.is(res.length, 1);
	// 换一个网页重复测试
	await runner.loadAndWait('https://mall.gomeplus.com/search/index?sort=3&order=1&page=1');
	res = await runner.runScript(script, 'test2');
	x.is(res.length, 1);
	// 关闭测试浏览器
	runner.stop();
});

// test('event—firefox', async x => {
// 	// 首先绑定事件，回调中向结果加入一个WebElement，触发一次，解绑事件，再触发一次，然后关闭浏览器
// 	let option = {
// 		browser: 'firefox',
// 		filepath: path.join(__dirname, '../script/event.spec.js'),
// 		close: false
// 	}
// 	let {res, runner, script} = await buildBroswerTest(option);
// 	console.log(res);
// 	x.is(res.length, 1);
// 	// 换一个网页重复测试
// 	await runner.loadAndWait('https://mall.gomeplus.com/search/index?sort=3&order=1&page=1');
// 	res = await runner.runScript(script, 'test2');
// 	x.is(res.length, 1);
// 	// 关闭测试浏览器
// 	runner.stop();
// });


async function buildBroswerTest({url = 'https://www.gomeplus.com', filepath, moduleName = 'UBASDK', browser = 'chrome', viewPort='', close=true}) {

	try {
		let res = await Promise.all([buildScript(moduleName, filepath), buildRunner(url, browser, viewPort)]);
		let [script, runner] = res;
		res = await runner.runScript(script, 'test');
		if(close){
			runner.stop();
		}
		return {res, runner, script};
		// runner.stop();
	} catch(e) {
		console.log(e);
		return null;
	}

}

// 通过rollup读取用umd包装好的源码
async function buildScript(moduleName, filepath) {
	let testCode = await rollup.rollup({
		entry: filepath,
		plugins: [
			babel()
		]
	}).then(function(bundle) {
		return bundle.generate({
			format: 'umd',
			moduleName: moduleName
		}).code;
	});
	return `try {
		${testCode} 
		return window.${moduleName}
		} catch(e) {
			return e;
		}`;
}

// 构建seleniumRunner
async function buildRunner(url, browser, viewPort) {
	var runner = new SeleniumRunner({
		browser,
		"viewPort": viewPort,
		"resultDir": "",
		"chrome": {}
	});
	await runner.start();
	await runner.loadAndWait(url);
	return runner;
}

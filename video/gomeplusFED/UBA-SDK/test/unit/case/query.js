import path from 'path';
import test from 'ava';

// import 'babel-register';

import { SeleniumRunner } from 'browsertime';
import * as rollup from 'rollup';
import babel from 'rollup-plugin-babel';

// note: 由于rollup禁用ES2015模块处理，而ava的import 'babel-register'会使用babelrc，导致rollup报错，只能把逻辑写入一个测试

test('query', async x => {
	// 
	let option = {
		filepath: path.join(__dirname, '../script/query.spec.js'),
		close: false
	}
	let {res, runner, script} = await buildBroswerTest(option);
	console.log(res);
	x.is(res.querySelector, true);
	x.is(res.querySelectorAll, true);
	// 关闭测试浏览器
	runner.stop();
	console.log('-----------------------------------------\n在IE8，9的console下测试以下代码：\n');
	console.log(`${script.wrapedCode}\n window.${option.moduleName || 'UBASDK'}`);
	// 目前测试IE8 不可用, 因为路径中有nth-child
	// TODO
	x.is(1,1)
});


async function buildBroswerTest({url = 'https://www.gomeplus.com', filepath, moduleName = 'UBASDK', browser = 'chrome', viewPort='', close=true}) {

	try {
		let res = await Promise.all([buildScript(moduleName, filepath), buildRunner(url, browser, viewPort)]);
		let [script, runner] = res;
		res = await runner.runScript(script.testCode, 'test');
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
	let wrapedCode = await rollup.rollup({
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
	let testCode = `try {
		${wrapedCode} 
		return window.${moduleName}
		} catch(e) {
			return e;
		}`;
	return {wrapedCode, testCode};
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

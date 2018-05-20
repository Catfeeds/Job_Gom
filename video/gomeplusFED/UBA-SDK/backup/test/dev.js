import path from 'path';
import fs from 'fs';
import test from 'ava';
var uglify = require('uglify-js');
var nodeResolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
var fetch = require('node-fetch');

// import 'babel-register';

import { SeleniumRunner } from 'browsertime';
import * as rollup from 'rollup';
import babel from 'rollup-plugin-babel';
import {EventEmitter} from 'events';


// note: 由于rollup禁用ES2015模块处理，而ava的import 'babel-register'会使用babelrc，
// 导致rollup报错，只能把逻辑写入一个测试

// Note： 这里需要单独在 /test/mockServer/下执行npm install或yarn install
// launch mock server
// 若进行IE8测试，需要手动启动 mock server
// require('../../mockServer/app.js');

test('api', async x => {
	let url = 'https://www.gomeplus.com/others/process.html';
	// 用于和mock server直接通信，从而能给直接断言

	
	let option = {
		url,
		filepath: path.join(__dirname, '../script/script_2.js'),
		close: false
	}

	let {res, runner, script} = await buildAsyncBroswerTest(option);

	// test IE8
	/** await fetch('http://127.0.0.1:8788/api/test/script', {
		method: 'POST', 
		body: JSON.stringify({
			code: script.wrapedCode
		}),
		headers: { 'Content-Type': 'application/json' }
	}).then(function(result) {
		console.log('set code to remote server ok');
    }).catch(err => console.log(err));
    **/

    // then you can use:
	/**
	var script = document.createElement('script');
	script.src = 'http://10.69.5.134:8788/api/test/script';
	document.getElementsByTagName('head')[0].appendChild(script);
	**/


	console.log('broswer: receive the response as :');
	console.log(res);
	x.is(res, 'test finished');

	// 关闭测试浏览器
	// runner.stop();
});


async function buildAsyncBroswerTest({url = 'https://www.gomeplus.com', filepath, moduleName = 'UBASDK', browser = 'chrome', viewPort='', close=true}) {

	try {
		let res = await Promise.all([buildAsyncScript(moduleName, filepath), buildRunner(url, browser, viewPort)]);
		let [script, runner] = res;
		res = await runner.runAsyncScript(script.testCode, 'test');
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
async function buildAsyncScript(moduleName, filepath, record = true) {
	let wrapedCode = await rollup.rollup({
		entry: filepath,
		plugins: [
			nodeResolve({
				browser: true
			}),
			commonjs(),
			babel()
		]
	}).then(function(bundle) {
		return bundle.generate({
			format: 'umd',
			moduleName: moduleName
		}).code;
	});
	// write the script
	if (record) {
		fs.writeFileSync('../dist/dev.js', wrapedCode, {encoding: 'utf8'});
		fs.writeFileSync('../dist/dev.min.js', uglify.minify(wrapedCode, {
			fromString: true,
			output: {
				ascii_only: true
			}
		}).code, {encoding: 'utf8'});
	}

	let testCode = `try {
		var callback = arguments[arguments.length - 1];
			${wrapedCode} 
			window.${moduleName}.then(
				function(response) {
					callback(response);
					return response;
				}
			).catch(function(e, xhr, response) {
		        // Process the error
		        callback(e);
		        return e;
	        });
		} catch(e) {
			callback(e);
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

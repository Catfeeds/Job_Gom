import path from 'path';
import fs from 'fs';
import test from 'ava';


// import 'babel-register';

import { SeleniumRunner } from 'browsertime';
import * as rollup from 'rollup';
import babel from 'rollup-plugin-babel';
import {EventEmitter} from 'events';

// note: 由于rollup禁用ES2015模块处理，而ava的import 'babel-register'会使用babelrc，
// 导致rollup报错，只能把逻辑写入一个测试

// Note： 这里需要单独在 /test/mockServer/下执行npm install或yarn install
// launch mock server
require('../../mockServer/app.js');


test('api', async x => {
	let url = 'https://mall.gomeplus.com/search/index?sort=1&order=1&page=1';
	// 用于和mock server直接通信，从而能给直接断言
	const emitter = new EventEmitter(); 
	global.$emitters = global.$emitters || {}
	global.$emitters['api_test'] = emitter;

	// 注册事件，用于监控mockserver 收到的信息
	let fetch_msg, report_msg;

	emitter.once(`api-test-fetch`,(msg)=>{
		fetch_msg = msg;
		
	});

	emitter.once(`api-test-report`,(msg)=>{
		console.log(`api-test-report`);
		console.log(msg);
		report_msg = msg;
		
	});

	
	let option = {
		url,
		filepath: path.join(__dirname, '../script/local.js'),
		close: false
	}

	let {res, runner, script} = await buildAsyncBroswerTest(option);
	// write the script
	fs.writeFileSync('../dist/local.js', script.wrapedCode, {encoding: 'utf8'});

	console.log('broswer: receive the response as :');
	console.log(res);
	x.is(res, 'test finished');
	x.is(fetch_msg.event_msg, `api test operation: fetch task received. pageUrl: ${url}`);
	x.is(report_msg.event_msg, `api test operation: report received. pageUrl: ${url}`);


	delete global.$emitters['api_test'];

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
async function buildAsyncScript(moduleName, filepath) {
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

import path from 'path';
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



test('ajax', async x => {
	// 用于和mock server直接通信，从而能给直接断言
	const emitter = new EventEmitter(); 
	global.$emitters = global.$emitters || {}
	global.$emitters['ajax_test'] = emitter;
	// 注册事件，用于监控mockserver 收到的信息
	let s_res_get = new Promise((resolve,reject)=>{
		emitter.once(`ajax-test-get`,(msg)=>{
			resolve(msg);
		});
	});

	let s_res_post = new Promise((resolve,reject)=>{
		emitter.once(`ajax-test-post`,(msg)=>{
			resolve(msg);
		});
	});

	let option = {
		filepath: path.join(__dirname, '../script/ajax.spec.js'),
		close: false
	}
	let {res, runner, script} = await buildAsyncBroswerTest(option);

	console.log('broswer: receive the response as :');
	console.log(res);

	// the response shoul be array
	x.is(Object.prototype.toString.call(res), '[object Array]');
	x.is(res.length, 2);

	let res_get = res[0][1];
	let res_post = res[1][1];

	x.is(res_get.server_msg, 'just test get');
	x.is(res_post.server_msg, 'just test post');

	// 这时该promise应该早已取得消息
	s_res_get = await s_res_get;
	console.log(`the mock server received test get as:`);
	console.log(s_res_get);
	x.is(s_res_get.event_msg, 'test get received');

	s_res_post = await s_res_post;
	console.log(`the mock server received test post as:`);
	console.log(s_res_post);
	x.is(s_res_post.event_msg, 'test post received');
	delete global.$emitters['ajax-test'];

	// 关闭测试浏览器
	runner.stop();
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

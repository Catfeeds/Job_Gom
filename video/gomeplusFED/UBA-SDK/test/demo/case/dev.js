import path from 'path';
import fs from 'fs';
import test from 'ava';
var uglify = require('uglify-js');
var nodeResolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
import * as rollup from 'rollup';
import babel from 'rollup-plugin-babel';
import {execSync} from 'child_process';
import fetch from 'node-fetch';

let IPAddrs = ['localhost'];

var os = require('os');
var ifaces = os.networkInterfaces();

Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      IPAddrs.push(iface.address);
    } else {
      // this interface has only one ipv4 adress
      IPAddrs.push(iface.address);
    }
    ++alias;
  });
});

// note: 由于rollup禁用ES2015模块处理，而ava的import 'babel-register'会使用babelrc，
// 导致rollup报错，只能把逻辑写入一个测试

// Note： 这里需要单独在 /test/mockServer/下执行npm install或yarn install
// launch mock server
// 若进行IE8测试，需要手动启动 mock server
// require('../../mockServer/app.js');
let mockport = '8788';
let mockhost = 'localhost:8788';
let mockhosts = IPAddrs.map(x => `${x}:${mockport}`);

let orginApi = {
	fetch: 'https://point-pre.gomeplus.com/bomber-api/sdk/point',
	report: 'beacon.gomeplus.com/'
}
let mockApi = {
	fetch: 'http://localhost:8788/api/task/forward',
	report: 'localhost:8788/api/task/'
}
let pageUrl = 'https://www-pre.gomeplus.com';
let url = `http://${mockhost}/api/page/html?pageUrl=${encodeURIComponent(pageUrl)}`;
let mockurls = mockhosts.map(x => `http://${x}/api/page/html?pageUrl=${encodeURIComponent(pageUrl)}`);
let filepath = path.join(__dirname, '../script/dev_manual.js');

test('api', async (x) => {

	let code = await buildAsyncScript('UBASDKtest', filepath);

	await fetch('http://127.0.0.1:8788/api/test/script', {
		method: 'POST', 
		body: JSON.stringify({
			code
		}),
		headers: { 'Content-Type': 'application/json' }
	}).then(function(result) {
		console.log('set code to remote server ok');
    }).catch(err => console.log(err));
	console.log(mockurls);
	let cmd = `start ${url}`;
	execSync(cmd);
	x.is(1,1);

	// 关闭测试浏览器
	// runner.stop();
});

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

	// Replace some string
	wrapedCode = replaceStr(wrapedCode);

	// write the script
	if (record) {
		fs.writeFileSync('../dist/dev_manual.js', wrapedCode, {encoding: 'utf8'});
		fs.writeFileSync('../dist/dev_manual.min.js', uglify.minify(wrapedCode, {
			fromString: true,
			output: {
				ascii_only: true
			}
		}).code, {encoding: 'utf8'});
	}

	return wrapedCode;
}


function replaceStr(code) {
	return code.replace(new RegExp(orginApi.fetch,'g'), mockApi.fetch)
			   .replace(new RegExp(orginApi.report,'g'), mockApi.report)
			   .replace(/(var hostArray = \[)/, `$1${mockhosts.map(x => `"${x}"`).join(',')},`)
			   ;
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

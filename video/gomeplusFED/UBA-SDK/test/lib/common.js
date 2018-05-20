var path = require('path');
var fs = require('fs');
var uglify = require('uglify-js');
var nodeResolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
var rollup = require('rollup');
var fetch = require('node-fetch');
var replace = require('rollup-plugin-replace');
var os = require('os');
exports.getIPlist = function() {
	let IPAddrs = [];
	var ifaces = os.networkInterfaces();
	Object.keys(ifaces).forEach(function(ifname) {
		var alias = 0;
		ifaces[ifname].forEach(function(iface) {
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
	return IPAddrs;
}
exports.injectScript = async function(code) {
	await fetch('http://127.0.0.1:8788/api/test/script', {
		method: 'POST',
		body: JSON.stringify({
			code
		}),
		headers: { 'Content-Type': 'application/json' }
	}).then(function(result) {
		console.log('set code to remote server ok');
	}).catch(err => console.log(err));
}
exports.getSrcPath = function() {
	return path.resolve(__dirname, '../../src/app.js');
}
// 通过rollup读取包装好的源码
exports.buildScript = async function({ entry, script, output = true, sourceMap = true }) {
	let buildFunc = require(script).build;
	let options = {
		entry,
		custom: {
			sourceMap: true
		}
	}
	if (sourceMap) {
		options.custom = {
			sourceMap: true
		}
	}
	let result = await buildFunc(options);
	let wrapedCode = result.code;
	let inlinemap = result.map.toUrl();
	sourceMap && (wrapedCode = `${wrapedCode}\n//# sourceMappingURL=${inlinemap}\n`);
	// write the script
	if (output) {
		fs.writeFileSync('../dist/dev_dist.js', wrapedCode, { encoding: 'utf8' });
		fs.writeFileSync('../dist/dev_dist.min.js', uglify.minify(wrapedCode, {
			fromString: true,
			output: {
				ascii_only: true
			}
		}).code, { encoding: 'utf8' });
	}
	return wrapedCode;
}
// function replaceStr(code, mockhosts) {
// 	return code.replace(/(var hostArray = \[)/, `$1${mockhosts.map(x => `"${x}"`).join(',')},`);
// }

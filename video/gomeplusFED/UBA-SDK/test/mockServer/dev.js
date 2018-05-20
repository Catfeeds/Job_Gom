const os = require('os');
const path = require('path');
const net = require('net');
const platform = os.platform();
const { exec, execSync, spawn } = require('child_process');
const stream = require('stream');
const binfolder = path.join(__dirname, '../../node_modules/.bin/');
const localbin = path.join(__dirname, './node_modules/.bin/');
const webapp = __dirname;
const rollupconfig = path.join(__dirname, 'views/src/js/build/config.js');
const csssrc = path.join(__dirname, 'views/src/css/');
const cssdist = path.join(__dirname, 'views/dist/css/');
const rollupwatch = `${binfolder}rollup -w -m -c ${rollupconfig}`;
const cssbuild = `${localbin}node-sass ${csssrc} -o ${cssdist}`;
// 注意sass watch时并不会先编译一遍
const csswatch = `${localbin}node-sass ${csssrc} -o ${cssdist} -w -r ${csssrc}`;
const port = require(path.join(webapp, './package.json')).config.port;
const host = 'localhost';
const sass = spawn(`${localbin}cross-env NODE_ENV=dev ${cssbuild} &&${localbin}cross-env NODE_ENV=dev ${csswatch}`, {
	shell: true,
	stdio: [process.stdin, process.stdout, 'pipe']
});
const rollupStream = buildStream('rollup');
const rollupChild = spawn(`${localbin}cross-env NODE_ENV=dev ${rollupwatch}`, {
	shell: true,
	stdio: [process.stdin, process.stdout, 'pipe']
});
rollupChild.stderr.pipe(rollupStream);
const sassStream = buildStream('sass');
const sassChild = spawn(`${localbin}cross-env NODE_ENV=dev ${cssbuild} &&${localbin}cross-env NODE_ENV=dev ${csswatch}`, {
	shell: true,
	stdio: [process.stdin, process.stdout, 'pipe']
});
sassChild.stderr.pipe(sassStream);
const servercmd = `${localbin}nodemon --inspect --exec ${binfolder}ts-node ${path.join(webapp ,'./app.js')}`;
const clientexe = require('./chrome')[platform];
// clientcmd = clientcmd + ` http://${host}:${port}`;
startServer(function() {
	spawn(servercmd, {
		shell: true,
		stdio: "inherit"
	});
}, function() {
	spawn(clientexe, [`http://${host}:${port}`], {
		stdio: "inherit"
	});
});

function buildStream(note) {
	var customStream = new stream.Writable();
	customStream._write = function(data, ...argv) {
		console.log(`----------${note} info start----------`);
		process.stderr._write(data, ...argv);
		console.log(`----------${note} end----------`);
	};
	return customStream;
}

function startServer(runServer, runClient) {
	// wait rollup and css building
	setTimeout(function() {
		// 检查服务器是否启动
		let startServer = true;
		let timer;
		let socket = net.createConnection(port, host, function() {
			clearTimeout(timer);
			// 已经启动
			console.log('server is running already!');
			socket.end();
		});
		timer = setTimeout(function() {
			runServer();
			socket.end();
		}, 10000);
		socket.on('error', function(err) {
			clearTimeout(timer);
			runServer();
		});
	}, 3000);
	console.log('waiting for http server...');
	setTimeout(function() {
		runClient();
		exec('start cmd.exe /K "echo this terminal is for git"')
		// console.log('this terminal is for git');
		// process.exit();
	}, 10000);
}

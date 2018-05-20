var simpleGit = require('simple-git')();
var webpack = require('webpack');
var path = require('path');

var log = function(msg){
	console.log(msg);
};

// 更新css中背景图片等版本号
var replaceBgVer = function(){
	var exec = require('./css_bg_ver');
	return new Promise((resolve, reject) => {
		exec(() => {
			resolve();
		});
	});
};

// 获取仓库当前状态
var getStatus = function() {
    return new Promise(function(resolve, reject) {
        simpleGit.status(function(err, status) {
            if (err) {
                reject(err);
            } else {
                resolve(status);
            }
        });
    });
};

// 拉取代码
var pull = function() {
    return new Promise(function(resolve, reject) {
        simpleGit.pull(function(err, ret) {
            if (err) {
                reject(err);
            } else {
                resolve(ret);
            }
        });
    });
};

var compile = function(config){
	return new Promise(function(resolve, reject) {
        webpack(config, function(err, stats) {
            if (err) {
                reject(err);
            } else {
                resolve(stats);
            }
        });
    }).then(() => {
    	if('prd' === config._local_env){
			return replaceBgVer();
		}
    });
};

// 拉取并编译
var pullThenCompile = function(config) {
    return pull().then(function() {
        return compile(config);
    }).catch((err) => {
    	log(err);
    });
};

// webpack编译完成后获取文件状态
var parseStatus = function(status, config) {
	var files = [];
	var env = config._local_env;
	var p;
	if(env === 'pre'){
		p = path.join('src', 'js', 'conf');
	} else { // 如果是线上,需要替换css背景图版本号
		p = path.join('dist');
	}
	status.files.forEach((file, index) => {
		var src = file.path;
		console.log(src.indexOf(p));
		if(src.indexOf(p) === 0){
    		files.push(src);
    	}
	});
    return {
    	files: files,
    	behind: status.behind,
    	current: status.current,
    	msg: '更新' + p,
    	env: env
    };
};

// 执行git的add,commit,push
var execGitCommand = function(result) {
	var files = result.files || [];
    if (files.length) {
    	log(files);
    	simpleGit.add(files, () => {
            log('add done');
        }).then(() => {
        	var branch = result.current;
            simpleGit.commit(result.msg).then(() => {
                log('commit done');
                log('push to ' + branch);
                simpleGit.push('origin', branch, () => {
                	log('push done');
                });
            });
        });
    } else {
    	log('本次打包完之后的文件和上次一样，不需要更新');
    }
};

var build = function(config) {
    getStatus().then((status) => {
        log(status);
        if (status.behind > 0) {
            ret = pullThenCompile(config);
        } else {
            ret = compile(config);
        }
        ret.then(() => {
            return getStatus();
        }).then((status) => {
        	console.log(parseStatus(status, config));
            // execGitCommand(parseStatus(status, config));
        });
    });
};

var parseArgs = function(){
	var program = require('commander');
	program
		.version('0.0.1')
		.option('-c, --conf [value]', '设置配置文件', './webpack.config')
		.option('--env [value]', 'pre')
		.parse(process.argv);
	
	var config = require(program.conf);
	config._local_env = program.env; // 区分预生产和线上
	log('start compile ' + program.env);
	build(config);
}

parseArgs();

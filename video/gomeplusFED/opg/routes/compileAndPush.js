var express = require('express');
var router = express.Router();

var config = require('../config/config');
var dataProjectInit = require('../config/data-project-init.json');
var datamenu = require('../config/data-menu.json');

var distUrl = '';
var sourceBranch = '';
var sourceUrl = '';
var distBranch = '';

var fs = require('fs');
var fse = require('fs-extra')
var execSync = require('child_process').execSync;
var exec = require('child_process').exec;

var iconv = require('iconv-lite');
var encoding = 'cp936';
var binaryEncoding = 'binary';

var path = require('path');
var async = require('async');
var uuid = require('node-uuid');

var getProjName = require('../mods/getProjName'),
    zTreeTravel = require('../mods/zTreeTravel'),
    getPushPath = require('../mods/getPushPath');

/**
 * 把传入的git url 拼接上username and password
 * http://username:password@gitlabXXX.git
 * @param gitUrl
 */
function joinUserNameAndPass(req, gitUrl) {
    return gitUrl.replace('http://', 'http://' + req.session.userInfo.username + ':' + req.session.userInfo.psw + '@');;
}

/**
 * 获取要操作的文件夹路径
 * @param req
 * @returns {string}
 */
function getOptDistByUser(req) {
    return config.rootPath + '/' + dataProjectInit[req.session.userInfo.username].rootPath;
}

function cloneFromGitIfNE(dist, gitUrl, rootPath, optType, callback, req, res) {
    fs.access(dist + '/' + gitUrl.name, fs.F_OK, function (err) {
        if(err) {
            console.log('检出项目：' + gitUrl.name + '\n' + '----' + JSON.stringify(gitUrl));
            // 不存在则去git clone  gitRepos[gitUrls[i]]
            try {
                execSync(config.cd + dist + ' && git clone -b ' + gitUrl.branch + ' ' + joinUserNameAndPass(req, gitUrl.url));
            } catch (e) {
                res.json({message:e.toString(), error:{stack:e.toString()}});
                return;
            }
            // 把dist + '/' + fileName存储起来， 初始化完的项目
            writeDataProjectInit(req, gitUrl, rootPath, optType);
            callback(null, "true");
            return true;
        }
        console.log('存在该项目:' + dist + '/' + gitUrl.name);
        // 如果存在该项目则去更新
        execSync(config.cd + dist + '/' + gitUrl.name + ' && git pull ');
        writeDataProjectInit(req, gitUrl, rootPath, optType);
        callback(null, "true");
    });
}

function writeDataProjectInit(req, gitUrl, rootPath, optType) {
    // 把dist + '/' + fileName存储起来， 初始化完的项目
    var dpi = dataProjectInit[req.session.userInfo.username];
    // dpi.projects[gitUrl.name] = gitUrl;
    var tempO = dpi.projects[rootPath] || {};
    tempO[optType] = gitUrl;
    dpi.projects[rootPath] = tempO;
    fs.writeFileSync(config.dataProjectInit, JSON.stringify(dataProjectInit));
}

function gitOptions(req, res) {
    var dataInfo = dataProjectInit[req.session.userInfo.username];
    // 文件拷贝完成之后去做提交
    exec(config.cd+ dataInfo.dist.optPath + ' && git add . ', function (err, stdout, stderr) {
        console.log('执行完git add. ');
        if(err || stderr) {
            console.log(iconv.decode(new Buffer(stderr, binaryEncoding), encoding));
        }
        exec(config.cd+ dataInfo.dist.optPath + ' && git commit -m 提交静态文件', function (err, stdout, stderr) {
            if(err || stderr) {
                console.log(iconv.decode(new Buffer(stderr, binaryEncoding), encoding));
                console.log(stdout);
            }
            exec(config.cd+ dataInfo.dist.optPath + ' && git push -u origin ' + dataInfo.dist.branch, function (err, stdout, stderr) {
                if(err || stderr) {
                    console.log(iconv.decode(new Buffer(stderr, binaryEncoding), encoding));
                    res.json({message:stderr, error:{stack:stderr}});
                    return;
                }
                res.json({message:'编译提交成功', error:{stack:'编译提交成功'}});
            });
        });
    });
}

function compileAndPush(req, res, next) {
    compileProj(req, res, function (dest) {
        var bizPath = getOptDistByUser(req) + '/' + dataProjectInit[req.session.userInfo.username].dist.name;
        // 拷贝文件到业务分支
        fse.copy(dest + '/',bizPath + '/', function (err) {
            if (err)
                return res.json({message:'拷贝文件失败', error:{stack:'拷贝文件失败'}});
            console.log("文件拷贝完成 success!")
            // 执行git add , commit , push
            gitOptions(req, res);
        });
    });
}

function checkAndInit(req, res, callback) {
    // 获取源路径和目标路径
    sourceUrl = req.body.sourceGitUrl;
    sourceBranch = req.body.sourceBranch;
    distUrl = req.body.distGitUrl;
    distBranch = req.body.distBranch;
    var bizType = req.body.bizType;// 业务分支类型 pc app h5， 根据对应的类型去执行不同的脚本文件
    var clearAndInit = req.body.isClear;
    if(!(sourceUrl && sourceBranch && distUrl && distBranch && bizType)) {
        res.json({success:0, message:'请完善信息！'});
        return;
    }
    var username = req.session.userInfo.username;
    var projWorkSpace = config.rootPath + '/' ;
    var sourceUrlP = '',
        distUrlP = '',
        cloneOpt = {
            source: {
                name:"",
                url:"",
                optPath:"",
                branch:""
            },// 开发分支
            dist: {
                name:"",
                url:"",
                optPath:"",
                branch:"",
                bizType:bizType
            }, // 推送分支
            rootPath:""
        },
        rootPath = "";
    // 根据传入的路径截取最后的工程名， 再用当前用户名拼接上工程名作为本地仓库的文件夹名称
    if(username && sourceUrl && distUrl) {
        sourceUrlP = getProjName(sourceUrl);
        distUrlP = getProjName(distUrl);
        if(sourceUrlP && distUrlP) {
            cloneOpt.source.name = sourceUrlP;
            cloneOpt.source.url = sourceUrl;
            cloneOpt.source.branch = sourceBranch;
            cloneOpt.dist.name = distUrlP;
            cloneOpt.dist.url = distUrl;
            cloneOpt.dist.branch = distBranch;
            rootPath = username + '_' + sourceUrlP + '_' + distUrlP + '_b_'+ sourceBranch +'_'+ distBranch;
            projWorkSpace += rootPath;
            cloneOpt.rootPath = rootPath;
        }
    }
    if(clearAndInit === '1') {
        // 为1表示删除检出的项目， 重新检出。 避免代码冲突
        try {
            execSync('cd ' + config.rootPath + ' && rm -rf ' + projWorkSpace);
        } catch (e) {
            res.json({message:'初始化项目失败', error:{stack:'初始化项目失败' + e}});
            return;
        }
    }
    // 判断该目录是否存在
    fs.access(projWorkSpace, fs.F_OK, function (err) {
        if(err) {
            // 不存在这样的目录的时候去创建改目录
            try{
                fs.mkdirSync(projWorkSpace);
                fs.mkdirSync(projWorkSpace + '/dist');
            } catch (e) {
                res.json({message:'创建目录失败', error:{stack:'创建目录失败' + err}});
                return;
            }
        }
        // 保存当前初始化的数据
        cloneOpt.source.optPath = projWorkSpace + '/' + cloneOpt.source.name;
        cloneOpt.dist.optPath = projWorkSpace + '/' + cloneOpt.dist.name;
        if(!dataProjectInit[req.session.userInfo.username]){
            dataProjectInit[req.session.userInfo.username] = {};
            dataProjectInit[req.session.userInfo.username].projects = {};
        }
        dataProjectInit[req.session.userInfo.username].rootPath = cloneOpt.rootPath;
        dataProjectInit[req.session.userInfo.username].source = cloneOpt.source;
        dataProjectInit[req.session.userInfo.username].dist = cloneOpt.dist;
        async.series([
                function(callback) {
                    cloneFromGitIfNE(projWorkSpace, cloneOpt.source, cloneOpt.rootPath, 'source',callback, req, res);
                    // callback(null, 'one');
                },
                function(callback) {
                    // do some more stuff ...
                    cloneFromGitIfNE(projWorkSpace, cloneOpt.dist, cloneOpt.rootPath, 'dist',callback, req, res);
                }
            ],
            // optional callback
            function(err, results) {
                console.log(results);
                var tag = true;
                for(var i in results) {
                    tag = results[i] && tag;
                }
                if(tag) {
                    callback();
                } else {
                    res.json({message:'操作失败', error:{stack:'操作失败'}});
                }
            });
    });
}

function compileProj(req, res, callback) {
    var src = getOptDistByUser(req) + '/' + dataProjectInit[req.session.userInfo.username].source.name;
    var dest = getOptDistByUser(req) + '/dist';
    var bizType = req.body.bizType;
    var bizPath = getOptDistByUser(req) + '/' + dataProjectInit[req.session.userInfo.username].dist.name;
    // 进入操作目录， 进行更新。更新完毕之后做编译
    if(bizType !== dataProjectInit[req.session.userInfo.username].dist.bizType || !bizType) {
        res.json({message:'业务类型不对！'});
        return ;
    }
    async.series([
            function (callback) {
                exec(config.cd + src + ' && git config --global user.email "'+ req.session.userInfo.username +'@gomeplus.com"' , function(err, stdout, stderr){
                    callback(null, 'true');
                })
            },
            function (callback) {
                exec(config.cd + src + ' && git config --global user.name "'+ req.session.userInfo.username +'"' , function(err, stdout, stderr){
                    callback(null, 'true');
                })
            }
        ],
        function (err, results) {
            exec(config.cd + src + ' && git pull ' , {
                encoding: 'binary',timeout: 100000,maxBuffer: 200*1024,killSignal: 'SIGTERM',cwd: null,env: null
            },function(err, stdout, stderr){
                if(err || stderr) {
                    console.log(iconv.decode(new Buffer(JSON.stringify(err)), 'GBK'));
                    console.log(iconv.decode(stderr, 'GBK'));
                    res.json({message:iconv.decode(stderr, 'GBK') + ' 请先进行初始化'});
                    return;
                }
                console.log('更新成功...');
                //更新成功后开一个进程去执行编译操作，需传入编译到哪的路径dest和要编译的路径src
                // dest = dest + '/' + datamenu.bizType[bizType].path + '/'+bizType;
                var execGulp = config.cd + config.rootPath + ' && gulp '+datamenu.bizType[bizType].task+' --src '+src+' --dest '+dest + '/' + datamenu.bizType[bizType].path + ' --bizType ' + bizType + ' --imgPath ' + datamenu.bizType[bizType].gulpImgSrc;
                exec(execGulp,{encoding:'gbk'}, function (err, stdout, stderr) {
                    if(err || ((stderr && stderr.length > 0) && iconv.decode(stderr,'GBK').indexOf('error') > 0)){
                        console.log(JSON.stringify(err));
                        console.log(iconv.decode(stdout,'GBK'));
                        if(stderr && stderr.length > 0) {
                            console.log(iconv.decode(stderr,'GBK'));
                            res.json({message:iconv.decode(stderr, 'GBK') + ' '});
                        } else {
                            res.json({message:'error: ' + JSON.stringify(err)});
                        }
                        return;
                    }else{
                        console.log(iconv.decode(stdout,'GBK'));
                        // 控制编译产生的错误
                        /*if(iconv.decode(stdout,'GBK').indexOf('error') > 0) {
                         res.json({message:iconv.decode(stdout,'GBK') + ' '});
                         return;
                         }*/
                        console.log(`编译到${dest}成功`);
                        callback(dest);
                    }
                });
            })
        });
}

router.post('/push', function(req, res, next) {
    // 推送需要指定相应的推送参数， 要不然在临时目录里有文件，误操作也会推送成功。
    var zTreeNodes = req.body.zTreeNodes || [];
    var pushPath = [];
    // 获取要推送文件路径的数组
    if(zTreeNodes) {
        if(zTreeNodes.length === 1) {
            pushPath = getPushPath([], '', JSON.parse(zTreeNodes[0]));
        } else {
            for(var i in zTreeNodes) {
                pushPath = pushPath.concat(getPushPath([], '', zTreeNodes[0]));
            }
        }
    }
    console.log('zTreeNodes: ' + zTreeNodes);
    var dest = getOptDistByUser(req) + '/dist';
    var bizPath = getOptDistByUser(req) + '/' + dataProjectInit[req.session.userInfo.username].dist.name;
    // 拷贝文件到业务分支
    for(var i in pushPath) {
        try{
            fse.copySync(dest + '/' + pushPath[i], bizPath + '/' + pushPath[i]);
        } catch(e) {
            return res.json({message:'推送失败' + e.toString(), error:{stack:'推送失败' + e.toString()}, data: zTreeNodes.length});
        }
    }
    console.log("文件拷贝完成 success!")
    // 执行git add , commit , push
    gitOptions(req, res);
});

router.post('/compileProj', function(req, res, next) {
    compileProj(req, res, function(dest) {
        // 编译成功之后， 遍历文件夹， 返回编译结果的json串
        var zTreeRes = [];
        zTreeRes = zTreeTravel(dest, zTreeRes, 0);
        return res.json({message:'编译成功', error:{stack:'编译成功'}, zTreeData: zTreeRes});
    });
});

router.get('/', function(req, res, next) {
    // 获取源路径和目标路径
    var sourceUrl = req.body.sourceUrl;
    var distUrl = req.body.distUrl;
});

router.post('/init', function(req, res, next) {
    checkAndInit(req, res, function () {
        var projects = dataProjectInit[req.session.userInfo.username]?dataProjectInit[req.session.userInfo.username].projects:{};
        res.json({message:'操作成功', error:{stack:'操作成功'}, data:projects});
    });
});

router.post('/compileAndPushProj', function(req, res, next) {
    // 在推送的时候， 先去编译再去拷贝文件， add, commit, push
    checkAndInit(req, res, function () {
        var src = getOptDistByUser(req) + '/' + dataProjectInit[req.session.userInfo.username].source.name;
        var dist = getOptDistByUser(req) + '/dist';
        compileAndPush(req, res, next);
    });

});

router.post('/deleteProj', function (req ,res, next) {
    var projName = req.body.projName;
    var projects = {};
    if(projName && dataProjectInit) {
        // 根据传入的项目名称进行删除

        if(dataProjectInit[req.session.userInfo.username]) {
            projects = dataProjectInit[req.session.userInfo.username].projects;
            dataProjectInit[req.session.userInfo.username].rootPath = "";
            dataProjectInit[req.session.userInfo.username].source = {};
            dataProjectInit[req.session.userInfo.username].dist = {};
            if(projects) {
                delete projects[projName];
                dataProjectInit[req.session.userInfo.username].projects = projects;
                fs.writeFileSync(config.dataProjectInit, JSON.stringify(dataProjectInit));
                // 删除文件的信息后， 删除服务器本地代码
                try{
                    execSync('cd ' + config.rootPath + ' && rm -rf ' + projName);
                } catch (e) {
                    console.log('本地文件删除失败：' + e.toString());
                }
                var projects = dataProjectInit[req.session.userInfo.username]?dataProjectInit[req.session.userInfo.username].projects:{};
                res.json({message:'删除成功', error:{stack:'删除成功'}, code:'200', data: projects});
                return;
            }
        }
    }
    res.json({message:'不存在该目录', error:{stack:'不存在该目录'}});
});

router.get('/getcompileProj', function (req ,res) {
    if(dataProjectInit) {
        var projects = dataProjectInit[req.session.userInfo.username]?dataProjectInit[req.session.userInfo.username].projects:{};
        res.json({message:'删除成功', error:{stack:'删除成功'}, code:'200', data: projects});
        return;
    }
    res.json({message:'获取项目失败', error:{stack:'获取项目失败'}, data:{}});
});

module.exports = router;

var express = require('express');
var router = express.Router();
var constants = require('../config/constants');
var dataProjTip = require('../config/data-push-tip.json');
var io = require('socket.io-client');

/**
 * gitlab 的webhooks 支持post请求
 */
router.post('/', function(req, res, next) {
  console.log('something pushed');
  var changeOpt = req.body;
  console.log(changeOpt);
  // 提交的文件
  var commits = changeOpt.commits;
  var user_email = changeOpt.user_email;
  var userName = user_email? (user_email.split('@').length > 0?user_email.split('@')[0]:''):'';
  console.log(commits);
  // 添加的文件
  // var added = changeOpt.added;
  // 删除的文件
  // var removed = changeOpt.removed;
  var repository = changeOpt.repository;
  // var author = changeOpt.author;

  var git_http_url = repository.git_http_url;
  console.log('repository: ' + repository + ' *********** ' + git_http_url);
  // var git_ssh_url = repository.git_ssh_url;
  var createP = '';
  var createDir = '';

  var tipMsg = {};
  var projects = dataProjTip[userName];
  console.log('projects:  ============== ' + projects);
  if(projects && projects.projects && repository.name) {
    createP = projects.projects[repository.name].repository;
    createDir = projects.projects[repository.name].derectory;
  }

  console.log(createP + ' *********** ');
  if(createP == git_http_url) {
    // 如果该用户创建了该仓库的hook
    // 提醒
    tipMsg.msg = "有更新啦！快去查看吧";
    tipMsg.url = git_http_url;
    tipMsg.commits = '';
    if(commits && commits.length > 0) {
      console.log(commits[0].modified);
      if(commits[0].modified) {
        for(var key in commits[0].modified) {
          tipMsg.commits += commits[0].modified[key] + '\n';
        }
      }
    }

    var socket = io.connect(constants.socketServer);
    socket.on('connect', function () {
      socket.emit('pushtip', tipMsg);
    });
  }
  res.json('success');
});
module.exports = router;

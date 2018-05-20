var express = require('express');
var router = express.Router();
var constants = require('../config/constants');
var dataProj = require('../config/data-push-tip.json');
var config = require('../config/config');
var fs = require('fs');
var getProjName = require('../mods/getProjName');

/**
 * 获取更新提醒已经创建的项目
 */
router.get('/getProj', function(req, res, next) {
    var data = dataProj[req.session.userInfo.username];
    res.json({success:true, data: data?data:{}});

});

/**
 * 创建更新提醒的项目
 */
router.post('/init', function (req, res, next) {
    var remoteURL= req.body.remoteURL;
    // var remoteURLBranch = req.body.remoteURLBranch;
    var tipDirectory = req.body.tipDirectory;

    var project = {};
    project.repository = remoteURL;
    // project.branch = remoteURLBranch;
    project.derectory = tipDirectory;

    var projectKey = getProjName(remoteURL);

    if(!remoteURL) {
        res.json({success:false, message:"less required params"});
    }
    console.log(dataProj);
    // 如果已经存在数据， 并且该用户已经创建过提醒项目
    if(dataProj) {
        if(dataProj[req.session.userInfo.username]) {
            dataProj[req.session.userInfo.username].projects[projectKey] = project;
        }else {
            dataProj[req.session.userInfo.username] = {};
            dataProj[req.session.userInfo.username].projects = {};
            dataProj[req.session.userInfo.username].projects[projectKey] = project;
        }
    } else {
        dataProj = {};
    }
    fs.writeFileSync(config.dataTip, JSON.stringify(dataProj));

    res.json({success:true, message:"创建成功"});
});

module.exports = router;

var express = require('express');
var router = express.Router();
var fs = require('fs');
var clineProject = require('../modules/gitClone');
var config = require('../config/config');
var common = require('../modules/common');
var constants = require('../config/constants');
var async = require('async');

router.get('/', function(req, res, next) {

    // 1. 检出UI以及UI依赖项目并且编译到public下
    var gitUrl = req.query.gitUrl;
    // 要更新的内容字符串， 以","分割
    var updateContent = req.query.updateConotent;
    console.log('***********' + updateContent);
    async.series(
        [
            function (callback) {
                clineProject.cloneProject(req, {
                    name: common.getProjName(gitUrl),
                    branch: 'develop',
                    url: gitUrl
                }, config.gomeplusUIPath, callback);
            },
            function (callback) {
                // 编译
                common.compileStatic('', config.gomeplusUIStaticPath, updateContent, req, res, callback);
            }
        ], function (err, results) {
            if(err && err.toLowerCase().indexOf('error:') > 0) {
                res.render(
                    constants.errorPage,
                    {
                        message:'系统错误',
                        error:{status:-1, stack:err}
                    }
                );
                return;
            }
            res.redirect(constants.gomePlusUIIndex);
        }
    );
});


module.exports = router;

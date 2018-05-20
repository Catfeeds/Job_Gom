var config = require('../config/config');
var execSync = require('child_process').execSync;
var exec = require('child_process').exec;
var iconv = require('iconv-lite');
var config = require('../config/config');
var constants = require('../config/constants');

module.exports =  {
    /**
     * 根据传入的git项目url路径截取工程名
     * @param gitUrl
     * @returns {string}
     */
    getProjName: function(gitUrl) {
        var res = '';
        var tempArrUrl = gitUrl.split('/');
        if(tempArrUrl && tempArrUrl[tempArrUrl.length - 1]) {
            res = tempArrUrl[tempArrUrl.length - 1].split('.')[0]
        }
        return res;
    },
    /**
     * 把传入的git url 拼接上username and password
     * http://username:password@gitlabXXX.git
     * @param gitUrl
     */
    joinUserNameAndPass: function(req, gitUrl) {
        return gitUrl.replace('http://', 'http://' + req.session.userInfo.username + ':' + req.session.userInfo.psw + '@');;
    },
    /**
     * 利用gulp进行编译
     * @param src
     * @param dest
     */
    compileStatic: function (src, dest, updateContent, req, res, callback) {
        var gulpTask = '';
        if(updateContent) {
            gulpTask = updateContent.split(',').join(' ');
        } else {
            gulpTask = 'default';
        }
        console.log('*************** gulp task lists: ' + gulpTask);
        var gulpExec = config.cd + config.gomeplusUIPath + ' && gulp '+ gulpTask +' --src '+src+' --dest '+dest + ' --updateContent ' + updateContent;
        exec(gulpExec , function (err, stdout, stderr) {
            if(err|| (stderr && stderr.length > 0)){
                console.log(JSON.stringify(err));
                if(err) {
                    callback(JSON.stringify(err) + '\n' + iconv.decode(stderr,'GBK') , 'false');
                } else {
                    callback(null, 'true');
                }
                return;
            }else{
                console.log(iconv.decode(stdout,'GBK'));
                console.log(`编译到${dest}成功`);
                callback(null , 'true');
            }
        });
    }

}



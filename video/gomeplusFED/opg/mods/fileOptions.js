/**
 * Created by lishengyong on 2017/1/4.
 */

var fs = require('fs'),
    path = require('path');

var FileOption = {
    copyFile: function (src, dest) {
        fs.createReadStream(src).pipe(fs.createWriteStream(dest));
    },
    travel: function (dir, bizPath, callback) {
        var me = this;
        // 在文件数量少的情况下没有问题， 但是在文件数量较多的时候会报打开文件过多错误。
        fs.readdirSync(dir).forEach(function (file) {
            var pathname = path.join(dir, file);
            var nextPath = path.join(bizPath, file);
            if (fs.statSync(pathname).isDirectory()) {
                me.travel(pathname,nextPath, callback);
            } else {
                callback();
            }
        });
    }
}

module.exports = FileOption;



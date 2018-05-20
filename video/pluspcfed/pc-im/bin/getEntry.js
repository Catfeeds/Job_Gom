var fs = require('fs');
var path = require('path');
var paths = require('./paths');

var pagePath = paths.page;
var imPath = paths.im;
var vendorImPath = paths.vendorIm;
var entry = {
    im: ['vue', 'vuex'],
    app: path.join(imPath, 'app.js')
};

module.exports = entry;

/*
var vendor = ['jquery', 'dialog', 'io/url', 'cookie', 'io/fetch', 'placeholder', 'module/header', 'module/imgError'];
 
var reg = /^\./, //排除以点开头的文件
    regFile = 'index.js'; //定位合并的文件

var errLevel = 4, //错误层级
    errSwitch = 0, //开关
    errStr = ""; //内容

(function(level) {

    function fn(paths) {
        var pages = fs.readdirSync(paths); //获取到了 address 等目录数组
        if (pages.indexOf(regFile) != -1) {
            console.log(1212);
            var arr = paths.replace(pagePath + path.sep, '').split(path.sep);
            // console.log(arr);
            if (arr.length > level) {
                errStr = paths;
                errSwitch = 1;
                return false;
            }
            var temp = arr.join('_');
            entry[temp] = path.join(paths, regFile);
            return false;
        } else {
            if (!reg.test(pages)) { //排除svn，git等文件
                pages.forEach(function(dir) {
                    var childPath = path.join(paths, dir);
                    fn(childPath);
                });
            }
        }
    }
    return fn;
})(errLevel)(pagePath);
if (errSwitch) {
    console.log(errStr + '目录结构最多 ' + errLevel + ' 层，请检查');
    return false;
}*/
/*
var getEntry = function(pagePath, opts) {
    opts = opts || {};
    var depth = opts.depth || 2;
    var main = opts.main || 'index.js';

    var entry = {};
    var filtered = [];

    var isFileExist = function(file) {
        try {
            return fs.statSync(file).isFile();
        } catch (e) {
            if (e.code === 'ENOENT') {
                return false;
            } else {
                throw e;
            }
        }
    };

    var isDirectory = function(p) {
        try {
            return fs.statSync(p).isDirectory();
        } catch (e) {
            if (e.code === 'ENOENT') {
                return false;
            } else {
                throw e;
            }
        }
    };

    var readdir = function(p) {
        var dirs = [];
        if (isDirectory(p)) {
            dirs = fs.readdirSync(p);
            dirs = dirs.filter(function(item) {
                return isDirectory(path.join(p, item));
            });
        }
        return dirs;
    };

    var fn = function(p, route) {
        var route = route || [];
        var dirs = readdir(p);
        for (var i = 0, len = dirs.length; i < len; i++) {
            var dir = dirs[i];
            route.push(dir);
            if (dir.indexOf('.') !== 0) { // 过滤隐藏文件夹
                var filePath = path.join(p, dir, main);
                if (isFileExist(filePath)) {
                    entry[route.join('_')] = filePath;
                    route.pop();
                } else {
                    fn(path.join.apply(null, [pagePath].concat(route)), route);
                }
            } else {
                filtered.push(dir);
            }
        }
        route.pop();
        return entry;
    };

    return fn(pagePath);
};
var entry = getEntry(pagePath);
entry.vendor = vendor;
*/
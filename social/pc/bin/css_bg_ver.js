const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');
const crypto = require('crypto');

const r = /(?:background|background-image)\s*:\s*url\(['"]?(.*?)['"]?\)/g;

//TODO: 字体文件增加版本号
//增加缓存,提升效率
var bgImgs = {};
// css bg url中引用的不存在的图片
var notExistImg = {};

var BUFFER_SIZE = 8192;

function md5FileSync(filename) {
    var fd = fs.openSync(filename, 'r');
    var hash = crypto.createHash('md5');
    var buffer = new Buffer(BUFFER_SIZE);

    try {
        var bytesRead;
        do {
            bytesRead = fs.readSync(fd, buffer, 0, BUFFER_SIZE);
            hash.update(buffer.slice(0, bytesRead));
        } while (bytesRead === BUFFER_SIZE)
    } finally {
        fs.closeSync(fd);
    }
    return hash.digest('hex');
}

var replace = function(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) throw err;
        data = data.replace(r, function(match, img) {
            var index = img.indexOf('?v=');
            if (index !== -1) {
                var substring = img.substring(index);
                match = match.replace(substring, '');
                img = img.substring(0, index);
            }
            var image = path.resolve(path.dirname(filePath), img);
            try {
                var stat = fs.statSync(image);
                var md5;
                if (bgImgs[img]) {
                    md5 = bgImgs[img];
                } else {
                    md5 = md5FileSync(image).substr(0, 8);
                    bgImgs[img] = md5;
                }
                return match.replace(img, img + '?v=' + md5);
            } catch (err) {
                notExistImg[img] = 1;
            }
        });
        fs.writeFile(filePath, data);
    });
};

// var start = function(fn){
    const EXT_CSS = '.css';
    const CSS_DIR = path.join(process.cwd(), 'dist', 'css');
    var items = [];
    fse.walk(CSS_DIR).on('error', (err, item) => {

    }).on('readable', function() {
        var item;
        while ((item = this.read())) {
            var itemPath = item.path;
            if (path.extname(itemPath) === EXT_CSS) {
                items.push(item.path);
                replace(itemPath);
            }
        }
    }).on('end', () => {
        // console.log(items)
        console.log('已增加版本号图片:');
        console.log(bgImgs);
        console.log('CSS中引用的不存在的图片:');
        console.log(notExistImg);
        // fn();
    });
// }

// module.exports = start;


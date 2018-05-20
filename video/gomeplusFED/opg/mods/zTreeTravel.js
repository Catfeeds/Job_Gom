/**
 * 循环遍历临时文件夹， 生成zTree格式的json串
 * @param dir
 * @param jsonRes
 * @param pid
 * @returns {*}
 */
var fs = require('fs'),
    uuid = require('node-uuid'),
    path = require('path');

var zTreeTravel = function (dir, jsonRes, pid) {
    fs.readdirSync(dir).forEach(function (file) {
        var tempO = {};
        tempO.id = uuid.v4();
        tempO.pId = pid;
        var pathname = path.join(dir, file);
        tempO.name = file;
        if (fs.statSync(pathname).isDirectory()) {
            jsonRes.push(tempO);
            zTreeTravel(pathname, jsonRes, tempO.id);
        } else {
            jsonRes.push(tempO);
        }
    });
    return jsonRes;
};

module.exports = zTreeTravel;


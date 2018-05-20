

//话题评论内容转换

var encodeHtml = require('utils/encodeHtml');
var face = require('module/popup/face/face');


function htmlNull(str) {
    var re = str.replace(/\n|\r\n/g, "</br>");
    return re; //去掉所有的html标记
}

var changeContent = function(content){
	content = encodeHtml(content);
    content = face.parseEmoji(content);
    content = htmlNull(content);
    return content;
}

module.exports = changeContent;
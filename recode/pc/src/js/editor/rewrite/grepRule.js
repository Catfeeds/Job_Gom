var alert = require('module/popup/alert');
var config = require('editor/config');
//过滤回车特殊字符
var grepFormat = /[\n]/gi;
//匹配商品
var grepDiv = /<div (data-node=["']gmp-ebox.*?|class=["']publish-item.*?)<\/div><\/div>/gi;
//匹配img
var grepImg = /<img.*?>/gi;
//匹配src
var grepLocal = /( src=["'])https?:(\/\/.*?((meixincdn\.com)|(((atguat)|(gomein))\.net\.cn)))/gi;
//匹配表情
var grepFace = /data-face=['"](.*?)['"]/;

function getHtml(html, num) {
    var i = 0;
    var overload = 0;

    html = html.replace(grepImg, function(j) {
        if (i < num) {
            i++;
            return j;
        } else {
            overload = 1;
            return '';
        }
    })
    return {
        html: html,
        overload: overload
    };
}

function selectGetHtml(html, obj) {

    var len = obj.len;

    var innerImgLen = obj.innerImgLen; //粘贴板数量
    var outerImgLen = obj.outerImgLen; //浏览器内数量
    var limitNum = obj.limitNum; //限制数量
    var maybe = innerImgLen + outerImgLen - limitNum;

    return getHtml(html, limitNum - outerImgLen - len);
}

function grepHtml(editor, html) {
    var me = editor;
    var limitNum = config.imgLimitNUm;
    var tempHtml = html;
    //检测图片数量
    function checkNum(str) {
        var innerImg = str.match(grepImg),
            innerImgLen = innerImg ? innerImg.length : 0; //粘贴板 图片数量

        var outerImg = me.getContent().replace(grepDiv, '')
            .match(grepImg),
            outerImgLen = outerImg ? outerImg.length : 0; //编辑器区域 图片数量

        var range = me.selection.getRange(),
            startContainer = range.startContainer,
            endContainer = range.endContainer,
            startOffset = range.startOffset,
            endOffset = range.endOffset;

        var useAlert = innerImgLen + outerImgLen - limitNum
        if (useAlert >= 0) {
            var case_1 = startContainer == endContainer && startOffset != endOffset;
            var case_2 = startContainer != endContainer;
            if (case_1 || case_2) {
                var fragment = range.cloneContents(),
                    node = document.createElement("div");

                node.appendChild(fragment);

                var html = node.innerHTML;

                var len = html.match(grepImg).length;
                return selectGetHtml(tempHtml, {
                    limitNum: limitNum,
                    outerImgLen: outerImgLen,
                    innerImgLen: innerImgLen,
                    len: len
                })
            }
            return getHtml(tempHtml, limitNum - outerImgLen);
        }
        return false;
    }

    var h = checkNum(tempHtml)

    if (h) {
        if (h.overload) {
            if (!$(".pop-box-backdrop").length) {
                alert('您最多能添加' + limitNum + '张图片哦！');
                return h.html;
            }
        }
    }
    return tempHtml;
}

module.exports = grepHtml;

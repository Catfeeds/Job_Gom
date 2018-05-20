var alert = require('module/popup/alert');
var config = require('editor/config');
//过滤回车特殊字符
var grepFormat = /[\n]/gi;
//匹配商品
var grepDiv = /<div (data-node=["']gmp-ebox.*?|class=["']publish-item.*?)<\/div><\/div>/gi;
//匹配img
var grepImg = /<img.*?>/gi;
//匹配video
var grepVideo = /<img\s*[^>]+data-node="video".*?>/gi
//匹配src
var grepLocal = /( src=["'])https?:(\/\/.*?((meixincdn\.com)|(((atguat)|(gomein))\.net\.cn)))/gi;
//匹配表情
var grepFace = /data-face=['"](.*?)['"]/;

function getHtml(html, imgNum,videoNum) {
    var a = 0;
    var b = 0;
    var imgOverload = 0;
    var videoOverload = 0;
    html = html.replace(grepImg, function(j) {
        if(j.indexOf('video')!= -1){
            return j;
        }

        if (a < imgNum) {
            a++;
            return j;
        } else {
            imgOverload = 1;
            return '';
        }
    })
    
    html = html.replace(grepVideo, function(k) {
        if (b < videoNum) {
            b++;
            return k;
        } else {
            videoOverload = 1;
            return '';
        }
    })

    return {
        html: html,
        imgOverload: imgOverload,
        videoOverload: videoOverload
    };
}

function selectGetHtml(html, obj) {

    var imgLen = obj.imgLen;
    var videoLen = obj.videoLen;

    var outerImgLen = obj.outerImgLen; //浏览器内数量
    var imgLimitNUm = obj.imgLimitNUm; //限制数量

    var outerVideoLen = obj.outerVideoLen; //浏览器内数量
    var videoLimitNUm = obj.videoLimitNUm; //限制数量
    //var maybe = innerImgLen + outerImgLen - imgLimitNUm;
    var imgNum = imgLimitNUm - outerImgLen + imgLen;
    var videoNum = videoLimitNUm - outerVideoLen - videoLen;
    return getHtml(html, imgNum,videoNum);
}

function grepHtml(editor, html) {
    var me = editor;
    var imgLimitNUm = config.imgLimitNUm;
    var videoLimitNUm =config.videoLimitNUm;
    var tempHtml = html;
    //检测图片数量
    function checkNum(str) {
        var hasImg = grepImg.test(str);
        if(!hasImg){
            return false;
        }

        var innerImg = str.match(grepImg),      //粘贴板总img
            innerVideo = str.match(grepVideo),  //粘贴板总video
            innerVideoLen = innerVideoLen ? innerVedio.length : 0,
            innerImgLen = innerImg ? innerImg.length - innerVideoLen : 0; //粘贴板 图片数量

        var content = me.getContent().replace(grepDiv, '')
        var outerImg = content.match(grepImg),
            outerVideo = content.match(grepVideo),
            outerVideoLen = outerVideo ? outerVideo.length : 0,//编辑区 video数量
            outerImgLen = outerImg ? outerImg.length - outerVideoLen : 0;       //编辑器区域 图片数量

        var range = me.selection.getRange(),
            startContainer = range.startContainer,
            endContainer = range.endContainer,
            startOffset = range.startOffset,
            endOffset = range.endOffset;

        var useImgAlert = innerImgLen + outerImgLen - imgLimitNUm   //超出数量限制
        var useVideoAlert = innerVideoLen + outerVideoLen - videoLimitNUm;

        if (useImgAlert > 0 || useVideoAlert > 0 ) {
            var case_1 = startContainer == endContainer && startOffset != endOffset;
            var case_2 = startContainer != endContainer;
            if (case_1 || case_2) {
                var fragment = range.cloneContents(),
                    node = document.createElement("div");
                node.appendChild(fragment);

                var html = node.innerHTML;
                var imgArr = html.match(grepImg);
                var videoArr = html.match(grepVideo);
                var imgLen = imgArr?imgArr.length : 0;
                var videoLen = videoArr?videoArr.length : 0;

                return selectGetHtml(tempHtml, {
                    imgLimitNUm: imgLimitNUm,
                    outerImgLen: outerImgLen,
                    innerImgLen: innerImgLen,
                    imgLen: imgLen,

                    videoLimitNUm: videoLimitNUm,
                    outerVideoLen: outerVideoLen,
                    innerVideoLen: innerVideoLen,
                    videoLen: videoLen
                })
            }
            return getHtml(tempHtml, imgLimitNUm - outerImgLen, videoLimitNUm - outerVideoLen );
        }
       
        return false;
    }

    var h = checkNum(tempHtml)
    if (h) {
        if (h.imgOverload) {
            if (!$(".pop-box-backdrop").length) {
                alert('您最多能添加' + imgLimitNUm + '张图片哦！');
                return h.html;
            }else{
                return "";
            }
        }

        if (h.videoOverload) {
            if (!$(".pop-box-backdrop").length) {
                alert('您最多能添加' + videoLimitNUm + '个视频哦！');
                return h.html;
            }else{
                return "";
            }
        }
    }
    return tempHtml;
}

module.exports = grepHtml;

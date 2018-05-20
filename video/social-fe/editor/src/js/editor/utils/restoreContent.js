var $title = $('[data-node=topicTitle]');
var $topicTitleTips = $('[data-node=topicTitleTips]');
var $titleCharLen = $('[data-node=titleCharLen]');
var $crtLists = $('[data-node=crt-lists]');
var $selectGroup = $('[data-action=selectGroup]');
var empty = require('module/empty');
var decode = require('utils/decodeHtml.js');

var labelTpl = require('../plugin/restore/lenovoLabel.tpl');
var itemTpl = require('../plugin/goods/restoreGoods.tpl');
var videoTpl = require('../plugin/video/restoreVideo.tpl');
var imgReplace = require('utils/imgReplace');

var videoArr = [];

function restore(data) {
    var num = 0;
    var strs = "";

    for (var i = 0; i < data.length; i++) {

        var arrs = data[i]
        var type = arrs.type;
        switch (type) {
            case 'text':
                strs += restoreText(arrs);
                break;
            case 'image':
                strs += restoreImg(arrs, num);
                break;
            case 'item':
                strs += restoreItem(arrs);
                break;
            case 'video':
                strs+= restoreVideo(arrs);
                break;
        }
    }
    return strs;
}

function formatText(text) {

    var strs = "";
    var temp = "";
    temp = text.replace(/[\n|\r]/gi, function(i) {
        return ',';
    })

    temp = temp.split(',');

    for (var i = 0; i < temp.length; i++) {
        var content = $.trim(temp[i]);
        if (content != '') {
            strs += '<p>' + content + '</p>';
        }
    }
    return strs;
}

//恢复标题
function restoreTitle(data) {
    var name = data.name

    if (name) {
        name = decode(name);       
        $title.val(name);
        $topicTitleTips.hide();
        $titleCharLen.html(name.length);
    }

}

//恢复文字
// 有richText键，有值   渲染 richtext

// 有richText键，值为空  不渲染text

// 没有richText键  ，text有值  渲染 text


function restoreText(data) {
    var r =data.richText;
    // 有键

    if ( r != 'undefined') { 

        //有值
        if(r != ''){

            var isVideo = /video-id="[\d]+"/.test(r);

            var regVideo = /video-id=["'](.*?)["']/;
            r = r.replace('<p></p>','<p><br/></p>');
            //r = imgReplace.orignalImgReplace(r);
            r = r.replace(/-600!80/g,'');
            r = r.replace(/\.600q80\.jpg/g,'');

            if(isVideo){
                r = r.replace('</div>',"");
                r = r.replace('<div',"<img");

                r.replace(regVideo,function($1,$2){
                    videoArr.push(parseInt($2));
                    return $1;
                })
                
            }
            return r;
        //无值
        }else{
            return '';
        }

    } else {
        if (data.text != '') {
            //return '<p>' + data.text + '</p>';
            return formatText(data.text);

        } else {
            return '';
        }
    }
}
//恢复图片
//图片渲染需要渲染的情况：
// 1、type=image 且 richText有值，用richText渲染
// 2、type=image 且 没有richText字段，用url渲染

// 不需要渲染的情况：
// type=image 且 有richText字段但值为空
function restoreImg(data, num) {

    if (data.richText == "") {
        return '';
    }
    if (data.richText == undefined) {
        var scheme = data.scheme;
        var tempSrc = imgReplace.imgReplace(data.url);
        var tempProto = imgReplace.imgProto(data.url);
        tempSrc = imgReplace.orignalImgReplace(tempSrc);
        var img = '<img data-t ="t-' +
            num +
            '" data-type="insertImg" src="' +
            tempSrc +
            '" _src="' +
            tempSrc +
            '" proto="' +
            tempProto +
            '">';
        if(scheme){
            img = '<a href="' + scheme + '" target="_blank" >' + img + '</a>';
        }
        num++;

        var text = data.text;

        //处理回车换行符号
        if (text) {
            img += formatText(text);
        }
        return img;
    } else {
        return imgReplace.orignalImgReplace(data.richText);
    }

}

//恢复商品
function restoreItem(data) {

    var item = data;
    var json = {
        skuId: item.skuId,
        PId: item.id,
        shopId: data.shopId,
        link: item.itemDetailUrl,
        img: imgReplace.imgReplace(item.mainImage),
        price: item.salePrice,
        title: item.name
    }
    var tpl = itemTpl(json);

    if (empty(window.insertedGoods)) {
        window.insertedGoods = {};
    }

    window.insertedGoods[item.skuId] = json;
    //Pubsub(pubName.setPubliser.changedItem).pub(selectedGoods);
    if (data.richText == '') {
        return ''
    } else {
        return tpl;
    }

}

//恢复商品
function restoreVideo(data) {
    if(videoArr.indexOf(data.id) == -1 ){

        var obj = {
            src: imgReplace.imgReplace(data.coverImage),
            vId:data.id,
            path:imgReplace.imgReplace(data.url),
            des:data.text,
            len:data.length,
            proto:imgReplace.imgProto(data.url)
        }
        return videoTpl(obj);
    }else{
        return '';
    }

}

//恢复标签
function restoreLabel(data) {
    var labels = data.labels || [];
    var len = labels.length;
    if (len) {
        var str = "";
        for (var i = 0; i < len; i++) {
            var label = labels[i];
            str += labelTpl({
                id: label.id,
                name: decode(label.name)
            })
        }
        $crtLists.html(str);

    }
}

//恢复圈子
function restoreGroup(data) {

    var gid = data.groupId;
    if (gid) {
        $selectGroup
            .attr("data-groupid", gid)
            .text(data.group.name);
    }
}

module.exports = restore
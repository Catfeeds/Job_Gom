var $title = $('[data-node=topicTitle]');
var $topicTitleTips = $('[data-node=topicTitleTips]');
var $titleCharLen = $('[data-node=titleCharLen]');
var $crtLists = $('[data-node=crt-lists]');
var $selectGroup = $('[data-action=selectGroup]');
var empty = require('module/empty');
var decode = require('utils/decodeHtml.js');

var labelTpl = require('../plugin/restore/lenovoLabel.tpl');
var itemTpl = require('../plugin/goods/restoreGoods.tpl');

var imgReplace = require('utils/imgReplace');

var isMeihao = $GLOBAL_CONFIG.channel;

var originRule1 = /\.600q80\.jpg/gi;
var originRule2 = /-600!80\./g;


function orignText(str){
    str = str.replace(originRule1,'');
    return str.replace(originRule2,'.');
}

function restore(data) {
    if (data.success == true) {
        var num = 0;
        var strs = "";
        var datas = data.data;
        var components = datas.components;

        restoreTitle(datas);
        restoreLabel(datas);
        restoreGroup(datas)

        for (var i = 0; i < components.length; i++) {

            var arrs = components[i]
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
            }

        }
        return strs;
    }
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
            //r = imgReplace.orignalImgReplace(r);
            r = orignText(r);
            if(isVideo && isMeihao){
                r = r.replace('</div>',"");
                r = r.replace('<div',"<img");
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
            '">'
        num++;

        var text = data.text;

        //处理回车换行符号
        if (text) {
            img += formatText(text);
        }

        return img;
    } else {
        return data.richText;
    }

}

//恢复商品
function restoreItem(data) {

    var item = data.item;
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

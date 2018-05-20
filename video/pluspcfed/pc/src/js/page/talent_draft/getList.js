/*
 *@author:dongyukuan
 *@desc:获取草稿列表
 *@date:2017/6/12
 */

var fetch = require('io/fetch');
var url = require("io/url");
var toast = require('module/hint').init;

var itemTpl = require('./draft-item.tpl');

var $draftListBox = $('[data-node=draftListBox]');
var $getMore = $('[data-action=getMore]');
var $noDraft = $('[data-node=noDraft]');
var $loading = $('[data-node=loading]');

var topicUrl = '/expert/publish?from=2&tid=';

function addZero(num) {
    if (num < 10) {
        num = '0' + num;
    }
    return num;
};

function getList(pageNum, cb) {
    pageNum = pageNum || 1;
    cb = cb || function() {};
    fetch.get(url.get('draftsList'), {
        data: {
            pageNum: pageNum
        }
    }).done(function(result) {
        cb(result);
        if (result.code == 200) {
            var listAry = result.data.topics;
            var ownedTopicQuantity = result.data.ownedTopicQuantity;
            $loading.addClass('none');
            if (pageNum == 1) {
                if (!listAry.length) {
                    $noDraft.removeClass('none');
                } else {
                    $draftListBox.removeClass('none');
                    if (ownedTopicQuantity > 10) {
                        $getMore.removeClass('none');
                    }
                }
            }
            //设置滚动条距顶端的高度
            if (pageNum == 1 && $.cookie('scrollTop')) {
                $(document).scrollTop($.cookie('scrollTop'));
                $.cookie('scrollTop',0,{expires:-1});
            }
            //加载更多按钮
            // listAry.length < 10 ? $getMore.addClass('none') : void 0;
            //渲染列表
            var listStr = '';
            listAry.forEach(function(item, index) {
                var addTime = new Date(item.addTime);
                item.addDate = addTime.getFullYear() + '-' + addZero(addTime.getMonth() + 1) + '-' + addZero(addTime.getDate());
                item.time = addZero(addTime.getHours()) + ':' + addZero(addTime.getMinutes());
                item.editUrl = topicUrl + item.id;
                item.topicId = item.id;
                if(index+1 == listAry.length){
                    item.lastCls = 'noBorder';
                }
                listStr += itemTpl({
                    data: item
                })
            });
            $draftListBox.append(listStr);
        } else {
            toast(result.message);
        }
    })
};
module.exports.init = getList;

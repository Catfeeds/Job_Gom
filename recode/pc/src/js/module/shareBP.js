/*
@Author:dongyukuan
@data:2017/3/2
话题详情页和圈子主页的分享埋点
使用方法：
    1、var shareBP = require('module/shareBP');
    2、shareBP(opts);
       注：opts={
            page:是圈子主页还是话题详情页
            shareTo:分享到微信、微博等
            share_id:topic_id或group_id
       }
*/

var fetch = require("io/fetch");
var api = 'https://beacon.gomeplus.com/log_share';
var shareObj = {
    ht: {
        share: {
            qq: '2010506904',
            qz: '2020506904',
            wx: '2030506904',
            wb: '2050506904'
        },
        url: {
            qq: location.href + '&cmpid=fx_pc_qq' + $_CONFIG.share_time,
            qz: location.href + '&cmpid=fx_pc_qz' + $_CONFIG.share_time,
            wx: location.href + '&cmpid=fx_pc_wx' + $_CONFIG.share_time,
            wb: location.href + '&cmpid=fx_pc_wb' + $_CONFIG.share_time
        }
    },
    qz: {
        share: {
            qq: '2010507903',
            qz: '2020507903',
            wx: '2030507903',
            wb: '2050507903'
        },
        url: {
            qq: location.href + '&cmpid=fx_pc_qq' + $_CONFIG.share_time,
            qz: location.href + '&cmpid=fx_pc_qz' + $_CONFIG.share_time,
            wx: location.href + '&cmpid=fx_pc_wx' + $_CONFIG.share_time,
            wb: location.href + '&cmpid=fx_pc_wb' + $_CONFIG.share_time
        }
    },
    user_id: $_CONFIG.userId,
    cookie_id: $_CONFIG.share_ssid,
    env: $_CONFIG.share_env
};

function jianjie(data) {
    console.log(data)
};

function shareBP(opts) {
    var page = opts.page; //需传入'topic'(话题详情页)；'circle'(圈子主页);
    var shareTo = opts.shareTo; //分享到哪(qq,qzone,wx,sina);
    var share_id = opts.shareId; //topic_id或group_id;
    function getcookie(objname){//获取指定名称的cookie的值
        var cookieArr = document.cookie.split("; ");
        for(var i = 0;i < cookieArr.length;i ++){
            var temp = cookieArr[i].split("=");
            if(temp[0] == objname) return unescape(temp[1]);
        }
    }
    var shareData = {
        'sp':'plus',
        'pf':'pc',
        'sc':shareTo,
        'st':page,
        'ss':0,
        'pid':window.page_id,
        'sid':share_id,       
        'uid':shareObj.user_id,
        'cid':getcookie('__gmz'),
        'url': shareObj[page].url[shareTo],
        'env': shareObj.env,
        'di':''
    };
    shareData = JSON.stringify(shareData);
    fetch.post(api, {
        data: shareData
    }).done(function(data) {})
};
module.exports = shareBP;

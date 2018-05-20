/*
 *@author:dongyukuan
 *@desc:不断寻觅滚动加载
 *@date:2017/5/8
 */

require('lazyload');
var url = require('io/url');
var fetch = require('io/fetch');
var goOnTpl = require('./goOn.tpl');

var $container = $('[data-node=container]');

var bpBefore = 'group-PGPH0101-';

var initGoOn = function() {
    var topicPath = $_CONFIG.group_domain + 'topic/';
    var imgDomain = $GLOBAL_CONFIG.pcimgpath;
    var groupDomain = $_CONFIG['group_domain'];
    var api = groupDomain + url.get('getHomepageGoOn');
    fetch.get(api).done(function(data) {
        if (!data.success || !data.data.length) return;
        var dataAry = data.data;
        for (var i = 0; i < dataAry.length; i++) {
            var modNum = i + 1;
            dataAry[i].topicURL = topicPath + dataAry[i].id + '.html?intcmp=' + bpBefore + modNum;
        }
        var html = goOnTpl({
            goOnData: dataAry,
            imgpath: imgDomain
        });
        $container.append($(html));
        var $goOn = $('[data-node=goOn]');
        $goOn.find('img').lazyload({
            effect: 'fadeIn',
            failure_limit: 10
        });
    });
}
var goOnFlag = 1;

var scrollLoading = function() {
    if (!goOnFlag) return;
    if ($(document).scrollTop() + $(window).height() + 400 >= $container.offset().top + $container.height()) {
        //加载不断寻觅
        initGoOn();
        goOnFlag = 0;
    }
};
var initEvent = function() {
    $(window).on('scroll', scrollLoading);
}
module.exports.init = initEvent;

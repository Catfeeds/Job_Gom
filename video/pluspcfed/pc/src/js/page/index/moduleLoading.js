require('lazyload');
var fetch = require('io/fetch');
var noop = function() {};
var moduleLoading = function(opts) {
    var api = opts.api,
        container = opts.container,
        callback = opts.callback || noop,
        tpl = opts.tpl;
    fetch.get(api).done(function(data) {
        if (!data.success) return;
        var tplData = data.data;
        //配置域名
        tplData.group_domain = $GLOBAL_CONFIG.group_domain;
        tplData.imgpath = $GLOBAL_CONFIG.pcimgpath;
        tplData.staSite = $GLOBAL_CONFIG.staSite;
        //配置埋点
        tplData.bp_hmxtj = $GLOBAL_CONFIG.hmxtj;//品质生活
        tplData.bp_hqzht = $GLOBAL_CONFIG.hqzht;//圈子话题
        tplData.bp_hggsp = $GLOBAL_CONFIG.hggsp;//逛逛商品
        tplData.bp_hxqqz = $GLOBAL_CONFIG.hxqqz;//兴趣圈子

        //处理兴趣圈子和逛逛商品一个接口返回两组数据
        if (api.indexOf('productGrouplist') > 0) {
            tplData.goodsBanner = tplData.goods.banner;
            tplData.goodsList = tplData.goods.goods;
            tplData.keyword = tplData.goods.keyword;
        };
        var html = tpl(tplData);
        container.append(html);
        container.find('img').lazyload({
            effect: 'fadeIn',
            failure_limit: 10
        });
        callback();
    })
}
module.exports = moduleLoading;

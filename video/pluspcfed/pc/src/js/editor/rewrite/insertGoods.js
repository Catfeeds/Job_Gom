var alert = require('module/popup/alert');
var config = require('editor/config');

UE.commands['insertgoodshtml'] = {
    execCommand: function(command, html, notNeedFilter) {
        var me = this;
        //限制商品数量
        var limitNum = config.goodsLimitNUm;
        var reg = /<div.*?gmp-ebox.*?>/gi;
        //获取html的商品数
        var innerGoods = html.match(reg),
            innerGoodsLen = innerGoods ? innerGoods.length : 0;
        //获取editor商品数
        var ueGoods = me.getContent().match(reg),
            outerGoodsLen = ueGoods ? ueGoods.length : 0;

        if (innerGoodsLen + outerGoodsLen > limitNum) {
            html = '';
            alert('您最多能添加' + limitNum + '个商品哦！');
            return;
        }

        me.execCommand('inserthtml', html, true);
        return false;
    }
};

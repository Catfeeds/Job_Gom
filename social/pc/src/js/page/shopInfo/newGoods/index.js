var tpl = require('./goods.tpl');
var init = function(data, shopId) {
    var $goodBox = $('[data-node="goodsBox"]'),
        $moreComments = $goodBox.find('.more-comments'),
        $moreBtn = $goodBox.find('[data-action="moreGoods"]'),
        html = '',
        hostName = $_CONFIG.mall_domain;
    for (var i in data) {
        var $goodList = $goodBox.find('[data-node=' + i + ']');
        var dateTitles = $goodBox.find('[data-tip=dateTitle]');
        if ($goodList.length == 0) {
            if (dateTitles.length >= 7) {
                $moreBtn.html('<span>没有可加载内容</span>');
                return;
            }
            $moreComments.before('<h2 class="title">' + data[i].title + '</h2><ul class="clearfix" data-node="' + i + '" data-tip="dateTitle"></ul>');
            $goodList = $goodBox.find('[data-node=' + i + ']');
        }
        html = tpl({
            data: data[i].data,
            shopId: shopId,
            hostName: hostName
        });
        $goodList.append(html);
    }
};

module.exports = init;

var tpl = require('./shopInfo.tpl');
var init = function(data, shopId) {
    var $goodBox = $('[data-node="goodsBox"]'),
        $goodList = $goodBox.find('ul'),
        html = '',
        hostName = $_CONFIG.product_item_gome;
    html = tpl({
        data: data,
        shopId: shopId,
        hostName: hostName
    });
    $goodList.append(html);
};

module.exports = init;
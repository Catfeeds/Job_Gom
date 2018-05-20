var pictureTpl = require('../pictures.tpl');
var itemTpl = require('./item.tpl');
var $topicTitle = $('[data-node=topicTitle]');
var $topicTitleTips = $('[data-node=topicTitleTips]');
var $editor = $('[data-node=editor]');
var init = function(data) {
    var _data = data;
    if (typeof _data === 'string') {
        return false;
    }
    $topicTitleTips.hide();
    $topicTitle.val(_data.sku.item.name);
    $editor.val(_data.commentContent);
    var images = {
        images: _data.commentImages
    };
    var item = {
        data: _data
    };
    item.data.url = $_CONFIG.mall_domain + 'product/' + item.data.shopId + '-' + item.data.sku.item.id + '.html';
    var pictureHTML = pictureTpl(images);
    var itemHTML = itemTpl(item);
    $('[data-node=picAndShop]').append(pictureHTML);
    $('[data-node=picAndShop]').append(itemHTML);
    setTextareaHeight();
};

// textarea自适应高度
function setTextareaHeight() {
    $('[data-node=pictureDesc]').placeholder();
    $('[data-node=pictureDesc], [data-node=goodsDesc]').tah({
        moreSpace: 10,
        maxHeight: 200,
        animateDur: 100
    });
}

module.exports = {
    init: init
};
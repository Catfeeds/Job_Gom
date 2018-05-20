require('placeholder');

var pictureTpl = require('../pictures.tpl');
var itemTpl = require('./item.tpl');
var ueditor = require('editor/index');
var editor = ueditor('editor');

var $topicTitle = $('[data-node=topicTitle]');
var $topicTitleTips = $('[data-node=topicTitleTips]');

var init = function(data) {
    var _data = data;
    if (typeof _data === 'string') {
        return false;
    }
    $topicTitleTips.hide();
    $topicTitle.val(_data.sku.item.name);
    $topicTitle.trigger('input');

    var images = {
        images: _data.commentImages
    };
    var item = {
        data: _data
    };
    item.data.url = $_CONFIG.mall_domain + 'product/' + item.data.shopId + '-' + item.data.sku.item.id + '.html';
    var pictureHTML = pictureTpl(images);
    var itemHTML = itemTpl(item);

    editor.addListener('ready', function() {
        var placeholderCls = 'placeholder';
        $(editor.body).removeClass(placeholderCls);
        $(editor.container).addClass('edui-nobg');
        editor.focus();

        editor.execCommand('inserthtml', pictureHTML);
        editor.execCommand('inserthtml', itemHTML);
    });
};


module.exports = {
    init: init
};
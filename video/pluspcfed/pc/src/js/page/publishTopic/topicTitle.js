/**
 * 发布话题--标题
 * @auhor Zhengchun Fu
 */
require('textchange');

var $topicTitleTips = $('[data-node=topicTitleTips]');
var $topicTitle = $('[data-node=topicTitle]');

var topicTitleMaxLen = 50;

$(window).on('load', function() {
    $topicTitle.focus();
    $topicTitle.blur();
});

$('[data-node=titleCharMaxLen]').text(topicTitleMaxLen);

// placeholder显示隐藏
$topicTitle.on('focus', function() {
    $topicTitleTips.hide();
}).on('blur', function() {
    var titleVal = $.trim($(this).val());
    $(this).val(titleVal);
    if (titleVal.length) {
        $topicTitleTips.hide();
    } else {
        $topicTitleTips.show();
    }
});

// 计算标题字数
// 当输入的时候字数及时显示改变
$topicTitle.on('textchange', function() {
    var titleVal = $.trim($(this).val());
    var len = titleVal.length;
    if (len > topicTitleMaxLen) {
        $(this).val(titleVal.substr(0, topicTitleMaxLen));
        len = topicTitleMaxLen;
    }
    $('[data-node=titleCharLen]').text(len);
    return false;
});
/**
 * 留言内容
 * @author QiaoLi
 */

var $message = $('[data-node=message]');
var $messageNum = $('[data-node=messageNum]');

//输入留言内容
var intercept = function(str, max) {
    var messageVal = $.trim(str.val());
    var len = messageVal.length;
    if (len > max) {
        str.val(messageVal.substr(0, max));
        len = max;
    }
    $messageNum.text(len);
};

var init = function() {
    $message.on('input propertychange', function() {
        intercept($message, 200);
    });
};

module.exports = {
    init: init
};
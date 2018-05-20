//表情添加

var checkLoginStatus = require('module/checkLoginStatus'); // 登陆判断
var face = require('module/popup/face/face');
var loginState = require('./loginState');

var textareaTips = '[data-node="textareaTips"]';
var curretTextArea = [];
var $showBox;
var selectText = function(textbox, startIndex, stopIndex) {
    if (textbox.setSelectionRange) {
        textbox.setSelectionRange(startIndex, stopIndex);
    } else if (textbox.createTextRagen) {
        var range = textbox.createTextRange();
        range.collapse(true);
        range.moveStart('character', startIndex);
        range.moveEnd('character', stopIndex - startIndex);
        range.select();
    }
    textbox.focus();
};

var insertAtCursor = function(textbox, text) {
    if (textbox.selectionStart >= 0) {
        var val = textbox.value;
        var startIndex = textbox.selectionStart;
        textbox.value = val.substring(0, startIndex) + text + val.substring(textbox.selectionEnd);
        textbox.selectionStart = textbox.selectionEnd = startIndex + text.length;
        textbox.focus();
    } else if (typeof document.selection != 'undefined' && typeof document.selection.createRange != 'undefined') {
        textbox.focus();
        $(textbox).siblings(textareaTips).addClass('hide');
        var range = document.selection.createRange();
        range.text = text;
        range.select();
    }
};
var showEmoji = function() {
    if ($showBox) {
        $showBox.hide();
    } else {
        $showBox = $('[data-node="picPopBox"]');
        $showBox.hide();
    }

    if (!checkLoginStatus()) {
        loginState.popUnion();
        return false;
    }

    var $this = $(this);

    var offset = $this.offset();
    var x = offset.left - 2;
    var y = offset.top + 38;

    curretTextArea = $this.closest('.topic-publish-content').children("textarea");
    curretTextArea.focus();
    if ($('[data-node="faceBox"]').is(':hidden')) {
        face.show(x, y);
    } else {
        face.hide();
    }

    return false;
};

module.exports = {
    showEmoji: showEmoji,
    insertAtCursor: insertAtCursor,
    selectText: selectText,
    curretTextAreaObj: function() {
        return curretTextArea.get(0);
    }
}

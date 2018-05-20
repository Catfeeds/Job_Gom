/**
 * 文本选中方法
 * @author Zhengchun Fu
 * @param  {[object]} dom   要进行选择的dom
 * @param  {[type]} start 要选择的文本的起始位置
 * @param  {[type]} end   要选择的文本的结束位置
 * @return {[type]}       null
 */
var textSelect = function(dom, start, end) {
    var sel, range;
    start = start || 0;
    end = end || dom.innerHTML.length;
    if (window.getSelection && document.createRange) {
        range = document.createRange();
        range.setStart(dom.firstChild, start);
        range.setEnd(dom.lastChild, end);
        sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (document.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(dom);
        range.collapse();
        range.moveStart("character", start);
        range.moveEnd("character", end - start);
        range.select();
    }
};

module.exports = textSelect;

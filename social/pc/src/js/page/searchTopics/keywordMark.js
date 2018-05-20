//参数：
//nodeName:jquery选择器对象或对象集合,为直接包含所要过滤内容的节点
//keywordMark.init({
//	a:$('[data-node=list_title]'),
//	b:$('[data-node=list_description]')
//},keyword);
//markText:需要替换成的文字
var init = function(nodeName, markText) {
    var _nodeName = nodeName;
    var textArr = markText.split('+');
    var marker = function(nodeName, markText) {
        var reg = new RegExp(markText, 'g');
        for (var i in nodeName) {
            $(nodeName[i]).each(function(index) {
                var _this = $(this);
                var text = _this.text();
                if (text.indexOf(markText) > -1 && (text.indexOf('img') == -1 && text.indexOf('src') == -1)) {
                    text = text.replace(reg, '<aside style="color:red;display:inline">' + markText + '</aside>');
                    _this.html(text);
                }
            });
        }
    };
    for (var i = 0; i < textArr.length; i++) {
        if (textArr[i].length > 0) {
            marker(_nodeName, textArr[i]);
        }
    }
};

module.exports = {
    init: init
};

baidu.editor.ui.Button.prototype.getHtmlTpl = function() {
    return '<div id="##" class="edui-box %%">' +
        '<div id="##_state" stateful>' +
        '<div class="%%-wrap">' +
        '<a id="##_body" unselectable="on" ' + (this.title ? 'title="' + this.title + '"' : '') +
        ' class="%%-body" onmousedown="return $$._onMouseDown(event, this);" onclick="return $$._onClick(event, this);" href="javascript:;">' +
        (this.showIcon ? this.iconEle : '') +
        (this.showText ? '<span>' + this.label + '</span>' : '') +
        '</a>' +
        '</div>' +
        '</div></div>';
};
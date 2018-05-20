/**
 * @description 
 * 处理firefox不能正常选中图片的bug
 * 
 * @author 林飞
 */

var browser = baidu.editor.browser;
var gecko = browser.gecko ? browser.version : 0;
var ieversion = browser.ie ? browser.version : 0;

if (gecko) {

    UE.plugin.register('selectImg', function() {
        var me = this;
        me.addListener('click', function() {
            var range = me.selection.getRange(),
                startContainer = range.startContainer,
                nodeName = startContainer.nodeName;

            if (nodeName == "P" && startContainer.innerHTML.indexOf('<img') != -1) {
                range.selectNode(startContainer).select();
            }
        })
    })
}

if (ieversion > 7) {

    UE.plugin.register('wrapText', function() {
        var me = this;
        var domUtils = UE.dom.domUtils;
        me.addListener('keyup', function(evtName, evt) {
            var keyCode = evt.keyCode || evt.which;

            var range = me.selection.getRange();
            var startContainer = range.startContainer;

            var pre = startContainer.previousSibling;
            var next = startContainer.nextSibling;
            if (pre && pre.nodeName == "IMG") {
                if (keyCode != 8) {
                    $(pre).after('<br>');
                } else {
                    $(pre).remove();
                    domUtils.preventDefault(evt);
                }
            }
            if (next && next.nodeName == "IMG") {
                if (keyCode != 8) {
                    $(next).before('<br>');
                    domUtils.preventDefault(evt);
                }
            }
        })

    })
}
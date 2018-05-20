var grepHtml = require('editor/rewrite/grepRule');
var pastedCheckImg = require('./pastedCheckImg');
/**
 * @description
 * 过滤粘贴进来的文本
 *
 * @author linfei
 */
UE.plugin.register('grepPaste', function(e) {

    var me = this;
    var domUtils = UE.dom.domUtils;
    me.addListener('beforepaste', function(type, html) {
        html.html = grepHtml(me, html.html);
        if (html.html.indexOf('src') !== -1) {
            pastedCheckImg(me);
        }

    });

})

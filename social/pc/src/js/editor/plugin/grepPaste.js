var grepHtml = require('editor/rewrite/grepRule');
/**
 * @description 
 * 过滤粘贴进来的文本
 * 
 * @author linfei
 */
UE.plugin.register('grepPaste', function() {
    var me = this;

    me.addListener('beforepaste', function(type, html) {

        html.html = grepHtml(me, html.html)
    });
})
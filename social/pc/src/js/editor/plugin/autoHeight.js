/**
 * 处理IE渲染延迟导致高度计算失误
 * 
 * @林飞
 */
UE.plugin.register('fixHeight', function() {
    var me = this;
    var browser = baidu.editor.browser;
    var ieVersion = browser.ie ? browser.version : 0;

    if (ieVersion > 7) {
        me.addListener('afterinserthtml', function() {
            setTimeout(function() {
                me.body.style.height = "auto";
            }, 500)
        })
    }

});
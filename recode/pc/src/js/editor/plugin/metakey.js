/**
 * @description 处理mac上 command + i, ctrl + u
 * mac平台上,
 * keyCode: 66 -> b, f -> 70, i -> 73, u -> 85
 * @author jiyunpeng
 */
UE.plugins['metakey'] = function() {
    var me = this;
    var preventDefault = UE.dom.domUtils.preventDefault;
    me.addListener('keydown', function(type, evt) {
        var keyCode = evt.keyCode || evt.which;
        if (evt.metaKey) {
            if (keyCode === 73 || keyCode === 66) { // command + i, b
                preventDefault(evt);
            }
        } else if (evt.ctrlKey) {
            if (keyCode === 85 || keyCode === 66 || keyCode === 70 || keyCode === 73) {
                preventDefault(evt);
            }
        }
    });
};

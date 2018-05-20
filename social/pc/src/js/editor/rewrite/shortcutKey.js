var Editor = UE.Editor;
var domUtils = UE.dom.domUtils;

//禁止使用的快捷键  目前为加粗，下划线，斜体 ,还原
//禁止的快捷键,后期自行增加
var banKey = [66, 73, 85, 89];
//有回调的快捷键,后期自行增加
var callbackArr = [{
    'key': 90,
    'callback': ctrl_z
}];


//撤销的回调函数
function ctrl_z() {
    var ue = UE.getEditor('editor');
    var txtBefore = ue.getContent();

    UE.getEditor('editor').execCommand('undo');

    var txtAfter = ue.getContent();
    if (txtBefore !== txtAfter) {
        z();
    }
}

function z() {
    console.log("this it's z callback");
}


Editor.prototype._bindshortcutKeys = function() {
    var me = this,
        shortcutkeys = this.shortcutkeys;
    var bankeyArr = me.options.banKey || [];
    var callbackArr = me.options.callbackKey || [];
    me.addListener('keydown', function(type, e) {
        var keyCode = e.keyCode || e.which;
        var ban = bankeyArr.indexOf(keyCode) != -1;
        var callbackLength = callbackArr.length;
        var callback = 0;
        //var callback = callbackArr.indexOf(keyCode) != -1;

        if (e.ctrlKey) {
            if (ban) {
                domUtils.preventDefault(e);
                return;
            }

            if (callbackLength) {
                for (var i = 0; i < callbackLength; i++) {
                    if (callbackArr[i].key == keyCode) {

                        callbackArr[i].callback();
                        domUtils.preventDefault(e);
                        return;
                    }
                }
            }
        }

        for (var i in shortcutkeys) {
            var tmp = shortcutkeys[i].split(',');
            for (var t = 0, ti; ti = tmp[t++];) {
                ti = ti.split(':');
                var key = ti[0],
                    param = ti[1];


                if (/^(ctrl)(\+shift)?\+(\d+)$/.test(key.toLowerCase()) || /^(\d+)$/.test(key)) {

                    if (((RegExp.$1 == 'ctrl' ? (e.ctrlKey || e.metaKey) : 0) && (RegExp.$2 != "" ? e[RegExp.$2.slice(1) + "Key"] : 1) && keyCode == RegExp.$3) ||
                        keyCode == RegExp.$1
                    ) {
                        if (me.queryCommandState(i, param) != -1)
                            me.execCommand(i, param);
                        domUtils.preventDefault(e);
                    }
                }
            }

        }
    });
};

module.exports = {
    callbackKey: callbackArr,
    banKey: banKey
};
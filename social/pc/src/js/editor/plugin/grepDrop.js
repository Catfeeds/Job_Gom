//var grepHtml = require('editor/rewrite/grepRule');
/**
 * @description 
 * 过滤拖拽进来的文本
 * 
 * @author linfei
 */

UE.plugin.register('grepDrop', function() {
    var me = this;
    var domUtils = UE.dom.domUtils;
    var target = 0;
    var browser = baidu.editor.browser;
    var ieVersion = browser.ie ? browser.version : 0;
    var dropStr = "";
    var tempRange = ""; //存放拽入的选区 

    var grepRule = {

        grepFormat: /[\n]/gi,

        grepCursor: /[\u200b]/gi, //光标

        grepImg: /(.?)(<img.*?>)(.?)/gi,

        grepDiv: /<div class=["']card-box.*?i<\/div><\/div>/gi
    }

    //过滤html
    var grepHtml = function(obj) {
        var arr = obj.replace(grepRule.grepFormat);
        arr = arr.split(grepRule.grepDiv); //过滤掉商品

        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i]
                .replace(grepRule.grepCursor, '')
                .replace(grepRule.grepImg, function(i, j, k, l) {
                    var front = "";
                    var back = "";
                    if (j != ">") {
                        front = "<br>";
                    }
                    if (l != "<") {
                        back = "<br>";
                    }
                    return front + k + back;
                })

        }
        return arr;
    }

    return {
        bindEvents: {
            'ready': function() {

                var _body = me.body;
                domUtils.on(document, 'dragstart', function() {
                    target = 0;
                })

                $(_body).delegate("div", "dragstart", function(evt) {
                    target = 0;
                    domUtils.preventDefault(evt);
                })

                domUtils.on(_body, 'dragstart', function() {
                    target = 1;
                    if (ieVersion > 7) {
                        var range = me.selection.getRange();
                        var fragment = range.cloneContents();
                        var _node = document.createElement("div");

                        tempRange = range;

                        _node.appendChild(fragment)
                        dropStr = _node.innerHTML;
                        dropStr = grepHtml(dropStr).join("");

                    }
                })

                domUtils.on(_body, 'drop', function(evt) {
                    if (!target) {
                        domUtils.preventDefault(evt);
                    }

                    if (ieVersion > 7) {
                        if (tempRange) {
                            tempRange.deleteContents();
                        }
                        me.execCommand("insertHtml", dropStr);
                        domUtils.preventDefault(evt);
                    }

                    tempRange = "";
                    target = 0;
                    dropStr = "";
                })
            }
        }
    }
})

/*,备用

commands:{
    'haha': {
        execCommand: function (cmd, str) {
            //var range = me.selection.getRange();
            //range.select();
            //me.focus();
            me.execCommand("insertHtml",str,true);                   
            //me.execCommand('anchor', 'anchor1')
        }
    }
    
}*/
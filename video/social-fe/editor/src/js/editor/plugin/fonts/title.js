var domUtils = UE.dom.domUtils;

var utils = UE.utils;

var getContent = require('editor/utils/getContent');

var changeTagName = function(editor, tagName, key, value) {
    if (tagName == value) {
        editor.execCommand(key, 'p');
    } else {
        editor.execCommand(key, value);
    }
}

UE.registerUI('h2 h1', function(editor, uiName) {
    //console.log(uiName)
    //注册按钮执行时的command命令，使用命令默认就会带有回退操作
    /*  editor.registerCommand(uiName, {
         execCommand: function() {
             alert('execCommand:' + uiName)
         }
     }); */
    //创建一个button
    var aliasName;
    var args = 0; //参数个数
    var key = "";
    var value = "";

    switch (uiName) {
        case 'h1':
            aliasName = "h1";
            args = 1;
            key = "Paragraph";
            value = "h1"
            break;
        case 'h2':
            aliasName = "h2";
            args = 1;
            key = 'Paragraph';
            value = 'h2';
            break;
    }

    var btn = new UE.ui.Button({
        //按钮的名字
        name: aliasName,
        //提示
        title: aliasName,
        //添加额外样式,指定icon图标,这里默认使用一个重复的icon
        //cssRules: 'background-position: -500px 0;',
        //iconEle: '<em class="insert-imoj iconn-27">' + aliasName + '</em>',
        //点击时执行的命令
        onclick: function(e) {
            var range = editor.selection.getRange();
            if (getContent(range).indexOf('gmp-ebox') != -1) {
                return false;
            }
            //这里可以不用执行命令,做你自己的操作也可
            var startDom = range.startContainer;
            var tag = domUtils.findParentByTagName(startDom, ['h1', 'h2', 'h3', 'p'], true);
            if (!tag) return false;
            var tagName = tag.tagName.toLowerCase();

            switch (tagName) {
                case 'p':
                    editor.execCommand(key, value)
                    break;
                case 'h1':
                    changeTagName(editor, tagName, key, value);
                    break;
                case 'h2':
                    changeTagName(editor, tagName, key, value);
                    break;
                case 'h3':
                    changeTagName(editor, tagName, key, value);
                    break;
                default:
                    break;

            }
            return;

        }
    });
    //当点到编辑内容上时，按钮要做的状态反射
    editor.addListener('selectionchange', function(e) {
        var range = editor.selection.getRange();
        var startDom = range.startContainer;
        var tag = domUtils.findParentByTagName(startDom, ['h1', 'h2', 'p'], true);
        if (!tag) return false;
        var tagName = tag.tagName.toLowerCase();

        if (tagName == uiName) {
            btn.setChecked(1);
        } else {
            btn.setChecked(0);
        }

        /*var state = editor.queryCommandState(uiName);
        console.log(state)
        if (state == -1) {
            btn.setDisabled(true);
            btn.setChecked(false);
        } else {
            btn.setDisabled(false);
            btn.setChecked(state);
        }
        btn.setChecked(1);*/
    });
    //因为你是添加button,所以需要返回这个button
    return btn;
}, 0);

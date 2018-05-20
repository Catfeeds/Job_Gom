/**
 * 插入链接
 * @author Lin Fei
 */

var showText = require('./showText');

UE.registerUI('insertlink', function(editor, uiName) {
   

    //注册按钮执行时的command命令，使用命令默认就会带有回退操作
    editor.registerCommand(uiName, {
        execCommand: function() {
            showText(editor);
        }
    });

    //创建一个button
    var btn = new UE.ui.Button({
        name: 'insertlink',
        title: '插入链接',
        label: '',
        iconEle: '<em class="insert-merchant iconn-29"></em>',
        cssRules: '',
        onclick: function() {
            editor.execCommand(uiName);
        }
    });

    //因为你是添加button,所以需要返回这个button
    return btn;
}, 13);
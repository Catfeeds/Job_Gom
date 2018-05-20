
//require('../../../../publishTopic/editor.js');
UE.registerUI('emoji-test2',function(editor,uiName){
    //注册按钮执行时的command命令，使用命令默认就会带有回退操作
    editor.registerCommand(uiName,{
        execCommand:function(){
            alert('execCommand:' + uiName)
        }
    });

    //创建一个button
    var btn = new UE.ui.Button({
        name:uiName,
		showIcon:false,
        title:uiName,
		className:'emoji-test',
		label:'<em class="insert-imoj icon"></em><span>表情</span>',
        onclick:function () {
           editor.execCommand(uiName);
        }
    });

    //当点到编辑内容上时，按钮要做的状态反射
    editor.addListener('selectionchange', function () {
        var state = editor.queryCommandState(uiName);
        if (state == -1) {
            btn.setDisabled(true);
            btn.setChecked(false);
        } else {
            btn.setDisabled(false);
            btn.setChecked(state);
        }
    });

    //因为你是添加button,所以需要返回这个button
    return btn;
}/*index 指定添加到工具栏上的那个位置，默认时追加到最后,editorId 指定这个UI是那个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮*/);
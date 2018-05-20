/**
 * 插入表情
 * @author Fu Xiaochun
 */

UE.registerUI('insertemoji', function(editor, uiName) {

	var face = editor.face;

	// 当点击编辑区获得焦点后，表情弹层隐藏。
	/*editor.addListener('focus', function(editor) {
		face.hide();
	});*/

	//注册按钮执行时的command命令，使用命令默认就会带有回退操作
	editor.registerCommand(uiName, {
		execCommand: function() {
			editor.focus();
			var $btn = $(btn.target);
			var offset = $btn.offset();
			var x = offset.left;
			var y = offset.top / 1 + 30;

			if (!face.isShow) {
				face.show(x, y);
			} else {
				face.hide();
			}
		}
	});

	// 激活光标
	editor.addListener('afterinserthtml', function() {
		editor.focus();
	});

	//创建一个button
	var btn = new UE.ui.Button({
		name: 'insertemoji',
		title: '插入表情',
		label: '表情',
		iconEle: '<em class="insert-imoj iconn-27"></em>',
		cssRules: '',
		onclick: function() {
			editor.execCommand(uiName);
		}
	});

	//当点到编辑内容上时，按钮要做的状态反射
	editor.addListener('selectionchange', function() {
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
}, 3);
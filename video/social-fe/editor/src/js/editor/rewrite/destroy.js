var domUtils = UE.dom.domUtils;

UE.Editor.prototype.destroy = function() {

	var me = this;
	me.fireEvent('destroy');
	var container = me.container.parentNode;
	var textarea = me.textarea;
	if (!textarea) {
		textarea = document.createElement('textarea');
		container.parentNode.insertBefore(textarea, container);
	} else {
		textarea.style.display = ''
	}

	textarea.style.width = me.iframe.offsetWidth + 'px';
	textarea.style.height = me.iframe.offsetHeight + 'px';
	textarea.value = me.getContent();
	textarea.id = me.key;
	container.innerHTML = '';
	domUtils.remove(container);
	var key = me.key;
	//trace:2004
	for (var p in me) {
		if (me.hasOwnProperty(p)) {
			delete this[p];
		}
	}
	UE.delEditor(key);
	$(window).off('mousewheel.editor');
	//$('[data-relative="editor"]').remove();
	$EDITOR = {};
}

UE.Editor.prototype.pageDestroy = function() {

	var me = this;
	//解绑事件
	$("body").off('.editor');
    $(window).off('.editor');
    $(me.body).off();
    $(me.document).off();
    //还原样式
    $(me.container).parent().removeClass('rich-text-editor');
	$('body').removeClass('opg-editor'); 
    this.setContent('');
    UE.instants = {};
    this.destroy();  
    $EDITOR = {}; 
}


		
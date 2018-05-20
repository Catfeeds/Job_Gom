var event = function(id,instance){
	var getEditor = function(){
		return UE.getEditor(id);
	}
	var editor = getEditor();
	editor.addListener('ready', function() {
        var channelName = $_CONFIG['channel'];
        var defaultContent = editor.getContent();
        var $editorBody = $(editor.body);
        var placeholderCls = 'placeholder';
        var meidianCls = 'meidian-placeholder';
        var $container = $(editor.container);
        var useMeidian = channelName && channelName == 'meidian'
        $editorBody.addClass(placeholderCls);

        //加载表情模块
        var faceModule = require('module/popup/face/index');
        var face = faceModule.init({
            onSelected: function(data) {
                var str = data.reg;
                getEditor().execCommand('inserthtml', str);
            }
        });

        editor.face = face;

        if(useMeidian){
             $editorBody.addClass(meidianCls);
        }

        $editorBody.delegate('.publish-item a', 'click', function(e) {
            //e.stopPropagation();
            e.preventDefault();
        })
        editor.addListener('focus', function() {
            $editorBody.removeClass(placeholderCls);
            $editorBody.removeClass(meidianCls);
            $container.addClass('edui-nobg');
        });
        editor.addListener('blur', function() {
            var hasDiv = !!$editorBody.find('div').length;
            var isEqDefault = editor.getContent() == defaultContent;
            var isContentEmpty = $.trim(editor.getContent()) == '';

            if ((isEqDefault && hasDiv) || isContentEmpty) {
                $editorBody.addClass(placeholderCls);
                if(useMeidian){
                    $editorBody.addClass(meidianCls);
                }
                $container.removeClass('edui-nobg');
            } else {
                $editorBody.removeClass(placeholderCls);
                $editorBody.removeClass(meidianCls);
                $container.addClass('edui-nobg');
            }
        });

        

        var $emojiBtn = $(editor.container.firstChild).find('.edui-for-insertemoji');
        var $pictorBtn = $(editor.container.firstChild).find('.edui-for-insertpicture');
        //var $picPopBox = $('[data-node=picPopBox]');
        // ÈÃ±íÇé°üËæ×ÅeditorBarµÄfixedÒ»Æðfixed
        
        $(window).on('mousewheel.editor', function() {
            editor.picPopBox.hide();
            if(editor.face.isShow){
                editor.face.$dom.hide();
            }
            
            
           /* var flagY = $emojiBtn.offset().top;
            var scrollTop = $(window).scrollTop();
            var top;

            if (scrollTop > flagY) {
                top = 0;
            } else {
                top = flagY;
            }
            top = top / 1 + 30;

            $picPopBox.css({
                'top': top + 'px'
            });

            if (!face.isShow) {
                return;
            }
            face.$dom.css({
                top: top + 'px'
            });*/

        });

        // 
        $emojiBtn.on('click.editor', function(e) {
            editor.picPopBox.hide();
            e.stopPropagation();            
            e.preventDefault();
        });

        $pictorBtn.on('click.editor', function(e) {
            face.hide();
            e.stopPropagation();
            e.preventDefault();
        });

        $("body").on('click.editor', function(event) {
            editor.picPopBox.hide();
            face.hide();
        })

        $(editor.document).on('mousewheel.editor', function() {

            editor.picPopBox.hide();
            face.hide();
        });

        $(editor.document).on('click.editor', function() {
            editor.picPopBox.hide();
            face.hide();
        });
        
        $(window).off('mousewheel.editor');

        /*editor.pageDestroy = function(){
        	//解绑事件
        	$("body").off('.editor');
	        $(window).off('.editor');
	        $(editor.body).off();
	        $(editor.document).off();
	        //还原样式
	        $(editor.container).parent().removeClass('rich-text-editor');
			$('body').removeClass('opg-editor'); 
            this.setContent('');
            UE.instants = {};
	        this.destroy();  
	        $EDITOR = {}; 
	    }*/

    });
}
module.exports = event;
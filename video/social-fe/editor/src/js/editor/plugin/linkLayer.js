/**
 * @description
 * 增加超链接对话框转化
 *
 * @author 林飞
 */


var showText = require('./link/showText');

UE.plugin.register('showLink', function(elm) {
    var me = this;
    var domUtils = UE.dom.domUtils;
    //禁止连续请求

    // img旋转弹层 鼠标离开，键盘事件都需要隐藏
    var linkTransformPopup = window.linkTransformPopup = new baidu.editor.ui.Popup({
        editor: me,
        theme: 'default',
        cutstomPosition: 'bottom-left',
        _editLink: function(el) {
           showText(me);
           linkTransformPopup.hide();
        },
        _delLink: function() {
            me.execCommand('unlink');
            linkTransformPopup.hide();
        }
    })

    linkTransformPopup.render();

    me.addListener('click', function(evtName, evt) {

        if(me.loading) return;

        var target = evt.target;
        if( $(target).parents('.card-box').length != 0) return;
        if (target && (target.tagName == "A" || $(target).parents('a').length!=0 )) {

            var html = '',
                str = "",
                img = target;
            var link = $(target).attr('href') || $(target).parents('a').attr('href');

            var range = me.selection.getRange(),
                //是否存在选区collapsed   startContainer === endContainer && startOffset === endOffset 
                isCollapsed = range.collapsed ? me.queryCommandValue( "link" ) : me.selection.getStart()
            if(!isCollapsed || isCollapsed.tagName == "P")  return;

            str =   '<nobr class="edui-link-container edui-clearfix">' +
                        '<p class="edui-link-box edui-clearfix clearfix">'+
                            '<a onclick=$$._editLink() class="editLink">'+link+'</a>' +
                            '<a onclick=$$._delLink() class="delLink">&nbsp;&nbsp;</a>' +
                        '</p>'+
                
                    '</nobr>'

            !html && (html = linkTransformPopup.formatHtml(str));
            var dom = linkTransformPopup.getDom('content')
            if (html) {               
                dom.innerHTML = html;
                linkTransformPopup.anchorEl = img || link;
                linkTransformPopup.showAnchor(linkTransformPopup.anchorEl);

            } else {
                linkTransformPopup.hide();
            }

            //超出高度隐藏
            var height = me.container.clientHeight;
            var containerTop = $(me.container).offset().top;
            var top = $(dom).offset().top;

            if(top > containerTop + height){
                linkTransformPopup.hide();
            }


        }
    })
     me.addListener('keyup', function(evtName, evt) {
        linkTransformPopup.hide();
     })
})

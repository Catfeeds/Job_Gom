/**
 * @description
 * 图片角度转化
 *
 * @author 林飞
 */
var alert = require('module/popup/alert');
var transform = require('./angle');
var showText = require('./link/showText');
UE.plugin.register('tansformImg', function(elm) {
    var me = this;
    var domUtils = UE.dom.domUtils;
    //禁止连续请求

    // img旋转弹层 鼠标离开，键盘事件都需要隐藏
    var imageTransformPopup = window.imageTransformPopup = new baidu.editor.ui.Popup({
        editor: me,
        theme: 'default',
        cutstomPosition: 'top-right',
        _filterType: function(el) {
            var src = $(el).attr("src");
            if (src.indexOf(".gif") != -1) {
                alert("gif图不支持旋转");
                return false;
            } else {
                return true;
            }
        },
        _link:function(){
            var range = me.selection.getRange();
            range.selectNode(this.anchorEl).select();
            showText(me,this.anchorEl);
        },
        _left: function() {
            var el = this.anchorEl;
            if (this._filterType(el)) {
                transform(this.anchorEl, 1);
            }
            me.focus();
        },
        _right: function() {
            var el = this.anchorEl;
            if (this._filterType(el)) {
                transform(this.anchorEl, 2);
            }
            me.focus();
        },
        _delete: function() {
            UE.dom.domUtils.remove( this.anchorEl, true )
            //$(this.anchorEl).remove();
            imageTransformPopup.hide();
            me.focus();
        }
    })

    imageTransformPopup.render();

    me.addListener('mouseover', function(evtName, evt) {
        if (me.loading) return;

        var target = evt.target;
        if($(target).attr('data-node') == 'goodsPic') return;
        //console.log(evt.target.tagName === 'IMG')
        //var img = me.selection.getRange().getClosedNode();
        //if (img && img.tagName == "IMG" && img.parentNode.tagName != "A") {
       // if (target && target.tagName == "IMG" && target.parentNode.tagName != "A") {
        if (target && target.tagName == "IMG" && !target.getAttribute('video-id')) {
            var html = '',
                str = "",
                img = target;

            str = '<nobr class="edui_angle_box edui-clearfix">' +
                '<span onclick=$$._link() class="edui-clickable"></span>' +
                '<span onclick=$$._left() class="edui-clickable"></span>' +
                '<span onclick=$$._right() class="edui-clickable"></span>' +
                '<span onclick=$$._delete() class="edui-clickable"></span>' +
                '</nobr>'

            !html && (html = imageTransformPopup.formatHtml(str));
            if (html) {
                imageTransformPopup.getDom('content').innerHTML = html;
                imageTransformPopup.anchorEl = img || link;
                imageTransformPopup.showAnchor(imageTransformPopup.anchorEl);
            } else {
                imageTransformPopup.hide();
            }
        }
    })

    me.addListener('mouseover', function() {
        imageTransformPopup.hide();
    })

})

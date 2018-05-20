baidu.editor.ui.Button.prototype.getHtmlTpl = function() {

    /* if (!this.iconEle) {

         var str;
         switch (this.title) {
             case "加粗":
                 str = "B";
                 break;
             case "斜体":
                 str = "I"
                 break;
             case "下划线":
                 str = "U"
                 break;
             case "有序列表":
                 str = "有"
                 break;
             case "无序列表":
                 str = "无";
                 break;
             case "居左对齐":
                 str = "左"
                 break;
             case "居中对齐":
                 str = "中"
                 break;
             case "居右对齐":
                 str = "右"
                 break;
             default:
                 str = "测试";
         }
         this.iconEle = "<em>" + str + "</em>";
     }
     return '<div id="##" class="edui-box %%">' +
         '<div id="##_state" stateful>' +
         '<div class="%%-wrap">' +
         '<a id="##_body" unselectable="on" ' + (this.title ? 'title="' + this.title + '"' : '') +
         ' class="%%-body" onmousedown="return $$._onMouseDown(event, this);" onclick="return $$._onClick(event, this);" href="javascript:;" data-node="toolbarBtn">' +
         (this.showIcon ? this.iconEle : '') +
         (this.showText ? '<span>' + this.label + '</span>' : '') +
         '</a>' +
         '</div>' +
         '</div></div>';*/

    return '<div id="##" class="edui-box %%">' +
        '<div id="##_state" stateful>' +
        '<div class="%%-wrap">' +
        '<div id="##_body" unselectable="on" ' + (this.title ? 'title="' + this.title + '"' : '') +
        ' class="%%-body" onmousedown="return $$._onMouseDown(event, this);" onclick="return $$._onClick(event, this);">' +
        (this.showIcon ? '<div class="edui-box edui-icon"></div>' : '') +
        /* (this.showText ? '<div class="edui-box edui-label">' + this.label + '</div>' : '') +*/
        '</div>' +
        '</div>' +
        '</div></div>';
};

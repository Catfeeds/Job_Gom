var utils = baidu.editor.utils,
    uiUtils = baidu.editor.ui.uiUtils,
    domUtils = baidu.editor.dom.domUtils,
    UIBase = baidu.editor.ui.UIBase;
var ANCHOR_CLASSES = ['edui-anchor-topright', 'edui-anchor-topright',
    'edui-anchor-bottomleft', 'edui-anchor-bottomright'
];
baidu.editor.ui.Popup.prototype.showAnchorRect = function(rect, hoz, adj) {
    var width = this.anchorEl.width;
    var height = this.anchorEl.height;
    this._doAutoRender();
    var vpRect = uiUtils.getViewportRect();
    baidu.editor.ui.Button.prototype
    this.getDom().style.visibility = 'hidden';
    this._show();
    var popSize = this.fitSize();
    var sideLeft, sideUp, left, top;
    if (hoz) {
        sideLeft = this.canSideLeft && (rect.right + popSize.width > vpRect.right && rect.left > popSize.width);
        sideUp = this.canSideUp && (rect.top + popSize.height > vpRect.bottom && rect.bottom > popSize.height);
        left = (sideLeft ? rect.left - popSize.width : rect.right);
        //top = (sideUp ? rect.bottom - popSize.height : rect.top);
    } else {
        sideLeft = this.canSideLeft && (rect.right + popSize.width > vpRect.right && rect.left > popSize.width);
        sideUp = this.canSideUp && (rect.top + popSize.height > vpRect.bottom && rect.bottom > popSize.height);
        left = (sideLeft ? rect.right - popSize.width : rect.left);
        //top = (sideUp ? rect.top - popSize.height : rect.bottom);

    }

    var popEl = this.getDom();
    var objs = {
        left: left,
        top: top
    }
    if (this.cutstomPosition) {
        if(this.cutstomPosition == 'top-right'){
            var popWidth = $(popEl).width()
            objs = {
                left: rect.right - popWidth,
                top: rect.top
            }
        }else{
            objs={
                left:left,
                top:rect.bottom
            }
        }
        
    }

    uiUtils.setViewportOffset(popEl, objs);
    domUtils.removeClasses(popEl, ANCHOR_CLASSES);
    popEl.className += ' ' + ANCHOR_CLASSES[(sideUp ? 1 : 0) * 2 + (sideLeft ? 1 : 0)];
    if (this.editor) {
        popEl.style.zIndex = this.editor.container.style.zIndex * 1 + 10;
        baidu.editor.ui.uiUtils.getFixedLayer().style.zIndex = popEl.style.zIndex - 1;
    }
    this.getDom().style.visibility = 'visible';

}

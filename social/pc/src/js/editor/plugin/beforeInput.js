/**
 * @description 
 * 处理不能正常删除图片的bug
 * 
 * @author jiyunpeng
 */
function removeNode(node) {
    $(node).remove();
}

UE.plugin.register('delImg', function() {
    var me = this;
    var domUtils = UE.dom.domUtils;
    me.addListener('keydown', function(evtName, evt) {
        var keyCode = evt.keyCode || evt.which;

        function removeOuterNode(node) {
            var nodeName = node.nodeName;
            switch (nodeName) {
                case "P":
                    var nodes = node.childNodes;
                    var len = nodes.length - 1;
                    if (nodes[len].nodeName == "IMG") {
                        //P标签里只有一个img
                        if (len == 0) {
                            removeNode(node);
                        } else {
                            removeNode(nodes[len]);
                        }
                        domUtils.preventDefault(evt);
                    }
                    break;
                case "DIV":
                    removeNode(node)
                    domUtils.preventDefault(evt);
                    break;
                case "IMG":
                    removeNode(node)
                    break;
            }
        }
        if (keyCode == 8) {
            //查找选区范围，所在节点是否为text，offset偏移值是否为0
            var range = me.selection.getRange();
            var startContainer = range.startContainer;
            var startOffset = range.startOffset;

            var nodeName = startContainer.nodeName;

            if (startOffset == 0) {
                var pre = startContainer.previousSibling;
                var prentPre = startContainer.parentNode.previousSibling
                switch (nodeName) {
                    case "#text":
                        //同级是img
                        if (pre) {
                            var _nodeName = pre.nodeName;
                            if (_nodeName == "IMG") {
                                removeNode(pre);
                                domUtils.preventDefault(evt);
                            }
                            break;
                        }
                        //上级
                        if (prentPre) {
                            removeOuterNode(prentPre);
                        }
                        break;
                    case "P":
                        if (pre) {
                            removeOuterNode(pre)
                        }
                        break;
                }
            }
        }
        if (keyCode == 46) {
            var _body = me.body
            var $b = $(_body).find("b:visible");
            if ($b.length) {
                $b.parent("[data-node='gmp-ebox']").remove();
                domUtils.preventDefault(evt);
            }

        }
    });
});
/**
 * @description
 * 处理不能正常删除图片
 *
 * @author 林飞
 */

var browser = baidu.editor.browser;
var gecko = browser.gecko ? browser.version : 0;

UE.plugin.register('delImg', function() {
    var me = this;
    var domUtils = UE.dom.domUtils;
    if (browser.version > 10 && !gecko) return; //ie10 以及chrome 不用处理
    //设置光标位置
    var setCursor = function(range, newNode, position) {

            range.setStart(newNode);
            if (position) {
                range.setEnd(newNode, position);
            } else {
                range.setEnd(newNode, 0);
            }

            range.setCursor(true);
        }
        //删除节点
    var deleteNode = function(node, evt) {
        node.remove();
        domUtils.preventDefault(evt);
    }

    //创建新行
    var creatNewP = function(range, parent) {
        var node = node;
        var doc = me.document;

        var newNode = doc.createElement('p');
        var textNode = doc.createTextNode("");
        newNode.appendChild(textNode);

        //插入当前节点前还是后
        if (range.startOffset == 0) {
            me.body.insertBefore(newNode, parent);
        } else {
            domUtils.insertAfter(parent, newNode);
        }

        setCursor(range, newNode);
    }

    me.addListener('keydown', function(evtName, evt) {
        var keyCode = evt.keyCode || evt.which;
        var range = me.selection.getRange();
        var startContainer = range.startContainer;

        var nodeName = startContainer.nodeName.toUpperCase();
        var startOffset = range.startOffset;
        var endOffset = range.endOffset;
        var closedNode = range.getClosedNode();

        var detectKey = function() {
            switch (keyCode) {
                case 8:
                    backspaceKey();
                    break;
                case 46:
                    deleteKey();
                    break;
                default:
                    defaultKey();
                    break;
            }
        }

        //删除键
        var backspaceKey = function() {
                if (startOffset == 0) {
                    //P的情况有以下几种：包括了 标题 h1,h2,h3
                    //1.1 当前为<p>|</p>或(<p><img></p>), 上一级为<p><img></p> 要删除上一级，否则会和下一级合并
                    //1.2 当前为<p><img></p>,上级为div 或者文本
                    //1.3 当前为<p>|</p> 上一级为div 或者文本
                    if (nodeName == "#TEXT") {
                        var parentNode = startContainer.parentNode;

                        var prev = parentNode.previousSibling;
                        var $prev = $(prev);
                        // console.log($prev.find("img").length)
                        if ($prev && $prev.attr('data-node') == 'gmp-ebox') {
                            deleteNode($prev, evt);
                        }

                    } else {
                        var prev = startContainer.previousSibling;
                        var $prev = $(prev);
                        if ($prev && $prev.attr('data-node') == 'gmp-ebox') {
                            deleteNode($prev, evt);
                        }
                    }
                    /*
                                        if (nodeName == "P") {
                                            var prev = startContainer.previousSibling;
                                            var $prev = $(prev);
                                            //第一种情况
                                            if ($(startContainer).find("img").length) {
                                                //1.1
                                                if ($prev.find("img").length) {

                                                    deleteNode($prev, evt);
                                                } else {
                                                    //1.2
                                                    //前一个节点不是光标或者空节点
                                                    if ($prev.text().replace(/[\u200b]/gi, "") != "") {
                                                        var last = prev.lastChild;
                                                        //光标插入文本末端
                                                        if (last.nodeName.toUpperCase() == "#TEXT") {
                                                            var length = last.nodeValue.length;
                                                            setCursor(range, last, length);
                                                        } else if (last.nodeName.toUpperCase() == "BR") {
                                                            //UE.dom.domUtils.remove( last, false );
                                                            deleteNode($(last), false)
                                                            domUtils.preventDefault(evt);
                                                        }
                                                    }
                                                }
                                                //第二种情况
                                            } else if ($prev.find("img").length) {
                                                deleteNode($prev, evt);
                                            }
                                        }*/

                    /* if (nodeName == "#TEXT") {
                         var parentNode = startContainer.parentNode;
                         var prev = parentNode.previousSibling;
                         var $prev = $(prev);
                         console.log($prev.find("img").length)
                         if ($prev.find("img").length) {
                             deleteNode($prev, evt);
                         }
                     }*/
                }
            }
            // 往后删除键 恶心的玩意 害死人啊。。。
        var deleteKey = function() {

            /*  留着备用
            if($EDITOR.GlobalVal.isMaskShow){
                var $mask = $(me.document).find('.show');
                console.log($mask,32)
                var $parents = $mask.parents('.card-box');
                $parents.remove();
                $EDITOR.GlobalVal.isMaskShow = false;
                domUtils.preventDefault(evt);
            }*/
            if (startOffset != 0) return false;

            if (nodeName == "#TEXT") {
                var parentNode = startContainer.parentNode;

                var prev = parentNode.previousSibling;
                var $prev = $(prev);
                // console.log($prev.find("img").length)
                console.log($prev && $prev.attr('data-node'))
                if ($prev && $prev.attr('data-node') == 'gmp-ebox') {
                    if ($prev.find('.cover').hasClass('show')) {
                        deleteNode($prev, evt);
                    }

                }

            } else {
                var prev = startContainer.previousSibling;
                var $prev = $(prev);
                if ($prev && $prev.attr('data-node') == 'gmp-ebox') {
                    if ($prev.find('.cover').hasClass('show')) {
                        deleteNode($prev, evt);
                    }
                }
            }
            /* switch (nodeName) {
                 //在<p><img>|</p>
                 case "P":
                     if ($(startContainer).find("img").length && startOffset != 0) {
                         if (startContainer.nextSibling) {
                             setCursor(range, startContainer.nextSibling)
                         }
                     }
                     break;
                     //<p><img>光标|</p> 或者<p>xxxx<p>
                 case "#TEXT":
                     var parent = startContainer.parentNode;
                     var $parent = $(parent);
                     if ($parent.find("img").length) {
                         deleteNode($parent, evt)
                     } else if (parent.lastChild == startContainer) {
                         if (startOffset == startContainer.nodeValue.length) {
                             var $nextNode = $(parent).next();
                             if ($nextNode.find("img").length) {
                                 deleteNode($nextNode, evt)
                             }
                         }
                     }
                     break;
             }*/
        }

        var defaultKey = function() {
            if (closedNode && closedNode.tagName == "IMG") {
                if (gecko) {
                    //禁止火狐选中图片 用键盘字符替换造成标签溢出
                    domUtils.preventDefault(evt);
                } else {
                    domUtils.remove(closedNode.parentNode, false);
                }
            } else if (nodeName == "P") {
                if ($(startContainer).find("img").length != 0) {
                    creatNewP(range, startContainer);
                }
            } else if ($(startContainer).parent().find("img").length != 0) {
                var prentsNode = startContainer.parentNode;
                creatNewP(range, prentsNode);
            }
        }

        if (evt.ctrlKey || keyCode == 37 || keyCode == 38 || keyCode == 39 || keyCode == 40) {

        } else {
            detectKey();
        }

        window.imageTransformPopup.hide();
    })

});

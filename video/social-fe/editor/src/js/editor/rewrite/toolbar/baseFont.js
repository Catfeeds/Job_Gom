var domUtils = UE.dom.domUtils;
var utils = UE.utils;
//var domUtils = baidu.editor.dom.domUtils

var getContent = require('editor/utils/getContent');

UE.plugins['basestyle'] = function() {

    var basestyles = {
            'bold': ['strong', 'b'],
            'italic': ['em', 'i'],
            'subscript': ['sub'],
            'superscript': ['sup'],
            'underline': ['u']
        },
        getObj = function(editor, tagNames) {
            return domUtils.filterNodeList(editor.selection.getStartElementPath(), tagNames);
        },
        me = this;
    //添加快捷键
    me.addshortcutkey({
        "Bold": "ctrl+66", //^B
        "Italic": "ctrl+73", //^I
        "Underline": "ctrl+85" //^U
    });
    me.addInputRule(function(root) {
        utils.each(root.getNodesByTagName('b i'), function(node) {
            switch (node.tagName) {
                case 'b':
                    node.tagName = 'strong';
                    break;
                case 'i':
                    node.tagName = 'em';
            }
        });
    });
    for (var style in basestyles) {
        (function(cmd, tagNames) {
            me.commands[cmd] = {
                execCommand: function(cmdName) {
                    var range = me.selection.getRange(),
                        obj = getObj(this, tagNames);

                    /* range.select();

                     var fragment = range.cloneContents(),
                         node = document.createElement("div");

                     node.appendChild(fragment);
                     */

                    if (getContent(range).indexOf('gmp-ebox') != -1) {
                        return false;
                    }
                    if (range.collapsed) {

                        if (obj) {
                            var tmpText = me.document.createTextNode('');
                            range.insertNode(tmpText).removeInlineStyle(tagNames);
                            range.setStartBefore(tmpText);
                            domUtils.remove(tmpText);
                        } else {
                            var tmpNode = range.document.createElement(tagNames[0]);
                            if (cmdName == 'superscript' || cmdName == 'subscript') {
                                tmpText = me.document.createTextNode('');
                                range.insertNode(tmpText)
                                    .removeInlineStyle(['sub', 'sup'])
                                    .setStartBefore(tmpText)
                                    .collapse(true);
                            }
                            range.insertNode(tmpNode).setStart(tmpNode, 0);
                        }
                        range.collapse(true);
                    } else {
                        if (cmdName == 'superscript' || cmdName == 'subscript') {
                            if (!obj || obj.tagName.toLowerCase() != cmdName) {
                                range.removeInlineStyle(['sub', 'sup']);
                            }
                        }
                        obj ? range.removeInlineStyle(tagNames) : range.applyInlineStyle(tagNames[0]);
                    }
                    range.select();
                },
                queryCommandState: function() {
                    return getObj(this, tagNames) ? 1 : 0;
                }
            };
        })(style, basestyles[style]);
    }
};

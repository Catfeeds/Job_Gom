
var domUtils = UE.dom.domUtils;
var utils = UE.utils;

var pop = require('./pop');
var getContent = require('editor/utils/getContent');

function showText(editor,el){
    var range = editor.selection.getRange(),
        //是否存在选区collapsed   startContainer === endContainer && startOffset === endOffset 
        link = range.collapsed ? editor.queryCommandValue( "link" ) : editor.selection.getStart(),
        url,
        rangeLink = domUtils.findParentByTagName(range.getCommonAncestor(),'a',true),
        orgText;
    link = domUtils.findParentByTagName( link, "a", true );

    if (getContent(range).indexOf('gmp-ebox') != -1) {
        return false;
    }

    editor.hoverEl = el;

    //是否有href
    if(link){
        url = utils.html(link.getAttribute( '_href' ) || link.getAttribute( 'href', 2 ));
         pop(editor,url,1);
    }else{
        url='';
        pop(editor,url,0);
    }
   
}

module.exports = showText;

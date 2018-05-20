var fetch = require('io/fetch');
var url = require('io/url');
var domUtils = UE.dom.domUtils;
var utils = UE.utils;

var imgReplace = require('utils/imgReplace');

var $linkValue = $('[data-node=linkValue]');


function dealLink(editor,value,num){
    

    var range = editor.selection.getRange();
    var collapsed =  range.collapsed;
    var reg = /^http/i;

    //单独滑过图片要处理的js
    if(editor.hoverEl){
        range.selectNode(editor.hoverEl);
        editor.hoverEl = null;
        collapsed = false;
    }

    if( !reg.test(value) ){
        value = 'https://' + value;
    }
    if(num == 1){    //有href

        editor.execCommand('link', {href:value,target:'_blank'});

    }else{//无href

         if(!collapsed){
            editor.execCommand('link', {href:value,target:'_blank'});
         }else{
            editor.execCommand('inserthtml', '<a href="'+value+'" target="_blank">'+value+'</a>');
         }
               
    }
    
}
    

module.exports = dealLink

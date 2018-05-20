/**
 * @description 
 * 处理firefox不能正常选中图片的bug
 * 
 * @author 林飞
 */

 var browser = baidu.editor.browser;
 var gecko = browser.gecko ? browser.version:0;
 var ieversion = browser.ie ? browser.version : 0;

var setCursor = function (range,newNode){
    range.setStart(newNode);
    range.setEnd(newNode,0);
    range.setCursor(true);
}



if(gecko) {

    UE.plugin.register('selectImg', function (){
        var me = this;
        me.addListener('click',function(type,html){
            var range = me.selection.getRange(),
            startContainer = range.startContainer,
            nodeName = startContainer.nodeName;

            if(nodeName == "P" && startContainer.innerHTML.indexOf('<img') != -1){
                range.selectNode(startContainer).select();
            }
        })
    })
}





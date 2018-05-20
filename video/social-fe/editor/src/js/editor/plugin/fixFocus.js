/**
 * 处理火狐获取焦点标签溢出的问题
 * 
 * @林飞
 */
UE.plugin.register('fixFocus', function (){
    var me = this;     
    var browser = baidu.editor.browser;
    if(!browser.gecko){
        return false;
    }
    /*me.addListener('ready',function(){
       var firstChild = me.body.firstChild;
       console.log(firstChild)
        if(firstChild.nodeName == "#text"){
                me.body.removeChild(firstChild);
                newNode = me.body.firstElementChild;

                
            } */ 

        me.addListener('keydown',function(){
            var firstChild = me.body.firstChild;
            
            if(firstChild.nodeName == "#text"){  
                
                var newNode = me.body.firstElementChild;
                //var $newNode = $(me.body.firstElementChild);
                //$newNode.find("br").remove();
                //$(firstChild).appendTo($newNode);

                var range = me.selection.getRange(),
                        startContainer = range.startContainer,
                        nodeName = startContainer.nodeName,
                        parentNodeName = startContainer.parentNode.nodeName;
                
                range.setStart(newNode);               
                range.setEnd(newNode, 0);
                range.setCursor(true);
                $(firstChild).remove();
                
            } 
            

             


        })
    
    //var range = me.selection.range
    
    /*this.document.body.focus();
    $(me.document).on('focus',function(){
        console.log("in focus")
    })*/
    
      
});

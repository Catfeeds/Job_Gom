//var grepHtml = require('editor/rewrite/grepRule');
/**
 * @description 
 * 过滤拖拽进来的文本
 * 
 * @author linfei
 */


UE.plugin.register('grepDrop', function (){
    var me = this;
    var body = me.body;
    var domUtils = UE.dom.domUtils;
    var target = 0; //判断是否是当前页面做拖拽
    var browser = baidu.editor.browser;
    var ieVersion = browser.ie ? browser.version : 0;
    var dropStr = "";   //专门用于ie 【drop】inserthtml 使用到
    var tempRange = "";  //存放拽入的选区 
    var dropToP = 0;//是否拖拽进入P标签

    var grepRule = {

            grepFormat : /[\n]/gi,

            grepCursor : /[\u200b]/gi,  //光标

            grepImg : /(<img.*?>)/gi, 

            grepDiv : /<div class=["']card-box.*?i<\/div><\/div>/gi
    }

    //过滤html
    var grepHtml = function(obj,isIe){
        return  obj
                    .replace(grepRule.grepFormat,'')
                    .replace(grepRule.grepDiv,'')
                    .replace(grepRule.grepCursor,'')
                    .replace(grepRule.grepImg,function(i,j,k,l){

                            if(isIe){
                                return '<p>'+i+'</p>';
                            }else{
                                return  '<p>'+ i.replace('>','class="block">') + '</p>';
                            }                           
                        }) 
    }

    //创建新行
    var creatNewP = function(parent,node,position){
        var node = node;
        var text = node.nodeValue;
        var doc = me.document;

        var newNode = doc.createElement('p');
        var textNode = doc.createTextNode(text);
        newNode.appendChild(textNode);
        UE.dom.domUtils.remove( node, false );

        //插入当前节点前还是后
        if(position == 'before'){
            me.body.insertBefore(newNode,parent);
        }else{
            domUtils.insertAfter(parent,newNode);
        }
    }
    //渲染P标签
    var renderP = function(node){     
        var childNodes = node.childNodes;
        var len = childNodes.length;
        
        var textOffset = -1;
        var imgOffset = 0 ;
        
        for(var j = 0;j<len ;j++){
            var _node = childNodes[j];
            if(_node.nodeName.toUpperCase() == "#TEXT"){
                var value = _node.nodeValue
                                .replace(grepRule.grepCursor,'')
                                .replace(" ",'');
                if(value){                                                
                    textOffset = j;
                }                                            
            }
            if(_node.nodeName.toUpperCase() == "IMG"){
                imgOffset = j;
            }
        }
        
        //判断文本节点的位置
        if(textOffset != -1){
            var oldTextNode = childNodes[textOffset];
            var position = textOffset < imgOffset ? 'before' :'after';
            
            creatNewP( node, oldTextNode, position );           
        }
        
    }

    var renderBody = function(){

        if(dropToP == 1){
            dropToP = 0;
            return;
        }

        var $body = $(me.body);
        $body.find("img").removeAttr("class");
        // 不能在P标签上加任何属性，会被过滤掉
        var $imgs = $body.find("[data-type='insertImg']");
        var len = $imgs.length;
        if( len ) {
            for(var i = 0;i<len;i++){
                var img = $imgs[i];
                var imgPrent = img.parentNode;
                renderP(imgPrent);  
            }
        }
        dropToP = 0;
    }

    return {
       bindEvents:{
            'ready': function (){

                var _body = me.body;
                
                //禁止商品拖拽
                $(_body).delegate("div",'dragstart',function(e){
                    target = 0;
                    domUtils.preventDefault(e);
                })

                $(_body).delegate("p",'drop',function(e){
                    
                    var $this = $(this);
                    var _this = this;
                    setTimeout(function(){
                        $(_body).find("img").removeAttr("class");
                        if($this.find("img").length!=0){
                            renderP(_this);   
                        }
                    },100);
                    dropToP = 1;
                })

                domUtils.on(document, 'dragstart', function(evt){
                    target = 0;
                })

                domUtils.on(_body, 'dragstart', function(evt){                   
                    target = 1;

                    //ie是插入内容，其他浏览器是修改drag的内容
                    if( ieVersion > 7){
                        var range = me.selection.getRange();
                        var fragment = range.cloneContents();
                        var _node = document.createElement("div");

                        tempRange = range;

                        _node.appendChild(fragment)
                        dropStr =  _node.innerHTML;
                        dropStr = grepHtml(dropStr); 
                    }else{
                        var dataTransfer = evt.dataTransfer;
                        var data = dataTransfer.getData("text/html");
                        data = grepHtml(data,false);
                        dataTransfer.setData("text/html",data);                        
                    }           
                })


                domUtils.on(_body, 'drop', function(evt){
                    var range = me.selection.getRange();
                    if(!target){
                        domUtils.preventDefault(evt);
                    }

                    if(ieVersion > 7){
                        //要清空选区  并且 阻止默认触发事件，
                        //否则会变成复制内容，两者缺一不可，很奇葩。。
                        if(tempRange){
                            tempRange.deleteContents();
                        }
                        me.execCommand("insertHtml",dropStr);                    
                        domUtils.preventDefault(evt);

                    }

                    setTimeout(function(){
                        renderBody();
                    },200);

                    tempRange = "";
                    target = 0;
                    dropStr = ""; 
                })
            } 
        }  
    }
})

            
        /*,备用

        commands:{
            'haha': {
                execCommand: function (cmd, str) {
                    //var range = me.selection.getRange();
                    //range.select();
                    //me.focus();
                    me.execCommand("insertHtml",str,true);                   
                    //me.execCommand('anchor', 'anchor1')
                }
            }
            
        }*/
    



/**
 * 处理商品遮罩
 * 
 * @林飞
 */

UE.plugin.register('goodsdMask', function (){
    var me = this;     
   
    var hideMask = function() {
        //var b = ue.body.getElementsByTagName('b');
        $(me.body).find(".cover").removeClass("show");
        $EDITOR.GlobalVal.isMaskShow = false;;

    }
    //设置光标
    var setCursor = function(node){
        node = node.get(0);
        var nextNode = node.nextSibling;
        var range = me.selection.getRange();
        if (!nextNode) {
            var newNode = me.document.createElement('p');
            var textNode = me.document.createTextNode('');
            newNode.appendChild(textNode);
            domUtils.insertAfter(node, newNode);
        }
        range.setStart(nextNode, 0).collapse(true).setCursor();

    }

    me.addListener('ready',function(){
        $(me.body).on('click',function(e){
            var target = e.target;
            var $target = $(target);
            var $paretns;
            tagName = target.tagName;
            hideMask(me);
            switch(target){
                case "DIV":
                    if($target.hasClass('card-box')){
                        $target.find('.cover').addClass('show');
                        setCursor($target);
                        return false;
                    }
                    
                default:
                    $paretns = $target.parents('.card-box')
                    if($paretns.length){
                        $paretns.find('.cover').addClass('show');
                        setCursor($paretns);
                        return false;
                    }
                    break;
            }
            
            return false;

        })

        $(me.body).on('keydown',function(){
            hideMask();
            return false;
        })


    })
    
      
});
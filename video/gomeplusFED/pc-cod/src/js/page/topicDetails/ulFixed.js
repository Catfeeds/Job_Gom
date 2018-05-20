
var ulFixed ={
	init:
	function() {
       /*
        var $ulObj = $("ul.source-lef-list");
        var $ulParent = $ulObj.parent();
        var ulOffsetTop = $ulObj.offset().top;
        var ulHeight = $ulObj.height();
        
        var windowH = $(window).height();

        $(window).scroll(function(){
           var parentHeight = $(".topic-conter").height();

            if(parentHeight > windowH){
              //console.log(parentHeight);
           
            var leftS =parseInt($(".wrap-box.ovflow-hid").css("margin-left"));
           
            var scrollTop = $("body").scrollTop();
             console.log(scrollTop);
             //console.log(ulOffsetTop);
            if(scrollTop >= ulOffsetTop & scrollTop < parentHeight-60){
                 console.log(leftS);
                $ulObj.css({
                    "position": "fixed",
                    "left": leftS + 20+"px"
                }).addClass("top_ly").removeClass("bottom_ly");
            }else if(scrollTop >= parentHeight-60){
                $ulObj.css({
                    "position":"absolute",
                    "left":"0px"
                }).addClass("bottom_ly").removeClass("top_ly");
            }else {
                $ulObj.css({
                    "position":"absolute",
                    "left":"0px"
                }).addClass("top_ly").removeClass("bottom_ly");
            }
                }
        });
*/
     
    var $ulObj = $("ul.source-lef-list");
    var $ulParent = $ulObj.parent();
    var ulHeight = $ulObj.height();
    	//$ulParent.css("height","1800px");

    var doup = 0;
    $(window).scroll(function(){
    	var parentHeight = $ulParent.height()+100;
    
        var parentTop = $ulParent.position().top +220;
        var scrollHeight = $(this).scrollTop();
        if(ulHeight < parentHeight & scrollHeight > parentTop){
            
            var leftS = $(".wrap-box.ovflow-hid").css("margin-left");
            leftS = parseInt(leftS.substring(0,leftS.length-2)) +20;
            var s = scrollHeight -parentTop; //父级div距离页面顶部隐藏的距离
            var a = parentHeight - ulHeight-100; //ul 和父级div之间的高度差
            var o = scrollHeight > parentTop + a ? false : true;  
            if(o){
                $ulObj.css({
                    "position": "fixed",
                    "top" : "6px",
                    "left": leftS+"px"
                });
            }
            var scrollSize = scrollHeight-doup;
            doup = scrollHeight;
            if(scrollSize > 0 & scrollHeight > parentTop + a){
                //console.log(45);
                $ulObj.css({
                    "position":"absolute",
                     "top" : a+"px",
                     "left":"0px"
                });
            }
            if(scrollSize < 0 & scrollHeight < parentTop ){
                $ulObj.css({
                    "position":"absolute",
                    "top" : "6px",
                    "left":"0px"
                });
            }
            
        }else{
            $ulObj.css({
                    "position":"absolute",
                    "top" : "6px",
                    "left":"0px"
                });
        }
       
        doup = scrollHeight;
    });

    }
}
module.exports = ulFixed;
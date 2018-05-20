//固定话题详情页右侧 热门话题

var init = function(){

var lastScroll = 0;
		$(window).scroll(function(){	
			var $topic_lfet = $(".topic-lfet");
			var $topic_right = $(".topic-right");
			
			var leftHeight = parseInt($topic_lfet.height()); //左侧高度
			var rightHeight = parseInt($topic_right.height());//右侧高度
			var windowHeight =parseInt($(window).height()); //窗口的高度
			var size = rightHeight - windowHeight; //右侧和窗口高度差
			var floatRight = $("body").width() - $(".wrap-box").width();
				floatRight = parseInt(floatRight) /2;
			var bodyHeight = parseInt($("body").height()); 
			var top =  parseInt($(this).scrollTop()); 
			var headerH = parseInt($("[data-node=header]").height()) + parseInt($(".wrap-box").height());
			var footerH = parseInt($(".footer").height());


			var topFixedBoolean= fixedToTopB(windowHeight , rightHeight);  

		    if(topFixedBoolean){ 
		    	//吸顶

		    	if(top -headerH > 0 &&  top < bodyHeight-footerH-310){

		    		$topic_right.css({
							"position" : "fixed",
							"right" : floatRight +"px"
						}).addClass("top_ly").removeClass("bottom_ly");
		    	}else if(top > bodyHeight-footerH-310){
		    		console.log(12);
		    		$topic_right.css({
							"position" : "absolute",
							"right" : 0 +"px"
						}).addClass("bottom_ly").removeClass("top_ly");
		    	}else{
		    		console.log(34);
		    		$topic_right.css({
							"position" : "absolute",
							"right" : 0 +"px"
						}).addClass("top_ly").removeClass("bottom_ly");
		    	}

		 		
			}else{ 
		 	  //吸底

		 	if(leftHeight +100 > rightHeight){   //初始化判断
					if(lastScroll - top <0){ 
						//下滑
						if(top - headerH >= size ){ //判断滚轮滑动的距离 比右侧栏高度高
							if(top < bodyHeight - footerH - windowHeight){
								$topic_right.css({
									"position" : "fixed",
									"right" : floatRight +"px"
								}).addClass("bottom_ly").removeClass("top_ly");
							}else{
								$topic_right.css({
									"position" : "absolute",
									"right" : "0px"
								}).addClass("bottom_ly").removeClass("top_ly");
							}
						}
					}else{
						//上滑
							if(top + windowHeight - headerH > rightHeight & top + 50< bodyHeight - footerH - windowHeight){
								//console.log(21);
								$topic_right.css({
									"position" : "fixed",
									"right" : floatRight +"px"
								}).addClass("bottom_ly").removeClass("top_ly");
							}else if(top+ windowHeight - headerH <= rightHeight ){
								$topic_right.css({
									"position" : "absolute",
									"right" : "0px",
								}).removeClass("bottom_ly").addClass("top_ly");	
							}
							
					}
					lastScroll = top;
				}
		   }
		
});
	

}

//判断吸顶还是吸底
function  fixedToTopB(winHeight, $objHeight){
	if($objHeight > winHeight){
		return false;
	}else{
		return true;
	}
}


function  topFixed(){

}

module.exports = {
    init: init
};
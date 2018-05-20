// navigator
// ---------------------------------------------
$(function(){
	var buttons = $('.nav-button');
	var master = $('.master');
	var classify = $('.classify');
	var liHeight = $(".nav li").height();
	var liLength = $(".nav li").size();
	var nav = $('.nav');
	// click button function
	$(buttons).click(function(){
		if($(this).hasClass("show")){
			show();
		}else{
			hide();
		};
	});
	// click nav li element
	$('.nav li').each(function(index){
		$(this).click(function(){
			$(this).addClass('active').siblings().removeClass();
			$('.module').eq(index).css({'display':'block'}).siblings('.module').css({'display':'none'});
		});
	});
	$(master).click(function(){
		hide();
	});
	// show function
	function show(){
		$(buttons).removeClass('show');
		$(buttons).addClass('hide');
		$(nav).animate({"height":liHeight * liLength},400);
		$(master).css({'display':'block'}).animate({'opacity':0.4});
	}
	// hide function
	function hide(){
		$(buttons).removeClass('hide');
		$(buttons).addClass('show');
		$(nav).animate({"height":0},400);
		$(master).css({'display':'none'}).animate({'opacity':0});
	}
	// browers max width
	var documentElement = $(document).width();
	var maxWidth = 768;
	if(documentElement <= maxWidth){
		$('.nav li').each(function(index){
			$(this).click(function(){
				var currentPath = $(this).children('a').html();
				$(classify).html('- ' + currentPath);
				hide();
			});
		});
	}
	// back top
	
});
$(function(){
	
});
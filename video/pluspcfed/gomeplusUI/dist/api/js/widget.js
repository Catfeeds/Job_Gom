// name:select widget
// autor:majindou
$(function(){
	$.fn.animates = function(options){
		// default value
		var defaults = {
			"time":2500
		}
		// merge options
		var options = $.extend(defaults,options);
		// code show
		this.each(function(){
			var This = $(this);
			var animateType = $(this).find(".animate-type")[0];
			var animateSelect = $(this).find(".animate-select")[0];
			var animateList = $(this).find(".animate-list")[0];
			var liElements = $(animateList).children('li');
			var animateBtn = $(this).find(".animate-btn")[0];
			var currentStyle;
			$(animateSelect).click(function(){
				$(animateList).css({"display":"block"});
				$(liElements).each(function(index){
					$(this).click(function(){
						$(animateType).removeClass(currentStyle);
						currentStyle = $(this).html();
						$(animateType).html(currentStyle);
						$(animateSelect).html(currentStyle);
						$(animateType).addClass(currentStyle);
						$(animateList).css({"display":"none"});
					});
				});
			});
		});
	}
});
// include
// bounce-in
$(function(){
	$("#bounce-in").animates({
		// "time":2500	
	});
});
// bounce-out
$(function(){
	$("#bounce-out").animates({
		// "time":2500	
	});
});
// fade-in
$(function(){
	$("#fade-in").animates({
		// "time":2500	
	});
});
// fade-out
$(function(){
	$("#fade-out").animates({
		"time":2500	
	});
});
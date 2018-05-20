
var init = function(data){
	var _data = data;
	var _data = {
        url: data[0].url,
        icon: data[0].icon,
        image: data[0].image
    }
	if (typeof _data === 'string') {
        return false;
    }
	var activityBottom = $('<div class="activity-bottom" data-node="activity-bottom"><div class="activity-bg"></div><div class="middle"><div class="picture"><a href="javascript:;" target="_blank"><img src=""></a></div><div class="activity-close"><a href="javascript:;"></a></div></div></div>');
	var activityLeft = $('<div class="activity-left" data-node="activity-left"><a href="javascript:;"><img src=""></a></div>');
	$('body').append(activityBottom,activityLeft);
	$(".picture>a").attr("href",_data.url);
	$(".picture img").attr("src",_data.image);
	$(".activity-left img").attr("src",_data.icon);
	$('.activity-close').on('click',function(){
		$('.activity-bottom').animate({left:"-100%"},1000,function(){
			$(this).hide();
			activityLeft.show().animate({left:"0"},500);
		});
	});
	$('.activity-left').on('click',function(){
		$(this).animate({left:'-100%'},500,function(){
			$(this).hide();
			$('.activity-bottom').show().animate({left:"0"},1000);
		});
	});
};

module.exports = {
    init: init
};
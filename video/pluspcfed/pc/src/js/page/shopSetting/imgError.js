//图片预加载
module.exports = {
	init: function(){
		$('.J-shopSetting-list img').on('load', function(){
			$(this).attr('src').indexOf('opacity4') === -1 && $(this).css('background', 'none');
		}).on('error', function(){
			$(this).attr('src', $_CONFIG.imgpath + '/images/public/opacity4.png');
		});
	}
}
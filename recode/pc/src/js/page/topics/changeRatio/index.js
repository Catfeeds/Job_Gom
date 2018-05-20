var init = {
	ratio() {
		$(document).ready(function(){
			$(window).resize();
		});
		$(window).resize(function() {
			if($(window).width() > 1000) {
				$(".wrap-box").removeClass("wrap-box-S");
			} else {
				$(".wrap-box").addClass("wrap-box-S");
			}
		});
	}
}

module.exports = {
	init : init.ratio
}

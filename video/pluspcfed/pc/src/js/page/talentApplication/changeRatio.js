var init = {
	ratio() {
		$(document).ready(function(){
			$(window).resize();
		});
		$(window).resize(function() {
			if($(window).width() > 1360) {
				$('body').removeClass("wrap-box-S");
			} else {
				$('body').addClass("wrap-box-S");
			}
		});
	}
}

module.exports = {
	init : init.ratio
}

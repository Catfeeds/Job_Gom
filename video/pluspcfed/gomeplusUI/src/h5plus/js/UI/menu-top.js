$(window).scroll(function() {
	if ($(this).scrollTop() > 100) {
		$(".flag-list-menu").addClass("fixed");
	} else {
		$(".flag-list-menu").removeClass("fixed");
	}
});
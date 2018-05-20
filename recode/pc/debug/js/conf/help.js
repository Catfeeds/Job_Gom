webpackJsonp([8],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";
	
	$(function () {
	
		$(".left-menu li>a").click(function () {
			$(".left-menu li").removeClass("active");
			$(this).parent().addClass("active");
			$(this).next().slideToggle();
		});
	
		$('[data-action]').click(function () {
			$('[data-action]').removeClass('active');
			$(this).addClass('active');
			$('[data-info]').hide();
			var dataName = $(this).attr('data-action');
			var selecter = "[data-info=" + "\'" + dataName + "\'" + "]";
			$(selecter).show();
			if ($(this).attr('data-action') == "contactus") {
				$('.menu li').removeClass('active');
				$('.menu li dl').hide();
			}
		});
		menuOpen(0, 0);
	});
	
	function menuOpen(menuLi, menuA) {
		$(".left-menu li").removeClass("active");
		$(".left-menu dd a").removeClass("active");
		$(".left-menu li").eq(menuLi).addClass("active");
		$(".left-menu li:eq(" + menuLi + ") dd a").eq(menuA).addClass("active");
		$(".left-menu li:eq(" + menuLi + ") dl").show();
		var dataName = $(".left-menu li:eq(" + menuLi + ") dd a").eq(menuA).attr("data-action");
		var selecter = "[data-info=" + "\'" + dataName + "\'" + "]";
		$(selecter).show();
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ })
]);
//# sourceMappingURL=help.js.map
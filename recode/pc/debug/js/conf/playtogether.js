webpackJsonp([14],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';
	
	var $title = $('[data-node=title]');
	var $titleA = $('[data-node=title] a');
	var $contentImg = $('[data-node=content] img');
	
	$title.on('click', 'a', function (e) {
	    var target = e.currentTarget;
	    $titleA.removeClass('active');
	    $(target).addClass('active');
	    for (var i = 0; i < $contentImg.length; i++) {
	        $contentImg[i].src = $_CONFIG.imgpath + '/images/other/' + target.innerHTML.split('-')[2].trim() + '-0' + (i + 1) + '.png';
	    }
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(3)))

/***/ })
]);
//# sourceMappingURL=playtogether.js.map
/**
 * [头部滚动定位]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
function HeaderFixed(){
	let $header = $('[data-node=header]');
	$(window).on('scroll', function(){
		let scrollTop = $(window).scrollTop();
		if (scrollTop > ($('[data-node=indexBanner]').height() - 100)) {
			$header.addClass('head-fixed');
		}else{
			$header.removeClass('head-fixed');
		}
	});
}

export default HeaderFixed;
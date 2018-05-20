/**
 * 订单评价提交
 * @author zhaodonghong
 */

//tips
var hint = require('module/hint');
var fetch = require('io/fetch');
var url = require('io/url');

var $submit = $('[data-action="discussSubmit"]'); // submit btn
var $disTable = $('[data-node="orderDisTable"]'); //table
var $disList = $disTable.find('[data-node="orderDiscuss"]'); //list
var $serviceGrade = $disTable.find('[data-node="serviceGrade"]');
var $expressService = $disTable.find('[data-node="expressService"]');

//判断是否正在上传中
var isUping = function() {

	return $('[data-node="progress"]').length > 0;

};

var getData = function() {
	var discussList = {
		goods_info: [],
		shop_info: {}
	};
	var $list;
	var $imgList;
	var iLen;

	discussList.shop_info.serviceGrade = ~~$serviceGrade.text();
	discussList.shop_info.expressService = ~~$expressService.text();
	for (var i = 0, len = $disList.length; i < len; i++) {
		$list = $disList.eq(i);
		$imgList = $list.find('[data-node="uploadList"] img');
		discussList.goods_info.push({
			productId: ~~$list.attr('data-productid'),
			commentScore: ~~$list.find('[data-node="proScore"]').text(),
			commentContent: $list.find('[data-node="commentContent"]').val(),
			imageUrlArray: []
		});
		iLen = $imgList.length;
		if (iLen > 0) {
			for (var j = 0; j < iLen; j++) {
				discussList.goods_info[i].imageUrlArray.push($imgList.eq(j).attr('src'));
				if (i === len - 1 && j === iLen - 1) {
					return discussList;
				}
			}

		} else {

			if (i === $disList.length - 1) {
				return discussList;
			}

		}
	}

};

var init = function() {

	$submit.on('click', function() {

		if (isUping()) {

			hint.init('图片上传中...');

		} else {

			var data = getData();
			console.log(data)
			fetch.post(url.get('discussOrder'), {
				data: data
			}).done(function(result) {
				if (result && result.success) {
					window.location.href = $_CONFIG.i_domain + 'order/showFinishInfo';
				} else if (~~result.code === 881011) {
					window.location.href = $_CONFIG.passport_domain + 'login/index?redirect=' + $_CONFIG.current_url;
				} else {
					hint.init(result.message);
				}
			}).fail(function() {
				hint.init('评论失败，请重新提交');
			});
		}

	});

}



module.exports = {
	init: init
}
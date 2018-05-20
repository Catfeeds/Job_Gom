var fetch = require('io/fetch');
var url = require('io/url');
// var redList = require('../../widget/goodInfo/redList');
var Dialog = require('dialog');
var ticketDialog = require('./ticketDialog.tpl');
var tickets = require('./ticketList.tpl');
var myTickets = require('./myTicketList.tpl');
var dateFormat = require('utils/fecha');
// var couponSort = require('module/couponSort');
var checkLoginStatus = require('module/checkLoginStatus');


var $goodInfoBox = $('div[data-node="topGoodInfo"]');
var $coupon = $goodInfoBox.find('[data-active="coupon"]');


var $ticketLoading; //优惠券loading
var $ticketFail; //获取失败fail
var $ticketList; //优惠券列表
var $myTicketList;
var ticketList = [];
var myTicket = [];
var couponAlert;
var $myTicketBox;


var getTicketByAjax = function() {

	fetch.post(url.get('ticketList'), {
		validate: true,
		data: {
			shopId: $_CONFIG.shopId,
			isLogin: $_CONFIG.islogin
		}
	}).done(function(result) {
		if (result && result.success && result.code === 200) {
			var couponServerDate = +new Date();
			$ticketFail.hide();
			ticketList = result.data.shopCoupons.batches;
			myTicket = result.data.myCoupons.userCoupons !== undefined ? result.data.myCoupons.userCoupons : [];
			
			/*if( ticketList.length > 0 && ticketList[0].quantities.length === 0 ){
				$ticketLoading.hide();
				$ticketFail.show().text('登录失效，请重新登录').addClass('login');
				$('[data-node="ticketBox"]').hide();
				return;
			}*/
			//myTicket = couponSort(myTicket);
			//ticketList = couponSort(ticketList);
			for (var i = 0, len = ticketList.length; i < len; i++) {
				
				ticketList[i].money = parseInt(ticketList[i].money, 10) / 100;
				ticketList[i].usageRule.minAmount = parseInt(ticketList[i].usageRule.minAmount, 10) / 100;
				ticketList[i].showDay = false;
				if( ticketList[i].timeType === 1 ){
					ticketList[i].timeLong = Math.ceil(ticketList[i].timeLimit / 86400);
					ticketList[i].showDay = true;
					//ticketList[i].useStartTime = dateFormat.format(new Date(couponServerDate), 'YYYY.MM.DD');
					//ticketList[i].useEndTime = dateFormat.format(new Date(couponServerDate + ticketList[i].timeLimit*1000 ), 'YYYY.MM.DD');
				}else{
					ticketList[i].useStartTime = dateFormat.format(new Date(ticketList[i].useStartTime), 'YYYY.MM.DD');
					ticketList[i].useEndTime = dateFormat.format(new Date(ticketList[i].useEndTime), 'YYYY.MM.DD');
				}
				ticketList[i].quantities[0].show = ticketList[i].quantities[0].remainingReceiveQuantity > 1 ? 'inline':'none';
				
			}
			for (var i = 0, len = myTicket.length; i < len; i++) {
				myTicket[i].validStartTime = dateFormat.format(new Date(myTicket[i].validStartTime), 'YYYY.MM.DD');
				myTicket[i].validEndTime = dateFormat.format(new Date(myTicket[i].validEndTime), 'YYYY.MM.DD');
				myTicket[i].batch.money = parseInt(myTicket[i].batch.money, 10) / 100;
				myTicket[i].batch.usageRule.minAmount = parseInt(myTicket[i].batch.usageRule.minAmount , 10) / 100;
				myTicket[i].show = myTicket[i].couponsQuantity > 1 ? 'inline':'none';
			}
			$ticketList.html(tickets({
				shopName: $_CONFIG.shopName,
				ticketList: ticketList,
				myTickets: myTicket,
				tDisplay: ticketList.length > 0 ? 'block' : 'none',
				show: myTicket.length > 0,
				display: myTicket.length > 0 ? 'block' : 'none'
			}))
			
			$myTicketList = $('[data-node="myTicketList"]');
			$myTicketBox = $('[data-node="mTicketBox"]');

		} else if( result.code === 881011 ){
			$ticketLoading.hide();
			$ticketFail.show().text('登录失效，请重新登录').addClass('login');
			$('[data-node="ticketBox"]').hide();	
		} else {
			$ticketFail.show().text('数据加载失败，点击重新加载');
		}
	}).fail(function() {
		if (checkLoginStatus()) {
			$ticketFail.show().text('数据加载失败，点击重新加载');
		}
	}).always(function() {
		if (checkLoginStatus()) {
			$ticketLoading.hide();
		}
		couponAlert.reset();
	});
}



var events = function() {
	$(document).on('click', '[data-action="coupon-mask"]', function() {
		$(this).hide();
	}).on('click', '[data-node="ticketFail"]', function() {
		if( !$(this).hasClass('login') ){
			$ticketLoading.show();
			getTicketByAjax();
		}
	});

	getTicket();

}

var hintHide = function(obj) {

	setTimeout(function() {
		obj.find('[data-node="coupon-mask"]').hide();
	}, 2000);
}

//设置已领取优惠券
var setMyTicket = function(data){

	myTicket.push(data);
	$myTicketList.html(myTickets({
		shopName: $_CONFIG.shopName,
		myTickets: myTicket
	}));
	

}

var getTicket = function() {
	var ticketId;
	var _this;
	var $list;
	var _type;
	var mStartTime;
	var mEndTime;
	var tStartTime;
	var tEndTime;
	var $mNum;
	var mNum;
	var $tNum;
	var tNum;
	var $btn;
	var timer;
	var serverDate = +new Date();
	var index;
	var allowGet= true;
	$(document).on('click', '[data-action="getTicket"]', function() {
		if( allowGet ){
			allowGet = false;
			ticketId = $(this).attr('data-id');
			_this = $(this);
			$list = _this.parents('li').eq(0);
			tStartTime = ( $list.find('[data-node="tStart"]').text() === '' ? dateFormat.format(new Date(serverDate), 'YYYY.MM.DD') : $list.find('[data-node="tStart"]').text());
			tEndTime = ( $list.find('[data-node="tEnd"]').text() === '' ? dateFormat.format(new Date(serverDate + parseInt( _this.attr('data-second'), 10 )*1000), 'YYYY.MM.DD') : $list.find('[data-node="tEnd"]').text());
			fetch.post(url.get('getTicket'), {
				data: {
					batchSn: ticketId,
					userId: $_CONFIG.userId
				}
			}).done(function(data) {
				if( data&&data.code === 200){
					var $getedTicket = $('[data-node="'+ ticketId +'"]');
					var isOk = true;
					$myTicketBox.show();
					if( $getedTicket.length > 0 ){
						for( var i = 0, len = $getedTicket.length; i < len; i++){
							_type = _this.attr('data-type');
							if( _type === '1' ){
								mStartTime = dateFormat.format(new Date(serverDate), 'YYYY.MM.DD');
								mEndTime = dateFormat.format(new Date(serverDate + parseInt( _this.attr('data-second'), 10 ))*1000, 'YYYY.MM.DD');
							}else{
								mStartTime = $getedTicket.eq(i).find('[data-node="mStart"]').text();
								mEndTime = $getedTicket.eq(i).find('[data-node="mEnd"]').text();
							}
							
							if( mStartTime === tStartTime ){
								myTicket[i].couponsQuantity++;
								$mNum = $getedTicket.eq(i).find('[data-node="mTicketNum"]');

								mNum = parseInt($mNum.text(), 10);
								if( mNum === 1 ){
									myTicket[i].show = 'inline';
									$mNum.parent().show(); 
								}
								$mNum.text( mNum+1 );
								isOk = false;
								break;
							}
							//循环到最后一次也没有匹配到
							if( i === len - 1 && isOk){
								setMyTicket({
									batch: {
										money: $list.find('[data-node="ticketMoney"]').text(),
										usageRule: {
											minAmount: $list.find('[data-node="ticketMin"]').text()
										}
									},
									batchSn: ticketId,
									validEndTime: tEndTime,
									validStartTime: tStartTime,
									couponsQuantity: 1,
									show:'none'
								});
							}
						}
					}else{
						setMyTicket({
							batch: {
								money: $list.find('[data-node="ticketMoney"]').text(),
								usageRule: {
									minAmount: $list.find('[data-node="ticketMin"]').text()
								}
							},
							batchSn: ticketId,
							validEndTime: tEndTime,
							validStartTime: tStartTime,
							couponsQuantity: 1,
							show: 'none'
						});
					}
					$tNum = $list.find('[data-node="tTicketNum"]');
					$btn = $list.find('[data-action="getTicket"]');
					tNum = parseInt( $tNum.text(), 10);
					tNum === 2 && $tNum.parent().hide();
					$tNum.text( tNum - 1 );
					
					
					if( data.data.userRemainingAvailableQuantity === 0 ){
						$btn.html('<em class="iconn-20"></em>已领');
						$list.find('[data-node="coupon-mask"]').show().text('领取成功，领取次数已达上限');
						if($list.siblings().length === 0){
							timer = setTimeout(function(){
								$list.parents('[data-node="tTicketBox"]').eq(0).addClass('fadeOutUp').next().addClass('fadeUp');
								clearTimeout(timer);
								setTimeout(function(){
									$list.parents('[data-node="tTicketBox"]').eq(0).next().removeClass('fadeUp').prev().remove();
								},1000);
							}, 500);
						}else{
							timer = setTimeout(function(){
								$list.remove();
								clearTimeout(timer);
							}, 500);
						}
					}else{
						$list.find('[data-node="coupon-mask"]').show().text('领取成功，还可领取'+ data.data.userRemainingAvailableQuantity +'张');
					}
				}else{
					if( data.code === 881011 ){

						$list.find('[data-node="coupon-mask"]').show().text('登录失效，请重新登录');
					}else{

						$list.find('[data-node="coupon-mask"]').show().text('领取失败');
					}
				}
				couponAlert.reset();
				hintHide($list);
				allowGet = true;
			}).fail(function() {				
				$list.find('[data-node="coupon-mask"]').show().text('领取失败');
				hintHide($list);
				allowGet = true;
			});
		}
		
	});
}

var init = function() {

	$coupon.on('click', function() {
		couponPackage();
	});
	events();

}

function couponPackage() {
	if (checkLoginStatus()) {
		couponAlert = Dialog({
			title: '领取优惠券',
			modal: true,
			fixed: true,
			content: ticketDialog({
				imgUrl: $_CONFIG.imgpath
			}),
			className: 'pop-box'
		});
		couponAlert.show();
		$ticketLoading = $('[data-node="ticketLoading"]');
		$ticketFail = $('[data-node="ticketFail"]');
		$ticketList = $('[data-node="ticketBox"]');
	}
	getTicketByAjax();
}

module.exports = {
	init: 　init
}
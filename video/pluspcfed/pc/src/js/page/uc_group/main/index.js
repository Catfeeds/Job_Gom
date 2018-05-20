var fetch = require('io/fetch');
var urlLib = require('io/url');
var alert = require('module/popup/alert');
var tip = require("module/i18n");

require('module/tmodHelper/showPic')();

var tplCreated = require('./content-create.tpl');
var tplJoined = require('./content-joined.tpl');
var no_created = require('./no_created.tpl');
var no_joined = require('./no_joined.tpl');

var init = function() {
	var $tabBox = $('.user-content.new-user-content'),
		$tabBtn = $tabBox.find('[data-action="tab-switch"]'),
		$tabContent = $tabBox.find('.content-tab'),
		$contentInfo = $tabBox.find('.content-info'),
		$content = $('.user-content.new-user-content'),
		$createdCircle = $content.find('[data-node=createdCircle]'),
		$joinedCircle = $content.find('[data-node=joinedCircle]'),
		joinedLength = 0,
		createdLength = 0;
		// $loading = $content.find('[data-node=loading]'),
		// $noMore = $content.find('[data-node=noMore]');
	$('body').css('width', 'auto');
	//切换 我创建的圈子 我加入的圈子
	$tabBtn.off('click').on('click', function (){
		$(this).addClass('active').siblings('a').removeClass('active');
		$tabContent.hide();
		$tabContent.eq($(this).index()).show();
	});

	// 渲染我创建的圈子列表 我加入的圈子列表
	var contentInit = function(obj, type) {
		if (obj.length === 0) {
			// $loading.hide();
			showNoData(type);
		} else {
			// $loading.hide();
			obj.group_domain = $GLOBAL_CONFIG['group_domain'];
			if (type === 'created') {
				createdLength = obj.length;
				$tabContent.eq(0).find('.circle-index-list').html(tplCreated({
					contents: obj
				})).show();
				deleteCircle('disbandCircle');
			} else if (type === 'joined') {
				joinedLength = obj.length;
				$tabContent.eq(1).find('.circle-index-list').html(tplJoined({
					contents: obj
				})).show();
				deleteCircle('exitCircle');
			}
		}
	};

	// 暂无数据
	var showNoData = function(type) {
		if (type === 'joined') {
			$contentInfo.eq(1).html(no_joined({
				url_domain: $_CONFIG.group_domain + 'channel/index'
			}));
		} else if (type === 'created') {
			$contentInfo.eq(0).html(no_created({
				url_domain: $_CONFIG.group_domain + 'index/create'
			}));
		}
	};
	// 请求我创建的圈子 我加入圈子
	function renderContent(){
		fetch.get(urlLib.get('getMyGroups'),{
			async: true
		}).done(function(data) {
			if (data.success) {
				var created = data.imaster;
				var joined = data.imember;
				contentInit(created, 'created');
				contentInit(joined, 'joined');
			} else {
				alert("数据请求失败 请稍后尝试");
				// $loading.hide();
				// $noMore.show();
			}
		}).fail(function(/*jqXHR, textStatus, errorThrown*/) {
			alert("数据请求失败 请稍后尝试");
		});
	}
	renderContent();

	//删除
	function deleteCircle(types){
		var dialog, dialogs, obj, url, type, key, tips, dom, len, timer = null;
		if(types === 'disbandCircle'){
			//解散圈子
			obj = $tabContent.eq(0),
			url = urlLib.get('delGroupByGid'),
			type = 'get',
			key = 'groupId',
			tips = '解散成功',
			dom = 'created',
			len = createdLength;
		}else if(types === 'exitCircle'){
			//退出圈子
			obj = $tabContent.eq(1),
			url = urlLib.get('exitCircle'),
			type = 'post',
			key = 'groupid',
			tips = '退出成功',
			dom = 'joined',
			len = joinedLength;
		}
		// 点击删除
		obj.on('click', '[data-action="del-circle"]', function (){
			dialog = $(this).parent('.circle-box').find('[data-node="delPopUp"]'),
			dialogs = $('[data-node="delPopUp"]');
			dialogs.addClass('hide');
			dialog.removeClass('hide');
		});
		// 点击取消
		obj.on('click', '[data-action="cancelDel"]', function (){
			dialog.addClass('hide');
		});
		// 点击确定删除
		obj.on('click', '[data-action="delOne"]', function (){
			$('[data-node="delPopUp"]').addClass('hide');
			clearTimeout(timer);
			var _this = $(this);
			var $parent = $(this).parents('.circle-index-list');
			fetch[type](url, {
				data: {
					[key] : $(this).attr('data-id')
				}
			})
			.done(function(data) {
				if (data.success === true) {
					alert(tips);
					$('.pop-box-modal').css({
						left: '50%',
						top: '50%',
						margin: '-90px 0 0 -175px'
					});
					timer = setTimeout(function (){
						$('.pc-btnh35.circle-pop-btn').length && $('.pc-btnh35.circle-pop-btn').trigger('click');
					}, 3000);
					_this.parents('.circle-box').remove();
					if(!$parent.find('.circle-box').length){
						showNoData(dom);
					}
				} else {
					alert(data.message);
					// $loading.hide();
					// $noMore.show();
				}
			}).fail(function(/*jqXHR, textStatus, errorThrown*/) {
				alert(data.message);
			});
		});
	}

	//点击创建圈子
	function bClickCreate(){
		$('[data-action="create-circle"]').off('click').on('click', function (event){
			var $this = $(this);
			event.preventDefault();
			fetch.get(urlLib.get('groupCheck'), {
				async: false
			}).done(function(data) {
				if (data.success) {
					if(data.check){
						window.open($this.attr('data-href'));
					}else{
						alert('您所创建的圈子数已达上限，请删除部分后再创建。');
						$('.pop-box-modal').css({
							left: '50%',
							top: '50%',
							margin: '-90px 0 0 -210px'
						});
					}
				} else {
					alert("数据请求失败 请稍后尝试");
				}
			}).fail(function() {
				alert("数据请求失败 请稍后尝试");
			});
		});
	}
	bClickCreate();

	// 判断宽窄屏
	screenChange();
    window.onresize = function (){
        screenChange();
    };

};
// 判断宽窄屏
var screenChange = function(){
    $(window).width() > 1000 ? $('body').removeClass('w1000') : $('body').addClass('w1000');
};

module.exports = {
	init: init
};

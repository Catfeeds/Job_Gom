var fetch = require('io/fetch');
var url = require('io/url');
var alert = require('module/popup/alert');
var confirm = require('module/popup/confirm');
var tips = require("module/i18n").circle;
var checkLoginStatus = require('module/checkLoginStatus');
var loginPop = require('module/popup/login');

// var popTpl = "<p data-node='alertTitle' class='dialog_p'>申请已发送，请耐心等待</p><img data-node='QRcode' src=''><p class='dialog_p'>下载国美APP随时关注</p>";

var join = function (event){
	var $els = event.data?event.data.selector||$(this):$(this);
	var $action = $els.attr('data-action');
	var done = event.data?event.data.done||function (){}:function (){};
	var word = event.data?event.data.word||{ join : '加入圈子', focus : '退出圈子' }:{ join : '加入圈子', focus : '退出圈子' };
	var groupId = $els.attr('data-groupid'),
		memberType = $els.attr('data-membertype'),
		bpData = {
			event_id: $els.attr('event-id'), // 埋点数据
			group_id: groupId,
			circle_type: $_CONFIG['s_c'] // 2级分类
		};
	if ($_CONFIG['topicid']) {
		bpData.topic_id = $_CONFIG['topicid'];
	}
	// 发送统计数据
	if (window.BP !== undefined) {
		BP.send(bpData);
	}

	if ($els.attr('data-verif') == 1) {
		alert('您已提交申请，请等待审核');
		return;
	}
	/*var firing = $els.attr('data-firing');
	if (firing == 1) {
		return false;
	}
	$els.attr('data-firing', 1);*/
	var userid = $els.attr('data-userid');
	// var approvaltype = $els.attr('data-approvaltype');


	var newWeb = '';
	var noRefreshFetch = function(flag) {
		fetch.post(url.get('joinCircle'), {
			// validate: true,
			data: {
				groupid: groupId,
				imid: 'b_' + userid
			}/*,
			onLogin: function (){
				$_CONFIG['islogin'] = '1';
				noRefreshFetch();
			}*/
		}).done(function(data/*, textStatus, jqXHR*/) {
			if (data && data.code === 200 && data.success) {
				if (data.data.status === 0) {
					if($action && $action == 'joinGroup' && !flag) {
						confirm(tips.joinSuccessPublic, {
								className: 'pop-box',
								okValue: '暂不发布',
								cancelValue: '立即发布话题',
								okCls: 'pc-btn pc-btnh35 circle-pop-btn circle-cancel-btn',
								cancelCls: 'pc-btn pc-btnh35 circle-pop-btn',
								content: '<button data-active="close-join" class="ui-dialog-close icon icon-close" title="取消">×</button><div i="title" class="ui-dialog-title" style="border-bottom: none;"></div><p class="del-pop-p">' + tips.joinSuccessPublic + '</p>',
								ok: function(){},
								cancel: function(){
									// var $postTopic = $('[data-node=postTopic]');
									var url = 'topic/publiser?gid=' + $els.attr('data-groupid');
									window.open($_CONFIG['group_domain']+url);
								}
						});
					} else if($action && $action == 'joinCircle') {
						alert(tips.joinSuccess);
					} else {
						alert(tips.joinSuccess);
					}
					$('[data-active=close-join]').on('click', function(){
						$('.pop-box-backdrop').hide();
						$('[role=alertdialog]').hide();
					})
					$els.html(word.focus);
				} else if (data.data.status === 1) {
					// alert('申请已发送，请耐心等待');
					// var Dialog = alert('', {
					//     width: "500px",
					//     content: popTpl,
					//     cancel: false
					// });
					$('[data-node=QRcode]').attr('src', $_CONFIG.imgpath + '/images/public/down-ma.png');
					$('.dialog_p').css({
						'text-align': 'center',
						'margin': '10px 0px',
						'font-size': '1.5em'
					});
					$('[data-node=QRcode]').css({
						'margin-left': '173px'
					});
					// $els.css('background', '#CCC').html('审核中').off();
					// $els.html(word.join);
					alert('您已申请加入圈子，请等待圈主审核');
                    done("joining", $els);
                    setTimeout(function() {
                    	flag && location.reload();
					}, 1500)
				}
				done("join", $els);
			} else {
				if (data.code === 403 || data.message == '圈子拒绝加入') {
					alert(tips.cannotJoinCircle);
				} else if (data.code === 409) {
					$els.html(word.join);
					if(data.error) {
	                    if(data.error.code === '2' || data.message === '该圈子人数已达上限'){
	                        alert(data.message);
							done("limit", $els);
	                    }else if(data.error.code === '3' || data.message === '您已申请加入圈子，请等待圈主审核'){
							alert(data.message);
							done("joining", $els);
						}else if(data.error.code === '1' || data.message === '您已加入该圈子！'){
							alert(data.message);
							done("joined", $els);
							$els.html(word.focus);
							// location.reload();
						}
					}
				} else {
					alert(data.message);
				}
			}
		}).fail(function(/*jqXHR, textStatus, errorThrown*/) {
            // console.log(arguments);
		}).always(function() {
			// $els.attr('data-firing', 0);
		});
	};
	var exitCircle = function (){
		fetch.post(url.get('exitCircle'), {
			data: {
				groupid: groupId
			}
		}).done(function(data/*, textStatus, jqXHR*/) {
			if (data && data.code == 200 && data.success) {
				alert(tips.exit);
				$els.attr('data-membertype', 1);
				$els.html(word.join);
				done("exit", $els);
			}else{
				if( data.code == 410 ){
					alert(tips.dissolved,{
						ok:function (){
							location.reload();
						},
						onclose:function (){
							location.reload();
						}
					});
				}else if (data.code == 404){
					location.reload();
				}
			}
		}).fail(function(/*jqXHR, textStatus, errorThrown*/) {
			// console.log(arguments);
		}).always(function() {
			$els.attr('data-firing', 0);
		});
	}
	if(!checkLoginStatus()){
		loginPop(function(){
			$_CONFIG['islogin'] = '1';
			noRefreshFetch(1);
			setTimeout(function() {
            	window.location.href = window.location;
			}, 1500)
		})
		return;
	}
	if( memberType == 0 ){
		exitCircle();
	}else{
		noRefreshFetch();
	}
	return false;
}
module.exports = join;

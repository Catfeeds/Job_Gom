//仅用于分享话题
var shareDialog = require('module/share');

var share = function (node){
	var $node = node;
	var host = window.location.host;
	var _event;
	var shareLeave;
	var iconLeave;
	function unbindAlert(){
		$('[data-node=share_icon]').off();
		$('[data-node=share_alert]').off().remove();
	}
	var nodeEvent = {
		mouseenter:function (event){
			if( event.target.nodeName == 'A' ){
				_event = event.target;
			}else{
				_event = event.target.parentNode;
			}
			var $ShareAlert = $('[data-node=share_alert]');
			console.log();
			if( $ShareAlert ){
				$('[data-node=share_alert]').remove();
			}
			var shareAlert = '<div data-node="share_alert"><p data-node="share_icon" class="share-down" style="display:block"><span class="share-box"><span class="icon icon-up-arrow"></span><span data-node="icon_box" class="icon-box"><em data-node="weixin" class="icon icon-weixin">&#xe937;</em><em data-node="qq" class="icon icon-qq">&#xe900;</em><em data-node=sina class="icon icon-sina">&#xe935;</em><em data-node="qzone" class="icon icon-kongjian">&#xe902;</em></span></span></p></div>';
			$('body').append(shareAlert);
			$ShareAlert = $('[data-node=share_alert]');
			$ShareIcon = $('[data-node=share_icon]');
			$ShareAlert.css({'position':'absolute','top':event.pageY+20+'px','left':event.pageX-86+'px',width:'170px'});
			$ShareIcon.on({
				mouseenter:function (){
					clearInterval(shareLeave);
				},
				mouseleave:function (){
					unbindAlert();
				}
			})
			//绑定分享内容;
			var $IconBox = $('[data-node=icon_box]');
			$($IconBox.children()).each(function (){
				var URL = $(_event).attr('data-url');
				$(this).on('click',function (event){
					var option = {};
					option.type = $(this).attr('data-node');
					option.url = host+URL;
					switch(option.type){
						case 'weixin':
							option.title = '这儿有我们志趣相投的小伙伴，快加入我们吧！';
							break;
						case 'qq':
							option.title = '这儿有我们志趣相投的小伙伴，快加入我们吧！';
							break;
						case 'sina':
							option.title = '这儿有我们志趣相投的小伙伴，快加入我们吧！';
							break;
						case 'qzone':
							option.title = '这儿有我们志趣相投的小伙伴，快加入我们吧！';
							break;
					}
					console.log(option);
					shareDialog.go({type:option.type,url:option.url,title:option.title});
				});
			})
		},
		mouseleave:function (){
			clearInterval(shareLeave);
			shareLeave = setTimeout(unbindAlert,1000)
		}
	}
	shareDialog.go({type:'weixins',url:'http://www.gomeplus.com',title:'国美+'});
	$node.on({
		mouseenter:nodeEvent.mouseenter,
		mouseleave:nodeEvent.mouseleave,
	})
}
module.exports = share;
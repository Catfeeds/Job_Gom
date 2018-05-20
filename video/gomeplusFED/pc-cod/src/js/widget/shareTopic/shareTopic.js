//仅用于分享话题
var shareDialog = require('module/share');

var share = function (node){
	var $node = node;
	var _event;
	var shareLeave;
	var iconLeave;
	function unbindAlert(){
		$('[data-node=share_icon]').off();
		$('[data-node=share_alert]').off().remove();
	}
	var nodeEvent = {
		mouseenter:function (event){
			_event = event.target;
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
				var URL =$($($($(_event).parents('div.mg-negative')).children('div.list-title')).children('p.list-title-content')).children('a')[0].href;
				// console.log(URL)
				$(this).on('click',function (event){
					var option = {};
					option.type = $(this).attr('data-node');
					// option.url = $(_event.target.parentNode.parentNode).children()[1].childNodes[1].childNodes[5].href;
					option.url = URL;
					switch(option.type){
						case 'weixin':
							option.title = '';
							break;
						case 'qq':
							option.title = '';
							break;
						case 'sina':
							option.title = '';
							break;
						case 'qzone':
							option.title = '';
							break;
					}
					console.log(option);
					shareDialog.go({type:option.type,url:'http://www.gomeplus.com',title:'国美+'});
				});
			})
		},
		mouseleave:function (){
			clearInterval(shareLeave);
			shareLeave = setTimeout(unbindAlert,1000)
		}
	}
	// shareDialog.go({type:'weixins',url:'http://www.gomeplus.com',title:'国美+'});
	$node.on({
		mouseenter:nodeEvent.mouseenter,
		mouseleave:nodeEvent.mouseleave,
	})
}
module.exports = share;
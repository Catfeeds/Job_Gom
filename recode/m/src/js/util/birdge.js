/**
 * $g.env.version 旧版获取app 版本号
 * GomeJSBridge.appVersion 获取app版本号
 * 版本号大于
 */

// 旧版bridge
import $g from './gome-brige.js';
// 新版bridge
import GomeJSBridge from './GomeBridge-new.js';

const _export = function(){

	var platform = ['WeiBo', 'Wechat', 'WechatMoments', 'QQ', 'QZone', 'GomeMyFriends', 'GomeMoments', 'CopyLink'];

	const setHeadBar = function(params){
		var param = {
			menus: {
	            isShowCloseMenu: 'Y',
	            rightMenus: [{
	                type:'share',
	                title:'分享',
	                icon:'file://share',
	                //action:'http://u.m.atguat.com.cn/my_evaluate-0.html',
	                shareInfo: {
	                    title: params.title,
	                    shareDesc: params.shareDesc,
	                    shareImageUrl: params.imageUrl,
	                    shareUrl: params.link,
	                    platform: platform
	                }
	            }]
	        }
		};
		GomeJSBridge.setHeadBar(function(data){
	        
	    }, function(err){
	        
	    }, param);
	}

	const getAppVer = function(){
		var r = /gome(?:plus)?\/(?:iphone\/)?(\d*)/;
		var ret = navigator.userAgent.match(r);
		return ret ? parseInt(ret[1], 10) : -1;
	}

	// 是否使用新版bridge
	const isNewBridge = getAppVer() >= 90;

	if(isNewBridge){
		return {
			ready: function(callback){
				GomeJSBridge.ready(function(){
					callback();
				});
			},
			login: function(){
				GomeJSBridge.isLogin(function(data){
					if('Y' === data.isLogined){
						// 一般情况下,页面会输出是否登录的标识
						// 如果页面标识是未登录,但app返回的是登录,则刷新页面
						// 出现场景：分享之前,用户未登录,分享控件呼起登录
						// 登录之后,登录状态并未同步到h5页
						window.location.reload();
					} else {
						GomeJSBridge.login(null, null);
					}
				});
			},
			share: function(params){
				GomeJSBridge.callShareComp(function(data){
			        
			    }, function(err){

			    }, {
			        title: params.title,
			        shareDesc: params.shareDesc,
			        shareImageUrl: params.imageUrl,
			        shareUrl: params.link,
			        channel : 'link',
			        platform: platform
		    	});
			},
			setHeadBar: setHeadBar
		}
	} else {
		var share = function(params){
			$g.setShareInfo({
				title: params.title,
				shareDesc: params.shareDesc,
				link: params.link,
		        imageUrl: params.imageUrl,
		        sharePlatform: '0,2,3'
			});
		}
		return {
			ready: function(callback){
				$g.ready().then(function(){
					callback();
				});
			},
			login: function(){
				$g.login();
			},
			share: share,
			setHeadBar: share
		}
	}
}

export default _export();

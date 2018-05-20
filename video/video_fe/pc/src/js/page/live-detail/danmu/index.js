import 'css/components/ui-dialog.scss';

import Player from './player.js';
import DanmuList from './danmuList.js';
import DanmuForm from './danmuForm.js';
import Record from 'widgets/record/index';
import Dialog from 'plugin/dialog/artDialog.js';
import emojiData from './emojiData.js';
import {login, logout} from 'common/commonLogin.js';

class DanMu {
	constructor(opts = {}){
		if(!opts.videoId || !opts.topicId){
			throw new Error('videoId and topicId is required');
		}
		var record = Record.getInstance();
		var player = new Player(opts);
		var danmuForm = DanmuForm(opts);
		var danmuList = null;

		var $videoPlayer = $('#mxplayer');

		this.showDanmakuInited = false;

		danmuList = DanmuList(opts);
		
		function getUserInfo(){
			let userInfo = {
				user_id:'',
				nickname:''
			};
			if ($CONFIG.userId != 0) {
				userInfo.user_id = $CONFIG.userId;
				userInfo.nickname = $CONFIG.nickName;
			}
			player.player.setUserInfo(userInfo);
		}

		// 是否显示弹幕
		player.on('showDanmaku', (type, data) => {
			if (this.showDanmakuInited) {
				return false;
			}
			this.showDanmakuInited = true;
			$('[data-node=playerloading]').remove();
			if (!data.showDanmaku) {
				danmuForm.destroy();
				return false;
			}

			danmuForm.init(player);


			// 弹幕区域的隐藏和显示
			var $playerbox = $('[data-node=playerbox]');
			var $danmubox = $playerbox.find('[data-node=danmubox]');
			var $danmuform = $playerbox.find('[data-node=danmuform]');
			var $player = $('#mxplayer');
			var state = 'open'; // close, open 弹幕区域默认是显示状态
			$playerbox.on('click', '[data-node=toggle]', function(e){
				var $this = $(this);
				if(state === 'open'){
					$danmubox.hide();
					$danmuform.addClass('long');
					$player.width('1200px');

					$this.removeClass('icon-21').addClass('icon-20');
					$this.removeClass('closed').addClass('opened');
					state = 'close';
				} else {
					$danmubox.show();
					$danmuform.removeClass('long');
					$player.width('900px');
					
					$this.removeClass('icon-20').addClass('icon-21');
					$this.removeClass('opened').addClass('closed');
					state = 'open';

					var $container = $('[data-node=msgList]');
					var $box = $container.parent('div');
					var cHeight = $box.height();
					var sHeight = $container.height();
					if (sHeight > cHeight) {
						$box.scrollTop(sHeight-cHeight);
					}
				}
			});
		});

		// 播放器初始化成功
		player.on('playerInited', () => {
			// 递交emoji表情库
			player.player.setDanmakuBrow(emojiData);
		});
		// 记录直播的观看记录, 直播未开始不会触发playerInited。
		record.push(opts.topicId);
		// 发送用户信息
		player.on('needUserInfo', getUserInfo);
		// 收到弹幕消息时
		
		var tempData = [];
		player.on('messageReceived', (type, data) => {
			if (!data.isSensitive) {
				//TODO: 播放器未初始化成功时,是否需要把msg存储起来
				
				// 更新弹幕列表
				if (danmuList === null) {
					tempData.push(data);
				}else{
					if (tempData.length) {
						tempData.push(data);
						tempData.forEach((v)=>{
							danmuList.render(v);
						});
						tempData = [];
					}else{
						danmuList.render(data);
					}
				}
				
			} else {
				// console.log('当前数据有敏感词 被过滤掉');
			}
		});
		// 登录被踢
		player.on('userLoginedByOther', () => {
			// 登录被踢出
			Dialog({
				fixed: true,
				modal: true,
				autofocus: false,
				content: '你的账号已在其他终端登录，是否重新登录！',
				ok: getUserInfo,
				onshow: function(){}
			}).show();
		});

		/*
		player.on('videoPlayed', function(type, data){
			record.push(opts.topicId);
		});
		*/
		
		
	}
}

export default DanMu;
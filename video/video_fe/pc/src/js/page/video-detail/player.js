import Record from 'widgets/record/index';
import {loginFlag, page, env} from 'util/phpCommon';

var init = function(){
	var topicId = page.topicId;
	var record = Record.getInstance();
	var player = new MeixinPlayer();
	var $videoPlayer = $('#videoContainer1');
	
	$videoPlayer.addClass('player');

	// videoPlayed infoLoaded
	player.on('playerInited', function(){
		record.push(topicId); // 保存观看记录

	// 发送用户信息

		let userInfo = {
			user_id:'',
			nickname:''
		};
		if ($CONFIG.userId != 0) {
			userInfo.user_id = $CONFIG.userId;
			userInfo.nickname = $CONFIG.nickName;
		}
		player.setUserInfo(userInfo);
	});


	var report = function(){
		var duration = player.currentTime();
		record.updateDuration(topicId, parseInt(duration, 10));
	};

	// 暂停
	player.on('playPause', (type, data) => {
		report();
	});

	// 结束
	player.on('playStop', (type, data) => {
		report();
	});
	
	// 关闭页面时,上报播放时长
	$(window).on('beforeunload', function(){
		report();
	});

	player.on('playerInited',() => {
		var duration = parseInt($CONFIG['duration']);
		if (!loginFlag) {
			duration = record.transform()[topicId].c;
		}
		player.playFromLastPlayTime(duration); 
	});

	player.init(page.videoId || 428, 'videoContainer1', {
		env: env, // dev, pre, dist
	    type: 'vod', // 直播：live，点播：vod
		autoplay: 1
	});
	
};

export default {
	init: init
};
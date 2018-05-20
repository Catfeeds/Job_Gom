/**
 * [聊天互动]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
import {loginFlag, page} from 'util/phpCommon';
import toast from 'components/toast';
import updateTime from '../record/updateTime';
import unloginSaveRecord from '../record/unloginSaveRecord.js';
import loginSaveRecord from '../record/loginSaveRecord.js';
import ChatList from './chatList.js';
import ChatForm from './chatForm.js';


let topicId = page.topicId;
let player = new MeixinPlayer();
let chatList = ChatList();
let chatForm = ChatForm({
	host_id: page.userId,
	nikeName: page.nickName,
	avatar: page.avatar,
	videoId: page.videoId,
	topicId: topicId
});

chatForm.init(player);

player.init(page.videoId, 'video-player', {
	type: 'live',
	env: page.env || 'pre',
	danmakuStatus: 1
});
// 记录观看记录
if (loginFlag) {
	updateTime(topicId,player);
	loginSaveRecord({tid:topicId});
}else{
	unloginSaveRecord({tid: topicId});
}

let getUserInfo = () => {
	let userInfo = {
		user_id:'',
		nickname:''
	};
	if (page.userId != 0) {
		userInfo.user_id = page.userId;
		userInfo.nickname = page.nickName;
	}
	player.setUserInfo(userInfo);
};

// 发送用户信息
player.on('needUserInfo', getUserInfo);

// 收到弹幕消息时
player.on('messageReceived', (type, data) => {
	if (!data.isSensitive) {
		chatList.getData(data);
	} else {
		// console.log('当前数据有敏感词 被过滤掉');
	}
});
/*player.on('sendMessageSendResult', (type, data) => {
	if (data.result) {
		chatForm.sendSuccess();
	} else {
		toast('发送失败');
	}
});*/

player.on('userLoginedByOther', () => {
	// 登录被踢出, 登录失效
	toast('你的账号已在其他终端登录！',{
			position:{
				left: 'center',
				top: '52%'
			}
		});
	page.userInfo = 0;
});
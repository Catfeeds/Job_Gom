/**
 * [chat form]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
import fetch from 'io/fetch';
import EventEmitter from 'util/event-bus';
import toast from 'components/toast';
import {loginFlag, page} from 'util/phpCommon';
import login from 'common/login.js';
import Online from 'util/isOnline.js';

let onLine = Online();

class ChatForm extends EventEmitter{
	constructor(opts = {}) {
		super();
		this.opts = opts;
		this.$live = $('.live-detail');
		this.$video = $('#video-player');
		this.$editorBar = $('[data-node="editor-bar"]');
		this.$mask = $('[data-node="mask"]');
		this.$editorForm = $('[data-node="editor-form"]');
		this.$eTxts = $('[data-node="editor-txts"]');
		this.$eCount = this.$editorForm.find('[data-node="editor-count"]');
		this.$curCount = this.$eCount.find('em');
		this.$eSubmit = this.$editorForm.find('[data-node="editor-submit"]');
		this.maxCount = 40;
		this.disabled = false;
		this.player = null;
	}
	init(player) {
		let _this = this;
		let ua = navigator.userAgent.toLowerCase();
		this.player = player;
		this.$curCount.text('0');
		this.$eCount.find('span').text(this.maxCount);

		this.$mask.on('click',function(){
			_this.$eTxts.blur();
		});

		this.$editorBar.on('click',()=>{
			if (loginFlag) {
				this.showEditorForm();
			}else{
				login();
			}
		});

		this.$eTxts.on({
			'focus': (e)=>{
				let mt = -100;
				let txtsHeight = _this.$eTxts[0].offsetHeight;

				_this.$mask.removeClass('hide');

				if (/android/.test(ua)) {
					_this.$live.css('margin-top',mt);
					// _this.$video.hide();
				}
				setTimeout(function(){
					if (/iphone|ipad|ipod/.test(ua)) {
						window.scrollTo(0,window.pageYOffset+txtsHeight);
					}

				},300);
			},
			'blur': (e)=>{
				_this.$mask.addClass('hide');

				if (/android/.test(ua)) {
					_this.$live.css('margin-top',0);
					// _this.$video.show();
				}
				if (_this.$eTxts.val() == '') {
					_this.$eTxts.val('');
					_this.$editorForm.addClass('hide');
				}
			}
		});

		this.$eTxts[0].addEventListener('input',(e)=>{
			let val = e.target.value;
			let num = _this.checkTextLength(val);
			_this.$curCount.text(num);
			_this.changeTextNumStatus(num);
		});

		this.$eSubmit.on('click',function(){
			let val = _this.$eTxts.val();

			// 判断网络连接
			if (!onLine.isOnline) {
				toast('网络连接失败',{
					position:{
						left: 'center',
						top: '51%'
					}
				});
				return false;
			}

			if (_this.disabled) {
				return false;
			}
			
			if (val === '') {
				return false;
			}

			if (val.trim() === '') {
				toast('发送内容不能为空',{
					position:{
						left: 'center',
						top: '51%'
					}
				});
				return false;
			}

			_this.send(val);
		});

	}
	showEditorForm(){
		this.$editorForm.removeClass('hide');
		this.$eTxts.focus();
	}
	checkTextLength(t){
		let len = 0;
		let code = 0;
		let tLen = t.length;
		for(let i = 0; i<tLen; i++){
			code = t.charCodeAt(i);

			if (code >= 0 && code < 128) {
				len +=0.5;
			}else{
				len +=1;
			}
		}
		return Math.ceil(len);
	}
	changeTextNumStatus(num){
		let $submit = this.$eSubmit;
		let $count = this.$curCount;

		if (num > 0) {
			if (num > this.maxCount) {
				this.$curCount.addClass('waring');
				$submit.removeClass('active');
				this.disabled = true;
			}else{
				this.$curCount.removeClass('waring');
				$submit.addClass('active');
				this.disabled = false;
			}
		}else{
			$submit.removeClass('active');
			this.disabled = false;
		}

	}
	addEmoticons(data){

	}
	adaptationData(text){

	}
	send(val) {
		let data = {
			id: page.userId,
			name: page.nickName
		};
		this.player.sendDanmaku(this.buildData(val, data));
		this.$editorForm.addClass('hide');
		this.$eTxts.val('');
		this.$curCount.text('0');
		this.changeTextNumStatus(0);
	}
	sendSuccess(){
		this.$editorForm.addClass('hide');
		this.$eTxts.val('');
		this.$curCount.text('0');
		this.changeTextNumStatus(0);
	}
	buildData(content, data) {
		var opts = this.opts;
		var userid = data.id;

		var contentColor = '#ffffff';
		var senderColor = '#49abd1';
		if (opts.host_id === userid) {
			contentColor = senderColor = '#e90034';
		}
		return {
			content: content, //弹幕的内容 
			room_id: opts.videoId, //视频ID 
			style: { //样式
				fontSize: '22px', //字体大小 
				color: contentColor //字体颜色 
			},
			sender: {
				user_id: userid, //发送者ID
				nickname: data.name, //发送者昵称
				avatar: opts.avatar, // 发送者头像
				// 'session_id': getCookie('PHPSESSID') || '', //sessionid
				style: {
					fontSize: '22px', //昵称字体大小
					color: senderColor //昵称字体颜色
				}
			},
			receiver: {
				user_id: '', //接收者ID
				nickname: '', //接收者昵称
				style: {
					fontSize: '22px', //昵称字体大小
					color: '#ffffff', //昵称字体颜色
				}
			}
			/*,
			"type": "2"*/ //代表范围 1代表全站 2代表群聊 3代表私聊
		};
	}
}

let instance;

export default (opts) => {
	if(!instance){
		instance = new ChatForm(opts);
	}
	return instance;
};

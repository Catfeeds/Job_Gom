<template>
	<div class="im">
		<m-header>
			<div class="header">
				<div class="wrap-box">
					<div class="fl">{{user_info.nick_name}}
						<div class="header-select">
							<div @click="toggleConditionStatus()">
								<span :class="status.conditionStyle"></span>{{status.conditionHtml}}<em class="san"></em>
							</div>
							<div class="select-s" v-show="status.conditionStatus">
								<a href="javascript:void(0)" @click="conditionStatusHtml($event,1)" :class="{'active' : conditionType == 1}"><span></span>在线</a>
								<a href="javascript:void(0)" @click="conditionStatusHtml($event,2)" :class="{'active' : conditionType == 2}"><span class="red"></span>忙碌</a>
								<a href="javascript:void(0)" @click="conditionStatusHtml($event,3)" :class="{'active' : conditionType == 3}"><span class="gray"></span>离线</a>
							</div>
						</div>
						当前处理咨询人数：<span class="text">{{consultation_number}}</span>当前等待咨询人数：<span class="text">{{wait_num}}</span><a href="javascript:void(0)" @click="close()" class="btn-header">退出</a>
					</div>
					<div class="fr">
						<img src="/dist/img/ui/logo.png">
					</div>
				</div>
			</div>
		</m-header>
		<div class="wrap-box clearfix">
			<m-contacts>
				<div class="left-tab">
					<a href="javascript:void(0)" @click="tabAndload()" :class="{ 'active': status.tabStatus}">当前联系人<em class="icon-tab"></em></a>
					<a href="javascript:void(0)" @click="this.status.tabStatus = false" :class="{ 'active': !status.tabStatus}">历史联系人<em class="icon-tab"></em></a>
				</div>
				<div class="list_cur" v-show="status.tabStatus">
					<div class="tab-list" v-for="item in currentList">
						<ul>
							<li class="contacts_li contacts_cur" @click="loadStatusControl($index,item.customerId,0,$event)"><img :src="item.imgPath">
								<p><span class="f14">{{item.nickname}}</span><span class="fr">{{item.recentVisitTime}}</span></p>
								<p class="gray">{{item.recentVisitRecord}}</p><span v-show="item.show" class="new">{{item.num}}</span>
							</li>
						</ul>
					</div>
				</div>
				<div class="list_hicurrentListst" v-show="!status.tabStatus">
					<div class="tab-list" v-for="item in recentContactList">
						<ul>
							<li class="contacts_li contacts_his" data-load="true" @click="loadStatusControl($index,item.customerId,1,$event)"><img :src="item.imgPath">
								<p><span class="f14">{{item.nickname}}</span><span class="fr">{{item.recentVisitTime}}</span></p>
								<p class="gray">{{item.recentVisitRecord}}</p>
							</li>
						</ul>
					</div>
				</div>
			</m-contacts>
			<m-record>
				<div class="chatrecord">
					<div class="right-chat" style="height: 430px;">
						<div class="chat-scroll" @mousewheel="mousewheel($event)">
							<div v-show="status.loadStatus" style="text-align: center;margin-top: 5px;">上拉加载加载历史信息</div>
							<div v-show="status.loadingStatus" style="text-align: center;margin-top: 5px;">正在加载中...</div>
							<div v-show="status.noMore" style="text-align: center ;margin-top: 5px;">没有更多</div>
							<div v-for="item in news_array" track-by="$index">
								<dl class="clearfix" v-if="item.personnelType == 1">
									<dt><img :src="item.sessionIcon"></dt>
									<dd>
										<p class="gray">{{item.sessionName}} {{item.sessionTime | Date 'hh:mm:ss'}}</p>
										<div class="text" @click="contactPlay($event)"><em class="icon-san"></em>
											<p v-if="item.sessionContent.type.trim() == 'text'">{{{item.sessionContent.content | faceShow}}}</p>
											<p v-if="item.sessionContent.type.trim() == 'img'"><img :src="item.sessionContent.content"></p>
											<div v-if="item.sessionContent.type.trim() == 'video'" class="im-video">
												<video id="crm" width="130" height="190">
													<source :src="item.sessionContent.content" type="video/ogg">您的浏览器不支持 video 标签。
													<!--<source src="http://v.xiaohongchun.com/19F626CD80BC65C2" type="video/ogg">您的浏览器不支持 video 标签。-->
												</video><em class="icon-play"></em>
											</div>
											<div v-if="item.sessionContent.type.trim() == 'audio'" :style="{'width':item.sessionContent.playtime/1000+'px','max-width':'250px'}" class="im-audio im-audio-new">
												<div class="fl">{{item.sessionContent.imgHeight}}s'</div>
												<div class="fr"></div>
												<a class="audio-con" :href="item.sessionContent.content" style="display:none">audio</a>
												<!-- <a class="audio-con" href="/demo/yuan.amr" style="display:none">audio</a> -->
												<!-- <audio  :data-src="item.sessionContent.content">
													<source :src="item.sessionContent.content" type="audio/amr">您的浏览器不支持 audio 标签。
													<source :src="item.sessionContent.content" type="audio/ogg">您的浏览器不支持 audio 标签。
													<source :src="item.sessionContent.content" type="audio/mp4">您的浏览器不支持 audio 标签。
													<source :src="item.sessionContent.content" type="audio/mp3">您的浏览器不支持 audio 标签。
												</audio> -->
											</div>
										</div>
									</dd>
								</dl>
								<dl v-else class="clearfix right">
									<dt><img :src="user_info.icon"></dt>
									<dd>
										<p class="gray">{{item.sessionName}} {{item.sessionTime | Date 'hh:mm:ss'}}</p>
										<div class="text"><em class="icon-san"></em>
											<p v-if="item.sessionContent.type.trim() == 'text'">{{{item.sessionContent.content | faceShow}}}</p>
											<a v-if="item.rewire" @click="resend(item)" class="resend"><span>!</span>重发</a>
											<a v-if="item.loading" class="resend"><img src="/dist/img/ui/loading.gif"></a>
											<p v-if="item.sessionContent.type.trim() == 'img'"><img :src="item.sessionContent.content"></p>
										</div>
									</dd>
								</dl>
							</div>
						</div>
					</div>
					<div class="chat-send">
						<div class="send-title">
							<a @click="this.status.faceStatus = !this.status.faceStatus" class="icon icon-expression face_button"></a>
							<a style="position: relative" class="icon icon-img">
								<input class="photo" @change="uploadImg($event)" style="opacity: 0;width: 26px;position: absolute;top:0;left: 0" type="file">
							</a>
							<!--<a href="javascript:;" class="icon icon-cut"></a>-->
							<a @click="recentContactListDelete()" class="btn btn-gray">结束当前会话</a>
							<div class="expression-box clearfix face_box" v-show="status.faceStatus">
								<img class="face_img" v-for="item in face" @click="sendFace(item)" :src="'/dist/img/faces/' + item + '.png'">
							</div>
						</div>
						<div class="send-text" style="position: relative">
							<textarea class="input_content" style="position: relative;z-index: 50" row="4" v-model="inputPool" @keydown="sendMsg($event)">{{{inputPool}}}</textarea>
							<div class="img_content" @click="textareaFocus()" style="position: absolute;top:0;left:0;width: 526px;height: 60px;padding: 5px;z-index: 100;display: none;background-color: #f9f9f9"></div>
							<div class="send-btn">
								<div class="btn-send"><a class="send btn btn-blue" @click="sendMsg($event)">发送</a><span class="icon-down" @click="this.status.sendMod = true"></span></div>
								<div class="btn-send-empty" v-show="status.messageEmpty"><em class="sanjiao"></em><span>!</span>发送内容不能为空！</div>
								<div class="btn-send-s" v-show="status.sendMod">
									<a class="enter" @click="sendTypeChange($event)" :class=" {'active' : status.sendType}">Enter发送</a>
									<a class="c_enter" @click="sendTypeChange($event)" :class=" {'active' : !status.sendType}">ctrl+Enter发送</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</m-record>
			<m-common_msg></m-common_msg>
		</div>
	</div>
	<audio class='msg_music' style='display: none;'>
		<source src='/dist/img/tip.mp3' type="audio/mp3">您的浏览器不支持 audio 标签。
	</audio>


</template>
<style scoped>
</style>
<script type="text/ecmascript-6">
import $ from 'jquery';
import header from './header.vue';
import contacts from './contacts.vue';
import common_msg from './common_msg.vue';
import record from './record.vue';
import actions from 'actions';
import store from 'store';

import utils from 'utils';

export default {
	name: 'Index',
	data() {
		return {
			connect_num: 0,
			wait_num: 0,
			transmit_mode: true,
			currentList: [],
			recentContactList: [],
			news_array: [],
			timer:null,
			hasNewUnreadMsg:false,
			face: ["YY", "鄙视", "大哭", "大笑", "得意",
				"恶心", "愤怒", "尴尬", "惊恐", "迷茫",
				"可怜", "抠鼻", "困", "流泪", "努力",
				"亲", "色", "伤心", "石化", "睡觉",
				"微笑", "疑问", "阴险", "晕", "抓狂"
			],
			status: {
				bConnected: false,
				conditionStatus: false,
				conditionHtml: '在线',
				conditionType: 1,
				tabStatus: true,
				loadStatus: false,
				loadingStatus: false,
				noMore: false,
				messageEmpty: false,
				faceStatus: false,
				sendMod: false,
				sendType: true,
				fileType: 1, //1:文本2:图片
				timeLoadhistory: 0,
				conditionStyle: '',
				current: false,
				webscoketStatus:true
			},
			imgInfo: {
				name: '',
				binaryString: '',
			},
			inputPool: '',
			uid: 0,
			pageIndex: 1,
			sessionIdR: 0,
			num: 0,
			consultation_number: 0,
			pollingTime:4,
			welcomeCopy:'您好，欢迎您的访问！',
			endCopy:'您好，非常感谢您的咨询，祝你生活愉快，再见~~',
			timeoutCopy:'您好！由于您超过4分钟未发言我们将结束本次咨询。欢迎您再次咨询~~'
		}
	},
	components: {
		'm-header': header,
		'm-contacts': contacts,
		'm-common_msg': common_msg,
		'm-record': record
	},
	vuex: {
		getters: {
			user_info() {
				return store.state.user_info;
			}
		},
		actions: actions
	},
	ready() {
		const self = this;
		self.$http({
			url: 'dictionary/getConfig',
			method: 'get'
		}).then((response) => {
			const data = response.data.data;
			data.configuration.forEach(function(item){
				if(item.type == 2){
					self.pollingTime = parseInt(item.val);
				}else if(item.type == 3){
					self.welcomeCopy = item.val;
				}else if(item.type == 5){
					self.endCopy = item.val;
				}else if(item.type == 9){
					self.timeoutCopy = item.val;
				}

			})
			self.connect();
			self.newsTimingCleanup();
			self.getRecentContactList();
			document.onkeydown = function(e) {
				var e = event || window.event || arguments.callee.caller.arguments[0];
				if (e && e.keyCode == 8) {
					self.cleanImage();
				}
				self.imgInfo = {}
			}
			window.onbeforeunload = function() {
				var text = '';
				if(self.currentList.length > 0){
					text = `当前还有${self.wait_num}位用户等待咨询，是否离开`
				}else{
					text = ''
				}
				return text
			}
			window.addEventListener('offline', function(){
				self.status.webscoketStatus = false;
				self.conditionStatusControl('customeroffline');
				clearTimeout(self.currentListTiming);
				console.log('断网啦');
			});
			window.addEventListener('online',  function(){
				self.connect();
				self.status.webscoketStatus = true;
				console.log('连上网啦');
			});
			console.log(JSON.stringify(self.user_info));
			$(document).on('click', (e) => {
				var _con = $('.header-select');
				var face_button = $('.face_button');
				var face_box = $('.face_box');
				if (!_con.is(e.target) && _con.has(e.target).length === 0) {
					this.status.conditionStatus = false;
				}
				if(!face_button.is(e.target) && face_button.has(e.target).length === 0 && face_box.has(e.target).length === 0 && !face_box.is(e.target)){
					this.status.faceStatus = false;
				}
			})
		});

	},
	route: {

	},
	events: {
		'common-msg': function(msg) {
			this.inputPool = msg
		}
	},
	methods: {

		getRecentContactList() { //获取历史联系人列表
			const _self = this;
			_self.$http({
				url: 'customer/getRecentContact',
				method: 'get',
				params: {
					operator_id: _self.user_info.operator_id
				}
			}).then((res) => {
				_self.recentContactList = res.data.data.list
			})
		},
		//all of websocket
		send(data) { //发送消息
			const _self = this;
			const ws = _self.ws
			try {
				ws.send(JSON.stringify(data));
				$('.img_content').hide();
			} catch (error) {
				actions.alert(store, {
					show: true,
					msg: error,
					type: 'info',
					delay: 2500
				})
			}
		},
		websocketinit() { //websocket配置及加载
			const _self = this;
			_self.ws = new WebSocket(`${this.user_info.imhubPath}?imid=${this.user_info.operator_id}`);
//			_self.ws = new WebSocket(`ws://10.69.6.70:7080/venus-imhub-web/websocket?imid=${this.user_info.operator_id}`);
			const ws = _self.ws
			console.info("conntecting。。。。。");
			// 连接websocket
			ws.onopen = function() {
				console.info("connected ok");
				_self.offlineCurrentListTimingCtro();
				_self.currentListTimingCleanup();
				_self.bConnected = true;
				_self.conditionStatusControl('customeronline');
				_self.status.webscoketStatus = true;
			}
			ws.onmessage = function(evt) {
				_self.message(evt.data);
				_self.status.webscoketStatus = true;
			}
			ws.onclose = function() {
				console.info("closed");
				_self.bConnected = false;
				actions.alert(store, {
					show: true,
					msg: '链接服务器失败',
					type: 'info',
					delay: 2500
				})
				_self.conditionStatusControl('customeroffline')
				_self.status.webscoketStatus = false;
				clearTimeout(_self.currentListTiming);
			}

			ws.onerror = function() {
				actions.alert(store, {
					show: true,
					msg: '链接服务器失败',
					type: 'info',
					delay: 2500
				})
				_self.conditionStatusControl('customeroffline')
				_self.status.webscoketStatus = false;
				clearTimeout(_self.currentListTiming);
			}
		},

		connect() { //链接websocket
			this.websocketinit();
		},
		reconnect() { //尝试重新连接
			if (!this.bConnected) { //如果已经连接上了，就不触发重新连接
				this.websocketinit();
			}
		},
		init_callback(data, suscallback, errcallback) { //返回成功失败的分类处理
			if (data.result || data.code == 0) {
				suscallback(data);
			} else {
				errcallback(data);
			}
		},
		message(data) { //收到消息的分类处理
			console.info(data);
			const _self = this;
			//                    var self = this;
			if ("string" === typeof data) {
				data = JSON.parse(data); //TODO
			}
			switch (data.type) {
				case "newmsg":
					_self.init_callback(data, function() {
						_self.newMsg(data)
					}, function() {});
					break;
				case "systemMsg":
					_self.init_callback(data, function() {
						_self.newMsg(data)
					}, function() {});
					break;
					/*监听callback*/
				case "init":
					_self.init_callback(data, function() {}, function() {
						_self.reconnect(_self.url)
					});
					break;
				case "sendmsg":
					_self.init_callback(data, function() {
//						_self.sendMsgControl(data)
					}, function() {});
					break;
				case "useroffline":
					_self.getRecentContactList();
					break;
				case "deleteuser":
					_self.init_callback(data, function() {
						_self.recentContactListDeleteChild(data)
					}, function() {});
					break;
				case "customeronline":
					_self.init_callback(data, function() {
						_self.conditionStatusControl(data.type)
					}, function() {})
					break;
				case 'customerbusy':
					_self.init_callback(data, function() {
						_self.conditionStatusControl(data.type)
					}, function() {})
					break;
				case 'customeroffline':
					_self.init_callback(data, function() {
						_self.conditionStatusControl(data.type)
					}, function() {})
					break;
				case 'waitingNumber':
					_self.wait_num = data.data.number
					break;
				case 'messageCallBack':
					_self.messageStatusChange(data);
					break;
				default:
					console.info("_message:default", data.type);
			}
		},
		//header
		conditionStatusHtml(e, type) { //在线、忙碌、离线状态切换申请
			const _self = this;
			const timestamp = new Date().valueOf();
			var typeContent = '';
			if (type == 3 && _self.consultation_number > 0) {
				actions.alert(store, {
					show: true,
					msg: '您当前还有咨询处理，请完成后再离线',
					type: 'info',
					delay: 2500
				})
				_self.status.conditionStatus = false
				return
			}
			switch (type) {
				case 1:
					typeContent = 'customeronline';
					if(!_self.status.webscoketStatus){
						_self.connect();
					}
					break;
				case 2:
					typeContent = 'customerbusy';
					break;
				case 3:
					typeContent = 'customeroffline';
					break;
				default:
					actions.alert(store, {
						show: true,
						msg: '修改状态提交异常',
						type: 'info',
						delay: 2500
					})
			}
			_self.send({
				type: typeContent,
				data: {
					kid: _self.user_info.operator_id
				},
				date: timestamp,
				callback: typeContent
			})
		},
		toggleConditionStatus() {
			const _self = this;
			_self.status.conditionStatus = !_self.status.conditionStatus
		},
		conditionStatusControl(type) { //在线、忙碌、离线状态切换回调
			console.log(type);
			const _self = this;
			var typeS = 1;
			_self.status.conditionStatus = false;
			switch (type) {
				case 'customeronline':
					_self.status.conditionHtml = "在线";
					_self.status.conditionStyle = ''
					typeS = 1
					break;
				case 'customerbusy':
					_self.status.conditionHtml = "忙碌";
					_self.status.conditionStyle = 'red'
					typeS = 2
					break;
				case 'customeroffline':
					_self.status.conditionHtml = "离线";
					_self.status.conditionStyle = 'gray'
					typeS = 3
					break;
				default:
					actions.alert(store, {
						show: true,
						msg: '修改状态返回异常',
						type: 'info',
						delay: 2500
					})
			}
			_self.status.conditionType = typeS;
		},
		close() { //点击注销退出界面
			const _self = this;
			if(_self.currentList.length > 0){
				actions.alert(store, {
					show: true,
					msg: '您当前还有咨询处理，请完成后再离线',
					type: 'info',
					delay: 2500
				})
				return false
			}else{
				window.close();
			}
		},
		//Message
		newMsg(data) { //新消息处理
			const _self = this;
			const currentList = _self.currentList;
			const time = new Date().valueOf();
			var len = currentList.length;
			var count = 0;
			var obj = {
				"customerId": data.data.uid,
				"imgPath": data.data.sessionIcon,
				"nickname": data.data.sessionName,
				"recentVisitRecord": data.data.sessionContent.type == 'text'?data.data.sessionContent.content:'',
				"recentVisitTime": data.data.sessionTime,
				"sessionId": data.data.sessionId,
				"cleanup": new Date().valueOf(),
				"show": true,
				"num": 1,
				"news":[]
			};
			var param = {
				"type": "sendmsg",
				"data": {
					"personnelType": 0, //0:固定客服id
					"kid": _self.user_info.operator_id,
					"uid": data.data.uid,
					"rewire": false,
					"loading":true,
					"sessionTime": time,
					"sessionId": time,
					"sessionName": _self.user_info.nick_name,
					"sessionIcon": _self.user_info.icon, // TODO 登录存用户头像
					"sessionContent": {
						"content": _self.welcomeCopy, //0：文本    其它:url
						"type": "text", // | img | video | audio       //文字     图片     音频      视频
					}
				}
			}
			_self.hasNewUnreadMsg = true;
			if(_self.uid !== data.data.uid && _self.timer == null){
				_self.timer = setInterval(function() {
					document.title = document.title == '美信客服平台' ? '您有一条新信息' : '美信客服平台';
				}, 1000);
			}
			const msg_music = $(".msg_music");
			msg_music.get(0).play();
			if (len > 0) {
				currentList.forEach(function(item) {
					if (item.customerId !== data.data.uid) {
						count++
					} else if (item.customerId == data.data.uid) {
						item.cleanup = new Date().valueOf();
						if (!item.num) {
							item.num = 0;
						}
						if (data.type == 'newmsg') {
							if (typeof item.num == 'number') {
								item.num += 1;
							}
							if (item.num > 99) {
								item.num = '...'
							}
						}
						if(item.customerId !== _self.uid){
							item.show = true;
						}else{
							item.show = false;
							item.num = 0;
							clearInterval(_self.timer);
							_self.timer = null;
						}
					}
				})

				if (count == len) {
					currentList.push(obj);
					_self.send(param);
					_self.consultation_number += 1;
					count = 0;
					_self.setContactsListValue(data.data,false,true,true);
					_self.setContactsListValue(param.data, false, true,true);

				}else{
					_self.setContactsListValue(data.data,false,true,true);
				}
			} else {
				currentList.push(obj);
				_self.send(param);
				_self.consultation_number += 1;
				_self.setContactsListValue(data.data,false,true,true);
				_self.setContactsListValue(param.data, false, true,true);
			}
		},
		sendFace(item) { //发送表情
			this.inputPool += '[' + item + ']';
			this.status.faceStatus = false;
		},
		sendMsg(e) { //回车、contrl+回车、点击发送   进行消息发送控制
			var _self = this;
			var type = _self.status.fileType
			if (!_self.status.current) {
				actions.alert(store, {
					show: true,
					msg: '请选择当前联系人',
					type: 'info',
					delay: 5000
				})
				return false
			}
			if(e.keyCode == 13 || e.target.className == 'send btn btn-blue'){
				if(!_self.status.webscoketStatus){
					actions.alert(store, {
						show: true,
						msg: '您已经处于离线状态，无法发送消息，请上线后再次尝试。',
						type: 'info',
						delay: 5000
					})
					return false
				}
			}else if(e.ctrlKey && e.keyCode == 13){
				if(!_self.status.webscoketStatus){
					actions.alert(store, {
						show: true,
						msg: '您已经处于离线状态，无法发送消息，请上线后再次尝试。',
						type: 'info',
						delay: 5000
					})
					return false
				}
			}
			if (e.target.className == 'input_content' && _self.status.loadStatus) {
				_self.status.fileType = 1;
				if (_self.status.sendType) {
//					if (e.charCode == 13 || e.keyCode == 13) {
					if (e.keyCode == 13) {
						_self.senMsgC(type);
						e.preventDefault();
					}
				} else {
					if (e.ctrlKey && e.keyCode == 13) {
//					if (e.ctrlKey && e.which == 13) {
						_self.senMsgC(type);
						e.preventDefault();
					}


				}
			} else if (e.target.className == 'send btn btn-blue' && _self.status.loadStatus) {
				_self.senMsgC(type)
				e.preventDefault();

			}
		},
		senMsgC(type) {
			const _self = this;
			if (type == 1) {
				if (_self.inputPool.trim() !== '') {
					_self.sendMsgReq();
					this.inputPool = ''
				} else {
					_self.checkMessageEmpty()
				}
			} else if (type == 2) {
				//TODO   对图片发送进行处理
				_self.sendImage(type);
				this.inputPool = ''
			}
		},
		sendMsgReq(da) { //发送消息内容控制
			const _self = this;
			const time = new Date().valueOf()
			var data = da || {
				"type": "sendmsg",
				"data": {
					"personnelType": 0, //1:固定客服id
					"kid": _self.user_info.operator_id,
					"uid": _self.uid,
					"sessionTime": time,
					"sessionId": time,
					"sessionName": _self.user_info.nick_name,
					"rewire":false,
					"loading":true,
					"sessionContent": {
						"content": _self.inputPool, //0：文本    其它:url
						"type": "text", // | img | video | audio       //文字     图片     音频      视频
					}
				},
				callback: 'sendMsg'
			};
			_self.send(data)
			_self.setContactsListValue(data.data, false, true);
		},
		messageStatusChange(data){
			const _self = this;
			let dataAll = data.data;
			_self.currentList.forEach(function(item){
				if(dataAll.uid == item.customerId){
					item.news.forEach(function(news){
						if(dataAll.sessionId == news.sessionId){
							if(dataAll.messageStatus){
								news.rewire = false;
								news.loading = false;
								news.sessionId = dataAll.messageId
								console.log(news.sessionId)
							}else{
								news.rewire = true;
								news.loading = false;
								console.log(news.sessionId);
							}
						}
					})
				}
			})

		},
		checkMessageEmpty() { //查看消息是否为空
			const _self = this;
			_self.status.messageEmpty = true;
			setTimeout(function() {
				_self.status.messageEmpty = false;
			}, 1500)
		},
		sendMsgScrollTop() { //发送消息滚动条上滚
			var chat_scroll = document.getElementsByClassName('chat-scroll')[0];
			chat_scroll.scrollTop = chat_scroll.scrollHeight;
		},
		uploadImg(e) { //加载图片控制
			const files = e.target.files[0];
			const fr = new FileReader();
			const frn = new FileReader();
			const _self = this;
			fr.readAsDataURL(files);
			_self.imgInfo.name = files.name;
			fr.onload = function(e) {
				var binaryString = e.target.result;
				_self.imgInfo.binaryString = binaryString;
				_self.status.fileType = 2;
				var img_content = $('.img_content');
				img_content.append('<img style="width:70px" src="' + binaryString + '">');
				img_content.show(200);
				_self.textareaFocus();
			};
		},
		textareaFocus(){
			$('textarea').focus();
		},
		cleanImage(){
			const _self = this;
			$('.img_content').html('').hide();
			_self.imgInfo.binaryString = '';
			_self.status.fileType = 1;
			$('.photo')[0].value = '';
		},
		sendImage() { //发送图片
			const _self = this;
			const photo = $('.photo');
			const img_content = $('.img_content')
			const files = photo[0].files[0];
			let formData = new FormData();
			formData.append('file', files);
			this.$http({
				url: _self.user_info.uploadPicturesUrl,
//				 url: 'http://10.69.6.70:7080/venus-imhub-web/upload/uploadImg',
				method: 'post',
				body: formData,
				processData: false,
				contentType: false,
			}).then((res) => {
				if (!res.data.result) {
				// console.log(res.data);
					actions.alert(store, {
						show: true,
						msg: res.data.message,
						type: 'info',
						delay: 2500
					})
					_self.cleanImage();
					return
				}
				_self.cleanImage();
				const time = new Date().valueOf()
				var da = {
					"type": "sendmsg",
					"data": {
						"personnelType": 0, //1:固定客服id
						"kid": _self.user_info.operator_id,
						"uid": _self.uid,
						"sessionTime": time,
						"sessionId":time,
						"sessionName": _self.user_info.nick_name,
						"sessionContent": {
							"content": res.data.data.imgUrl, //0：文本    其它:url
							"type": "img", // | img | video | audio       //文字     图片     音频      视频
							"height": res.data.data.height,
							"width": res.data.data.width,
							"uploadTime": res.data.data.uploadTime,
						},
						"callback": 'sendMsg'
					}
				}
				_self.sendMsgReq(da);
			},(res) => {
				_self.cleanImage();
			})
		},
		offlineCurrentListTimingCtro(){
			const _self = this;
			_self.currentList.forEach(function(item) {
				const newTimeStamp = new Date().valueOf();
				item.cleanup = newTimeStamp;
			})
		},
		currentListTimingCleanup() { //定时清理当前联系人列表
			const _self = this;
			this.currentListTiming = setTimeout(function() {
				console.log('定时清理联系人')
				_self.currentListTimingCleanupCtro();
				_self.currentListTimingCleanup();
			}, 1000 * 10)
		},
		currentListTimingCleanupCtro() { //定时清理当前联系人列表控制
			const _self = this;
			const len = _self.currentList
			_self.currentList.forEach(function(item) {
				const newTimeStamp = new Date().valueOf();
				if ((newTimeStamp - item.cleanup) / 1000 > 60 * _self.pollingTime) {
//				if ((newTimeStamp - item.cleanup) / 1000 > 60 * 0.5) {
					_self.userOffline(item, newTimeStamp);
					_self.status.current = false;
					const len = _self.recentContactList.length;
				}
			})
		},
		userOffline(item, time) { //用户离线减员及发送
			var _self = this;
			var timeout = _self.timeoutCopy;
			var copy = timeout.replace('{m}',_self.pollingTime);
			const param = {
				"type": "sendmsg",
				"data": {
					"personnelType": 0, //0:固定客服id
					"kid": _self.user_info.operator_id,
					"uid": item.customerId,
					"rewire": false,
					"loading":false,
					"sessionTime": time,
					"sessionId": time,
					"sessionName": _self.user_info.nick_name,
					"sessionIcon": _self.user_info.icon, // TODO 登录存用户头像
					"sessionContent": {
						"content": copy||'您好！由于您超过' + _self.pollingTime + '分钟未发言我们将结束本次咨询。欢迎您再次咨询~~', //0：文本    其它:url
						"type": "text", // | img | video | audio       //文字     图片     音频      视频
					}
				}
			}
			_self.send({
				type: 'useroffline',
				data: {
					uids: [item.customerId],
					kid:_self.user_info.operator_id,
					date: time,
				},
				callback: 'useroffline'
			})
			_self.send(param);
			_self.setContactsListValue(param.data, false, true);
			_self.currentList.$remove(item);
			_self.consultation_number -= 1;
			if($('.new:visible').length <= 1 ){
				document.title = '美信客服平台';
				clearInterval(_self.timer);
				_self.timer = null;
			}
		},
		newsTimingCleanup(){ //定时清理未发送消息
			const _self = this;
			setTimeout(function() {
				console.log('定时清理未发送消息')
				_self.newsTimingCleanupCtro();
				_self.newsTimingCleanup();
			}, 1000 * 8)
		},
		newsTimingCleanupCtro(){ //定时清理未发送消息控制
			const _self = this;
			_self.currentList.forEach(function(item){
				item.news.forEach(function(news){
					if(news.loading){
						const newTimeStamp = new Date().valueOf();
						if((newTimeStamp - news.sessionId) / 1000 > 60 * 0.5){
							news.loading = false;
							news.rewire = true;
						}
					}
				})
			})
		},
		resend(item) { //重发消息控制
			const _self = this;
			item.rewire = false;
			item.loading = true;
			const par = {
				"type":"sendmsg",
				"data":item
			}
			_self.send(par);
		},
		contactPlay(event) { // 控制音频视频播放暂停
			const dom = event.currentTarget;
			const hasChildv = $(dom).find('video');
			const iconPlay = $(dom).find('.icon-play');
			$('video').stop();
//			$('video').pause();
			iconPlay.show();
			if (hasChildv.length > 0) {
				hasChildv[0].play();
				hasChildv[0].addEventListener("ended",function(){
					iconPlay.show();
				})
				iconPlay.hide();
			}

			const im_audio = $(dom).find('.im-audio');
			im_audio.removeClass('im-audio-new');

			const audioHref = $(dom).find('.audio-con').attr('href');
			if (audioHref) {
				fetch(audioHref)
					.then((response) => {
						return response.blob();
					})
					.then((blob) => {
						utils.readBlob(blob, (data) => {
							utils.playAmrArray(data);
						});
					});
			}
		},
		recentContactListDelete() { //删除最近联系人（附加当前联系人）
			const _self = this;
			_self.send({
				type: "deleteuser",
				data: {
					uids: [_self.uid],
					kid: _self.user_info.operator_id
				},
				callback: 'deleteuser'
			})
		},
		recentContactListDeleteChild(data) { //删除最近联系人控制器
			const _self = this;
			var uid = _self.uid;
			var current = _self.currentList
			var recentContactList = _self.recentContactList
			current.forEach(function(item) {
				if (item.customerId == uid) {
					const time = new Date().valueOf();
					const param = {
						"type": "sendmsg",
						"data": {
							"personnelType": 0, //0:固定客服id
							"kid": _self.user_info.operator_id,
							"uid": item.customerId,
							"sessionTime": time,
							"sessionId": 0,
							"sessionName": _self.user_info.nick_name,
							"sessionIcon": _self.user_info.icon, // TODO 登录存用户头像
							"sessionContent": {
								"content": _self.endCopy, //0：文本    其它:url
								"type": "text", // | img | video | audio       //文字     图片     音频      视频
							}
						}
					}
					_self.send({
						type: 'useroffline',
						data: {
							uids: [item.customerId],
							kid:_self.user_info.operator_id,
							date: time,
						},
						callback: 'useroffline'
					})
					_self.send(param);
					_self.setContactsListValue(param.data, false, true);
					current.$remove(item)
					_self.consultation_number -= 1
					_self.news_array = [];
					_self.uid = 0;
				};
			})
			if(current.length <= 0){
				_self.status.current = false;
				_self.uid = 0;
			}
			if (!_self.recentContactList) {
				_self.loadStatus == false;
			}
		},
		loadStatusControl(index, uid, type ,e) { //选择联系人控制处理
			const _self = this;
			const dom = e.currentTarget;
			let load = dom.dataset.load?dom.dataset.load:'';
			if (_self.uid !== uid) {
				_self.uid = uid;
				_self.pageIndex = 1;
			}
			$('.contacts_his').removeClass('active');
			$('.contacts_cur').removeClass('active');
			if (type == 1) {
				$('.contacts_his').eq(index).addClass('active');
				_self.status.current = false;
				if(load == 'true'){
					dom.dataset.load = 'false';
					_self.$http({
						url: 'message/getOperatorMessageList',
						method: 'get',
						params: {
							customerId: uid,
							sessionId:0,
							pageSize: 20
						}
					}).then((res) => {
						if (res.data.result !== true) {
							actions.alert(store, {
								show: true,
								msg: res.data.message,
								type: 'info',
								delay: 2500
							})
							return
						}
						if ("string" === typeof res) {
							res = JSON.parse(res);
						}
						const data = res.data.data
						const total = res.data.data.total
						if (total == 0) {
							actions.alert(store, {
								show: true,
								msg: '没有更多聊天记录',
								type: 'info',
								delay: 1500
							})
						}
						_self.setContactsListValue(data, true);
						_self.sessionIdC();
					},(res) => {
						_self.sessionIdC()
					})
				}
			} else if (type == 0) {
				$('.contacts_cur').eq(index).addClass('active');
				_self.status.current = true;
				_self.currentList.forEach(function(item) {
					if (item.customerId == uid) {
						item.show = false;
						item.num = 0;
						if(!item.news){
							item.news = [];
						}
					}
				})
				console.log($('.new:visible').length);
				if($('.new:visible').length <= 1 ){
					document.title = '美信客服平台';
					clearInterval(_self.timer);
					_self.timer = null;
				}
			}
			if(!_self.status.loadingStatus){
				_self.status.loadStatus = true;
			}
			_self.setContactsListValue();
		},
		tabAndload() {
			this.status.tabStatus = true;
			this.status.loadStatus = false;
		},
		setContactsListValue(data, front, newMsg,statusCurrent) { //联系人会话列表维护
			var contactList = [];
			var contact = '';
			const _self = this;
			if (_self.status.current || statusCurrent) {
				_self.currentList.forEach(function(item) {
					if (data && data.uid == item.customerId) {
						if (!item.news) {
							item.news = [];
						}
						if (front) {
							if (data.sessionList.length == 0) {
								actions.alert(store, {
									show: true,
									msg: '没有更多聊天记录',
									type: 'info',
									delay: 1500
								})
							}
							data.sessionList.forEach(function(em) {
								item.news.unshift(em)
							})
						} else {
							item.cleanup = new Date().valueOf();
							item.news.push(data);
							const type = data.sessionContent.type
							if(type == 'text'){
								item.recentVisitRecord = data.sessionContent.content
							}else if(type == 'img'){
								item.recentVisitRecord = '[图片]'
							}else if(type == 'video'){
								item.recentVisitRecord = '[视频]'
							}else if(type == 'audio'){
								item.recentVisitRecord = '[音频]'
							}else{
								item.recentVisitRecord = ''
							}
							setTimeout(function(){
								_self.sendMsgScrollTop();	
							}, 1);
						}
						contact = item
					} else if (_self.uid == item.customerId) {
						if (!item.news) {
							item.news = [];
						}
						contact = item
					}
				})

			} else {
				_self.recentContactList.forEach(function(item) {
					if (data && data.uid == item.customerId) {
						if (!item.news) {
							item.news = [];
						}
						if (front) {
							if (data.sessionList.length == 0) {
								actions.alert(store, {
									show: true,
									msg: '没有更多聊天记录',
									type: 'info',
									delay: 2500
								})
							}
							data.sessionList.forEach(function(em) {
								item.news.unshift(em)
							})

						} else {
							item.news.push(data)
						}
						contact = item
					} else if (_self.uid == item.customerId) {
						if (!item.news) {
							item.news = [];
						}
						contact = item
					}

				})
			}
			if (!newMsg || newMsg == 'undefined') {
				_self.news_array = contact.news;
			}
		},
		sessionIdC(){
			const _self = this;
			const arr = _self.news_array
			const len = arr.length;
			if(len > 0){
				_self.sessionIdR = arr[0].sessionId
			}else{
				_self.sessionIdR = 0
			}
		},
		//对话
		mousewheel(e) { //下拉加载会话
			const _self = this;
			const chat_scroll = document.getElementsByClassName('chat-scroll')[0];
			const scrollTopLen = chat_scroll.scrollTop;
			if (e.wheelDelta > 40 && scrollTopLen <= 0 && _self.uid) { //上
				if (_self.status.loadingStatus || new Date().valueOf() - _self.status.timeLoadhistory < 1000) {
					return
				}
				_self.sessionIdC()
				_self.status.timeLoadhistory = new Date().valueOf();
				_self.status.loadingStatus = true;
				_self.status.loadStatus = false;
				_self.status.noMore = false;
				setTimeout(function() {
					_self.$http({
						url: 'message/getOperatorMessageList',
						method: 'get',
						params: {
							customerId: _self.uid,
							sessionId:_self.sessionIdR,
//							pageIndex: _self.pageIndex,
							pageSize: 20
						}
					}).then((res) => {
						if (res.data.result !== true) {
							actions.alert(store, {
								show: true,
								msg: res.data.message,
								type: 'info',
								delay: 2500
							})
							_self.status.loadingStatus = false;
							_self.status.loadStatus = true;
							return
						}
						if ("string" === typeof res) {
							res = JSON.parse(res);
						}
						const data = res.data.data
						const total = res.data.data.total
						if (total == 0) {
							actions.alert(store, {
								show: true,
								msg: '没有更多聊天记录',
								type: 'info',
								delay: 1500
							})
						}
						_self.setContactsListValue(data, true);
						_self.status.loadingStatus = false;
						_self.status.loadStatus = true;
						_self.pageIndex += 1
						_self.sessionIdC();
					},(res) => {
						_self.status.loadingStatus = false;
						_self.status.loadStatus = true;
						_self.sessionIdC()
					})
				}, 1500)
			}
		},
		sendTypeChange(e) { //切换发送状态
			const _self = this;
			var name = e.target.className;
			if (name.indexOf('enter') > -1 && name.indexOf('c_enter') <= -1) {
				_self.status.sendType = true;
			} else if (name.indexOf('c_enter') > -1) {
				_self.status.sendType = false;
			}
			_self.status.sendMod = false
		},
		commonMsgAdd(e, desc) { //将常用语添加到输入框中
			const _self = this;
			_self.inputPool += desc
		}
	}
}
</script>

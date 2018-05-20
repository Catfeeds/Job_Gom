/**
 * Created by zhangmike on 2017/2/22.
 */

import GMP from 'GMP';
import {tpl} from './indexTpl';
import {textarea} from './textareaTpl';
import {items} from './itemTpl';
import {wordNumber} from './wordNumberTpl';
import fetch from 'io/fetch';
import toast from 'components/toast';
import 'util/GMPHelper';
import login from 'common/login.js';
import {loginFlag, page} from 'util/phpCommon';

function preInit(options = {}, config = {}) {
	let d = {
		'click .okBtn': 'ok',
		'click [data-id=talksome]': 'clickEvent',
		'click .cancelBtn': 'cancel'/*,
		'input [data-id=txtComment]': 'limitNumber',
		'focus [data-id=txtComment]': 'onFocus',
		'blur [data-id=txtComment]': 'onBlur'*/
	};

	if (!options.events) {
		options.events = d;
	} else {
		GMP.Util.defaults(options.events, d);
	}
	if (!options.data) {
		options.data = config;
	} else {
		GMP.Util.defaults(options.data, config);
	}
}

class Comment extends GMP.BaseClass {
	constructor(options) {
		preInit(options, {
			limitNum: 300,
			wordsNum: 0,
			inputCommentClass: 'inactive', // 输入区域，inactive不显示,active显示
			btnActiveClass: 'cmt-black disabled', // 【发送】button的默认样式
			limitNumClass: '', // 显示文字长度区域
			talkSomeClass: 'active', // 点击提示区域，active显示，inactive隐藏
			noMore: true, // 没有更多评论
			content: '', // 评论内容
			cursor: '',  //评论游标
			pageSize: 5, // 每页条数
			fetchUrl:'/comment/list', // 请求url
			sendUrl: '/comment/post', // 发送url
			listData: {}, // 评论数据
			sended: false, // 评论是否已发送，未发送:false，已发送:true
			error: false, // 请求是否出错
		   // imgStyle: '', // 头像图片样式，image的display:none->显示默认样式,display:block显示自己的头像
			clickPlaceholder: '立即登录，发表评论吧',
			user: {
				avatar: ''  // 用户头像
			}
		});
		super(options);
		this.trigger('_on_after', options);
		this.els = {
			textareaEle: this.$el.find('[data-id=txtComment]'),
			commentsListArea: this.$el.find('[data-id=comments]')
		}
		document.querySelector('[data-id=inputArea]').addEventListener('input', this.limitNumber.bind(this));
	}
	_create() { // 创建和渲染组件
		// let that = this;
		this._createWrapper();
		this.uiComment.append(tpl);
		this.renderInputArea();
		// this.renderWordNumber();
		this.on('change:wordsNum', this.renderWordNumber);
		this.on('change:limitNumClass', this.renderWordNumber);
		this.on('change:btnActiveClass', this.renderWordNumber);
		this.on('change:inputCommentClass', this.renderInputArea);
		this.on('change:talkSomeClass', this.renderInputArea);
		this.on('sendedEvent', this.renderCommentList);
	}
	_createWrapper() {
		this.uiComment = $('<div>')
			.appendTo(this._appendTo(this.el));
	}
	renderInputArea() {
		if (loginFlag) {
			this.data.user.avatar = page.avatar;
			this.data.clickPlaceholder = '我来说两句';
			//this.data.imgStyle = "display: block";
		} else {
			//this.data.imgStyle = "display: none;";
		}
		this.$el.find('[data-id=inputArea]').html(GMP.template(textarea)(this.data));
		this.renderWordNumber();
	}
	renderWordNumber() {
		this.$el.find('[data-id=wordNumberArea]').html(GMP.template(wordNumber)(this.data));
	}
	renderCommentList() {
		this.$el.find('[data-id=comments]').html(GMP.template(items)(this.data));
		this.data.sended = false;
	}
	onFocus() {}
	onBlur() {}
	clickEvent() {
		if (loginFlag) { // true，登录状态
			this.els.textareaEle.val('');
			this.data.inputCommentClass = 'active'; // 显示输入框
			this.data.wordsNum = 0; // 初始化字数为0
			this.data.btnActiveClass = 'disabled'; // 禁用发送按钮
			this.data.talkSomeClass = 'inactive';  // 隐藏提示区
			this.data.limitNumClass = 'cmt-black'; // 字数的颜色
		} else { //调用登录框
			login();
		}
	}
	openTextarea() {
		this.data.inputCommentClass = 'active';
		this.data.talkSomeClass = 'inactive';
		this.$el.find('[data-id=txtComment]').val(this.data.content);
	}
	cancel() {
		this.data.inputCommentClass = 'inactive';
		this.data.talkSomeClass = 'active';
	}
	ok() {
		let that = this;

		// 判断是否连网
		/*if (that.offLine()) {
			return;
		}*/

		if (this.data.btnActiveClass === 'active btn-primary') {
			this.data.cursor = '';
			this.fetchComments(this.data.topic_id).done(()=>{
				fetch.post(that.data.sendUrl, {
					data: {
						topic_id: that.data.topic_id,
						content: that.data.content
					},
					success(data) {
						if (data.code === 200001) { //会话失效
							login();
							return;
						}
						if (data.code === 200) {
							that.msg('评论发送成功');
							that.cancel();
							that.data.content = ''; //清空数据
							that.data.listData.list.unshift(data.data);
							that.data.sended = true;
							that.trigger('sendedEvent');
						} else {
							that.openTextarea();
							that.msg('评论发送失败');
						}
					},
					error(e, status) {
						if(status === 'timeout') {
							that.requestTimeout(status);
						} else {
							that.openTextarea();
							that.msg('评论发送失败');
						}
					}
				});
			});
			that.cancel();
			// window.location.hash = '#commentsList';
			$('html').scrollTop(this.els.commentsListArea.offset().top);
			this.sendCallback && this.sendCallBack();
		}
	}
	limitNumber(e) { // input事件
		var target = $(e.target);
		var textLength = target.val().trim().length;
		this.data.wordsNum = textLength;
		this.data.content = target.val().trim();
		if (textLength === 0) {
			this.data.btnActiveClass = 'disabled';
			this.data.limitNumClass = 'cmt-black';
			return;
		}
		if (textLength > this.data.limitNum){
			this.data.limitNumClass = 'cmt-red';
			this.data.btnActiveClass ='disabled';
			this.msg('评论字数超出限制');
			return false;
		}else {
		  this.data.btnActiveClass = 'active btn-primary';
		  this.data.limitNumClass = 'cmt-black';
		}
	}
	msg(msg) {
	   toast(msg, 500);
	}
	requestTimeout(status) {
		this.msg('网络异常，请稍后重试');
		// if(status === 'timeout') {
		// }
	}
	offLine() {
		if (!navigator.onLine) {
			this.msg('连接已断开，请检查网络设置');
			return true;
		} else {
			return false;
		}
	}
	fetchComments(topic_id = 1) {
		let that = this;
		// if (that.offLine()) {
		//	 let d = $.Deferred();
		//	 return d.resolve(false);
		// }
		return fetch.get(this.data.fetchUrl, {
			data: {
				topic_id : topic_id,
				size: this.data.pageSize,
				cursor: this.data.cursor
			},
			success(data) {
				if (data.code === 200) {
					that.data.error = false; //未发生请求错误
					that.data.listData = data.data /*[{name:1,comment:1, timestamp: '2017-2-25 16:50:00'}
					,{name:2,comment:2, timestamp: '2017-2-25 16:50:00'},{name:2,comment:2, timestamp: '2017-2-25 16:50:00'}]*/;
					if (that.data.listData.current_num === 0) { // 判断是否还有评论记录
						that.data.noMore = true;
						return;
					} else {
						that.data.noMore = false;
					}
					that.data.cursor = that.data.listData.cursor;
					if (!that.data.sended) { // 【发送评论】后，不在这里渲染评论列表
						let commentsHtml = GMP.template(items)(that.data);
						that.els.commentsListArea.append(commentsHtml);
					}
				} else {
					that.data.error = true;
					that.msg('获取评论失败');
				}
			},
			error(e,status)  {
				that.data.error = true;
				that.requestTimeout(status);
			}
		});
	}
}

export default Comment;
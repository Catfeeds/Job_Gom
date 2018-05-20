/**
 * [chatList]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
import encodeHTML from 'util/encodeHTML.js';
import {loginFlag, page} from 'util/phpCommon';

class ChatList {
	constructor(){
		this.container = $('[data-node=chat-list]');
		this.$box = $('[data-node=chat-wrap]');
		this.$editorBar = $('[data-node=editor-bar]');
		this.$noChat = $('[data-node="no-chat"]');
		this.hasNoChat = !!this.$noChat.length;
		this.cache = [];
		this.render();
		this.maxList = 100;
	}
	getData(data={}){
		data = this.adaptationData(data);
		this.cache.push(data);
	}
	removeNoChat(){
		if (this.hasNoChat) {
			this.$noChat.remove();
			this.hasNoChat = false;
		}
	}
	render(){
		let items = '';
		let list = this.cache.splice(0);
		if (list.length) {
			this.removeNoChat();

			list.map((v,k)=>{
				items += this.renderItem(v);
			});
			this.container.append(items);

			// 移除前面多余的li
			let $lis = this.container.find('li');
			if ($lis.length > this.maxList) {
				$lis.slice(0, $lis.length-this.maxList).remove();
			}

			let cHeight = this.$box.height() - this.$editorBar.height();
			let sHeight = this.container.height();
			if (sHeight > cHeight) {
				this.$box.scrollTop(sHeight-cHeight);
			}

			
		}
		clearTimeout(this.timer);
		this.timer = setTimeout(()=>{
			this.render();
		}, 30);
	}
	adaptationData(data){
		let contentInfo = data.content.content;
		let content = encodeHTML(contentInfo);
		return {
			userId: data.content.sender.user_id,
			avatar: data.content.sender.avatar,
			name: data.content.sender.nickname,
			content: content
		};
	}
	renderItem(data) {
		let selfCls = data.userId == page.userId ? 'live-self' : '';

		return `
			<li class="${selfCls}">
				<div class="live-user-head"><img src="${data.avatar}"></div>
				<div class="live-user-msg">
					<strong>${data.name}：</strong>
					<span>${data.content}</span>
				</div>
			</li>
		`;
	}
}

let instance;

export default () => {
	if(!instance){
		instance = new ChatList();
	}
	return instance;
};

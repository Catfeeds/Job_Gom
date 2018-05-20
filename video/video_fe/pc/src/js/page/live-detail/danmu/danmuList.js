import emojiData from './emojiData.js';
import encodeHTML from 'util/encodeHTML.js';
class DanmuList {
	constructor(){
		this.container = $('[data-node=msgList]');
		this.$box = this.container.parent('div');
	}
	render(data = {}){
		data = this.adaptationData(data);
		var item = this.renderItem(data);
		this.container.append(item);
		var cHeight = this.$box.height();
		var sHeight = this.container.height();
		if (sHeight > cHeight) {
			this.$box.scrollTop(sHeight-cHeight);
		}
	}
	adaptationData(data){
		let contentInfo = data.content.content;
		let reg = /\[([^\[]+)\]/g;
		let content = encodeHTML(contentInfo);
		content = content.replace(reg,function(match){
			if (typeof emojiData[match] === 'undefined') {
				return match;
			}else{
				return `<img src="${emojiData[match]}" alt="${match}" />`;
			}
		});
		return {
			name: data.content.sender.nickname,
			content: content
		};
	}
	renderItem(data) {
		return `<li>
			<a href="javascript:;">${data.name}：</a>
			<span>${data.content}</span>
		</li>`;
	}
}

var instance;

export default () => {
	if(!instance){
		instance = new DanmuList();
	}
	return instance;
};

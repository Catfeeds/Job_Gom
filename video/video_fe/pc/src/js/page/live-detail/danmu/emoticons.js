/**
 * [表情/颜文字]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
import EventEmitter from 'util/event-bus';
import emojiData from './emojiData.js';
import yantextData from './yantextData.js';

class Emoticons extends EventEmitter{
	constructor(){
		super();
		this.data = {emoji:emojiData, yantext:yantextData};
		this.$pop = null;
		this.curType = null;

		this.$danmuForm = $('[data-node=danmuform]');
		this.$emoticons = this.$danmuForm.find('[data-node=danmuemoticons]');
		this.$input = this.$danmuForm.find('[data-node=danmuContent]');
		this.initPop();
	}

	initPop(){
		let _this = this;
		this.$emoticons.on('click','a',function(){
			let type = $(this).data('type');
			_this.$pop || _this.createPopDom();
			_this.togglePop(type);
			
			_this.emit('emojiClick', null);

			return false;
		});
	}

	createPopDom(){
		this.$pop = $('<div/>').hide();
		this.$danmuForm.append(this.$pop);
		this.bindEvent();
	}

	togglePop(type){
		if (this.curType === type) {
			this.hidePop();
			return false;
		}

		this.curType = type;

		let popBoxCls = {emoji:'open-emoji', yantext:'open-emoji emoji-text'};
		let arrowIcon = '<em class="icon-san"></em>';
		let popContent = arrowIcon + this['_getHTML_'+type]();

		this.$pop.hide().removeClass().addClass(popBoxCls[type]).html(popContent).show();
	}

	bindEvent(type){
		let _this = this;
		let $pop = this.$pop;

		$pop.on('click','a',function(){
			let t = $(this).data('t');
			let info = $(this).data('info');
			let src = {
				emoji : _this.data[t][info],
				yantext: info
			};
			let data = {
				type: t,
				name: info,
				src: src[t]
			};

			_this.emit('selected',data);

			_this.hidePop();
			_this.$input.focus();
			return false;
		});

		$pop.on('click',function(){
			return false;
		});

		$(document).on('click',function(){
			_this.hidePop();
		});
	}

	hidePop(){
		this.$pop.hide();
		this.curType = null;
	}

	_getHTML_emoji(){
		let data = this.data.emoji;
		let tpl = '';
		for(let k in data){
			tpl += `<a data-t="emoji" data-info="${k}" title="${k}" href="javascript:;"><img alt="${k}" src="${data[k]}"/></a>`;
		}
		return tpl;
	}
	_getHTML_yantext(){
		let tpl = '';
		this.data.yantext.forEach((x) => {
			tpl += `<a data-t="yantext" data-info="${x}" href="javascript:;">${x}</a>`;
		});
		return tpl;
	}
}

let instance;

export default () => {
	if(!instance){
		instance = new Emoticons();
	}
	return instance;
};
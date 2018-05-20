/**
 * [编辑器]
 * @Author: Akesure
 * @Email:  xuyang-ds@gomeplus.com
 */
import React from 'react';
import httpConfig from 'io/http.config.js';
import { page } from 'util/phpCommon.js';
import fetch from 'io/fetch.js';

let uploadImgUrl = httpConfig[process.env.NODE_ENV]+'/api/upload/editorimage';

let updateCookiesUrl_lc = 'http://ss.atguat.com.cn/item/v1/cookie/atgregion/flag/public/ipWrite';
let updateCookiesUrl_pro = 'http://ss.gome.com.cn/item/v1/cookie/atgregion/flag/public/ipWrite';
let updateCookiesUrl = {
	lcdev: updateCookiesUrl_lc,
	lcvdev: updateCookiesUrl_lc,
	dev: updateCookiesUrl_lc,
	pre: updateCookiesUrl_lc,
	production: updateCookiesUrl_pro
}

// editor 静态资源路径

let editorSrc_dev = 'http://js.dev.meixincdn.com/m/editor/dist/js/conf/publishTopic.js';
let editorSrc_pre = 'http://js.dev.meixincdn.com/m/editor/dist/js/conf/publishTopic.js';
//let editorSrc_pre = 'http://js.dev.meixincdnx.com:1314/CDN8053/dist/js/conf/publishTopic.js';
let editorSrc_pro = 'http://js.meixincdn.com/m/editor/dist/js/conf/publishTopic.js';
let editorSrc = {
	lcdev: editorSrc_dev,
	lcvdev: editorSrc_dev,
	dev: editorSrc_dev,
	pre: editorSrc_pre,
	production: editorSrc_pro
}

class Editor extends React.Component{
	constructor(props){
		super(props);
		this.editorId = this.props.editorId || 'editor'+Math.random().toString().substr(2);
		this.editor = null;
		this.isInit = false;
		this.state = {
			err: '',
			blurType: false
		}
	}

	blur = () => {
		let val = this.editor.getContent();
		this.setState(() => {
			this.error(this.validate(val));
		});
	}

	// focus = () => {
	// 	let val = this.editor.getContent();
	// 	this.setState({blurType: this.editor.isFocus()}, () => {
	// 		this.error(this.validate(val));
	// 	});
	// }

	error(err) {
		this.setState(() => {
			return {err: err}
		});
	}

	// checkFocus = () => {
	// 	this.editor && this.editor.ready(() => {
	// 		this.editor.focus()
	// 	})
	// }

	validate = (val) => {
			// let len = val.length;
			// console.log(this.editor.getPlainTxt())
			let hasContent = this.editor.getPlainTxt();
		 	var newTxt = hasContent.replace('\n','');
			// console.log(newTxt.length);
			// console.log(len, this.state.blurType)
			let err = '';
			if(!newTxt.length) {
				err = '请添加正文内容';
			}
			return err;
	}

	instanceGomeEditor = (config)=>{
		let _this = this;
		this.editor = GomeEditor(config.editorId,{
			GlobalVal:{
				width: config.width,
				height: config.height,
				restoreData: config.content
			},
			Urls:{
				getCollectItem:'',
				cropImg:config.api + '/api/upload/textImage',
				rotateImg:config.api +'/api/upload/handleImg',
				//pasteImg:config.api + '/api/upload/textImage',
				getMoreItem:config.api +'/api/goods/search'

			}
		});

		this.editor.ready(() => {
			// this.editor.addListener('blur', this.blur, false);
			// this.editor.addListener('focus', this.blur, false);
			// this.editor.addListener('click', this.checkFocus, false);
			this.isInit = true;
		})
	}

	updateAddrCookies = ()=>{
		let script = {};
		let scriptId = 'pgc-gomeEditor-updateAddrCookies';
		let src = updateCookiesUrl[process.env.NODE_ENV] + '?callback=ipWrite&_='+(+new Date());

		let scriptDom = document.getElementById(scriptId);

		if (scriptDom) {
			scriptDom.src = src;
		}else{
			script  = document.createElement('script');
			script.src = src;
			script.id = scriptId;
			document.querySelector('body').appendChild(script);
			window.ipWrite = function(){};
		}

	}

	componentDidMount() {
		this.updateAddrCookies();
		let width = this.props.width;
		let height = this.props.height;
		let editorId = this.editorId;
		let content = this.props.content;
		let _this = this;
		let editorConfig = {
			api: httpConfig[process.env.NODE_ENV],
			editorId: editorId,
			width: width,
			height: height,
			content: content
		}

		if (typeof UE !== 'object') {
			let src = editorSrc[process.env.NODE_ENV];
			let script = document.createElement('script');
			script.onload = ()=>{
				this.instanceGomeEditor(editorConfig);
			}
			script.src = src;
			document.querySelector('body').appendChild(script);
		}else{
			this.instanceGomeEditor(editorConfig);
		}
	}


	componentWillUnmount() {
		if(this.isInit){
			this.editor && this.editor.pageDestroy();
			// this.editor.setContent('');
			this.isInit = false;
		}
	}

	render(){
		let err = this.state.err;
		let errClsName = 'error';
		if(err.length > 0){
				errClsName += ' show ';
		}
		return (
			<div className="form-outside">
				<div className="form-textarea-wrap"><textarea className="form-textarea" name="" id={this.editorId}></textarea></div>
				<div className="form-textarea-wrap"><p className={errClsName}>{err}</p></div>
			</div>
		)
	}
}

export default Editor;

/**
 * [编辑器]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
import React from 'react';
import httpConfig from 'io/http.config.js';
import { page } from 'util/phpCommon.js';
let uploadImgUrl = httpConfig[process.env.NODE_ENV]+'/api/upload/editorimage';


class Editor extends React.Component{
	constructor(props){
		super(props);
		this.editorId = this.props.editorId || 'editor'+Math.random().toString().substr(2);
	}
	
	componentDidMount() {
		window.$GLOBAL_CONFIG = {};
		$GLOBAL_CONFIG['js_domain'] = 'http://js.pre.meixincdn.com';
		$GLOBAL_CONFIG['jspath'] = 'http://js.pre.meixincdn.com/m/vpgc/dist/editor'
		$GLOBAL_CONFIG['csspath'] = 'http://js.pre.meixincdn.com/m/vpgc/dist/editor'
		$GLOBAL_CONFIG['imgpath'] = 'http://js.pre.meixincdn.com/m/vpgc/dist/editor'
		$GLOBAL_CONFIG['versionData'] = "123";
		$GLOBAL_CONFIG['trId'] = "123";

		let src = page.jsPath+'dist/editor/js/conf/publishTopic.js';
		let width = this.props.width;
		let height = this.props.height;
		let editorId = this.editorId;

		if (typeof GomeEditor === 'undefined') {
			let script = document.createElement('script');
			script.onload = ()=>{
				console.log($);
				GomeEditor(editorId, {
			        GlobalVal:{
			            //imgpath:'aaa.com'
			        },
			        Buttons:{
			            //使用视频
			            video:{
			                use:false
			            }
			        },
			        Components:{
			            //商品类型 1: 默认带搜索   2: tab
			            goodsType:1
			        },
			        Urls:{
			            //查询视频地址
			            //getVideoPath:'/aaa.json'
			            //不带我的收藏 请将 这个地址置空
			            getCollectItem:'',				
						myMshop:''

			        }
			    });

			}
			script.src = src;
			document.querySelector('body').appendChild(script);
		}else{
			//
		}
	}


	componentWillUnmount() {
		//
	}

	render(){
		return (
			<textarea className="txts" name="" id={this.editorId}></textarea>
		)
	}
}

export default Editor;
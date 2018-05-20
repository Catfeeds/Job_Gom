var io = require("io/url");
var envPath;
if( !window.$EDITOR ){
		window.$EDITOR={};
	}
function useEnvPath(){
	switch(process.env.NODE_ENV.env){
		case 'mx-dev':
			envPath={
				jsDomain:'http://js.dev.meixincdnx.com:1314/',
				jspath:'http://js.dev.meixincdnx.com:1314/CDN8053/dist',
				csspath:'http://js.dev.meixincdnx.com:1314/CDN8053/dist',
				imgpath:'http://js.dev.meixincdnx.com:1314/CDN8053/dist'
			}
			break;
		case 'mx-pre':
			envPath = {
				jsDomain:'http://js.dev.meixincdn.com/',
				jspath:'http://js.dev.meixincdn.com/m/editor/dist',
				csspath:'http://js.dev.meixincdn.com/m/editor/dist',
				imgpath:'http://js.dev.meixincdn.com/m/editor/dist'
			}
			break;
		default:
			envPath = {
				jsDomain:'http://js.dev.meixincdn.com/',
				jspath:'http://js.dev.meixincdn.com/m/editor/dist',
				csspath:'http://js.dev.meixincdn.com/m/editor/dist',
				imgpath:'http://js.dev.meixincdn.com/m/editor/dist'
			}
			break;
	}
	

}

useEnvPath();
var options = {
	//全局变量
	GlobalVal:{
		//话题来源 0 新页面 1 编辑话题 2 草稿
		from:0,
		//js域名
		jsDomain: envPath.jsDomain,
		//js路径
		jspath:envPath.jspath,
		//css路径
		csspath:envPath.csspath,
		imgpath:envPath.imgpath,
		redirect:'',
		//商品、图片、视频限制数量
		goodsLimitNUm: 9,
		imgLimitNUm: 20,		
		videoLimitNUm: 1,
		//版本号，更新css，js用
		versionData: 1,
		//话题id
		tid: '',
		//门店账户
		trId:'',
		width:738,
		height:400,
		//恢复数据到编辑器
		restoreData:''
		
	},
	//菜单功能按钮
	Buttons:{
		//商品
		goods:{
			use:true,
			position:0
		},
		//图片
		picture:{
			use:true,
			position:0
		},
		//视频
		video:{
			use:false,
			position:0
		},
		//表情
		emoji:{
			use:true,
			position:0
		},
		//h1,h2
		font:{
			use:true,
			position:0
		},
		//超链接
		links:{
			use:true,
			position:0
		}
	},
	//开启功能组件
	Components:{
		//使用商品类型	1：单标签搜索  2：我的美店+精品推荐
		goodsType:1
	},
	//bs请求地址
	Urls:io.urls
}

//兼容PC端变量
function mergePcGlobal(){
	var temp = {};
	if(window.$GLOBAL_CONFIG && $GLOBAL_CONFIG.length){
		for(var i in options.GlobalVal){
			temp[i] = $GLOBAL_CONFIG[i];
		}
	}
	
	return temp;
}

$.extend(true,options,mergePcGlobal());

module.exports = options;
	
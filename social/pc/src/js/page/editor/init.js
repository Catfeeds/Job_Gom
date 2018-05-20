var banKeyArr = require("./shortcutKey").banKey;	
var callbackKeyArr = require("./shortcutKey").callbackKey;

var ue = UE.getEditor('editor',{
		//工具栏
		toolbars:[[]],	
		//iframe 内置样式
		iframeCssUrl:'http://js.dev.meixincdn.com:8017/src/css/module/circle/releasetopic1.css',
		//纯文本粘贴
		pasteplain:true,
		//点击选区 清空原始值
		//autoClearinitialContent:true
		//禁止div转换成p标签
		allowDivTransToP: false,
		//禁止缩放图片
		imageScaleEnabled:false,
		//禁止使用的快捷键  目前为加粗，下划线，斜体 ,还原
		banKey:banKeyArr,
		//匹配快捷按键回调
		callbackKey:callbackKeyArr,
		//禁止非同域上传图片
		catchRemoteImageEnable:true
	}); 

module.exports = ue;
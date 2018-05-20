//加载默认参数
var defaultOptions = require('./defaultConfig.js');
//var loadExtraConfig = require('./loadExtraConfig.js');

var loadEditor = function(){
	require('editor/ueditor/ueditor.config');
	require('editor/ueditor/ueditor.all');
	require('editor/ueditor/lang/zh-cn/zh-cn.js');
	//复写部分脚本
	require('editor/rewrite');
	require('editor/ban');
	require('utils/indexOf');
}


var  loadPlugins = function(){
	var usePlugin = require('editor/plugin');
    usePlugin($EDITOR.Buttons);
}


//配置参数   加载编辑器   加载插件  加载用户定义的白名单等配置


var providOpt = function(o){
	var opts = require('editor/loadConfig/userEditorConfig');
    opts.initialFrameWidth = o.width;
    opts.initialFrameHeight = o.height;
    return opts;
}

var loadConfig = function(id,opts){
	var _def = $.extend(true,{},defaultOptions);

	//配置用户参数,写入全局变量$EDITOR;
	$.extend(true,_def,opts)
	$.extend(true,$EDITOR,_def);
	//加载编辑器
	loadEditor();

	//加载插件
	loadPlugins($EDITOR);
	//
	//loadExtraConfig(id,defaultOptions.GlobalVal);
	$EDITOR.GlobalVal.editorId = id;

	$('#'+ id).addClass('rich-text-editor');

	$('body').addClass('opg-editor'); 

	return providOpt($EDITOR.GlobalVal);
}


module.exports = loadConfig;

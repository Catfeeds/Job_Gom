ban  		禁止使用的功能
conf 		默认的用户配置参数
css			用于生成iframestyle。css    editor。css
init		初始化编辑器的参数、引入editor主框架
plugin		功能按钮插件
rewrite		覆盖原编辑器的功能
ueditor		editor主框架
utils		公用代码
config.js 	编辑器的默认配置，注意区别 conf中 用户配置参数



链接地址配置参数   键值对   值为默认变量

{
	//配置全局变量
	GlobalVal：{

		//部分ajax校验需要增加校验头,非必填,例如：
			headerSet:'xml-request-x',
		//恢复数据
			restoreData: $EDITOR.GlobalVal.restoreData || '',
		//js域名
			jsDomain:'http://js.dev.meixincdn.com',
		//js
			jspath:'http://js.dev.meixincdn.com:1314/CDN8180/dist'
		//css
			csspath:'http://js.dev.meixincdn.com:1314/CDN8180/dist'
		//img
			imgpath:'http://js.dev.meixincdn.com:1314/CDN8180/dist'
		//讀取草稿和編輯話題出错跳转地址
			redirect：xxx
		//商品限制
			goodsLimitNUm:$EDITOR.goodsLimitNUm || 9,	
		//图片限制
			channel:$EDITOR.imgLimitNUm || 20,
		//视频限制
			videoLimitNUm:$EDITOR.videoLimitNUm || 1,
		//版本号 更新js和圖片使用
			versionData:$EDITOR.versionData || 1,
		//话题id
			tid: $EDITOR.tid
	},


	//配置功能按钮（目前只开放了插入视频）
	Buttons:{
		video:{
			use:false,
			position:0	//默认 不用写
		}
	},

	//开启功能组件
	Components:{
		//使用商品类型	1：单标签搜索  2：我的美店+精品推荐, 默认为1
			goodsType:1
	},

	//配置请求地址：
	Urls:{
		//搜索商品
			getMoreItem:'/ajax/topic/search_item'				'?pagenum  pagesize word '	get
		//我的收藏
			getCollectItem:	'ajax/topic/my_item_collect'       	'?page pagesize '	get

		//我的美店
			myMshop:	'/ajax/Mshop/index'						'?pageNum ',	get
		//好货推荐
			hotGoods: '/ajax/Mshop/addItem'						'?type ',		get

		//图片上传
   			cropImg:'/ajax/crop/crop_img'						post	

   		//上传图片最大值
   			 topicuploadMax: '/ajax/topic/putMaxNum',			maxNum 	qrcodeId		post	

   			 
   		//获取二维码
   			getUploadQrCode:'/ajax/topic/topicQrcode'			?pageId maxNum qrcodeId	get
   		
   		//检测二维码返回结果	
   			topListenImg:'/ajax/topic/checkinfo'				'code'	'groupkey'		post
   		
   		//视频	 
   			getVideoPath:'/ajax/meihao/getVideoInfo'			'video_id'		


   		//读取普通草稿、话题编辑
   			restoreTopicData:	'/expert/publishedDetail'			'tid'	get

	}

}



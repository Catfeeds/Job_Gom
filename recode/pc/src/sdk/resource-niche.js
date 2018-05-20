/*
 * resource-niche.js
 * (c) 2017 zhaodonghong
 */
(function(window, undefined){
	//var version = 0; //占位符，构建工具会自动更改版本号
	var utils = {
		loadCss: function(options){
			var url = options.url;
		    var callback = typeof options.callback == "function" ? options.callback : function(){};
		    var id = options.id;
		    var node = document.createElement("link");
		    var supportOnload = "onload" in node;
		    var isOldWebKit = +navigator.userAgent.replace(/.*(?:AppleWebKit|AndroidWebKit)\/?(\d+).*/i, "$1") < 536; // webkit旧内核做特殊处理
		    var protectNum = 300000; // 阈值10分钟，一秒钟执行pollCss 500次
		    node.rel = "stylesheet";
		    node.type = "text/css";
		    node.href = url;
		    if( typeof id !== "undefined" ){
		        node.id = id;
		    }
		    document.getElementsByTagName("head")[0].appendChild(node);
		    // for Old WebKit and Old Firefox
		    if (isOldWebKit || !supportOnload) {
		        // Begin after node insertion
		        setTimeout(function() {
		            utils.pollCss(node, callback, 0);
		        }, 1);
		        return;
		    }
		    if(supportOnload){
		        node.onload = function(){
		        	utils.onload(node,callback);
		        }
		        node.onerror = function() {
		            // 加载失败(404)
		            utils.onload(node, callback);
		        }
		    }else{
		        node.onreadystatechange = function() {
		            if (/loaded|complete/.test(node.readyState)) {
		            	utils.onload(node, callback);
		            }
		        }
		    }

		},
		onload: function(node, callback){
			// 确保只跑一次下载操作
	        node.onload = node.onerror = node.onreadystatechange = null;

	        // 清空node引用，在低版本IE，不清除会造成内存泄露
	        node = null;
	        callback();
		},
		pollCss: function(node, callback, step){
	        var sheet = node.sheet,
	            isLoaded;

	        step += 1;

	        // 保护，大于10分钟，则不再轮询
	        if(step > protectNum){
	            isLoaded = true;

	            // 清空node引用
	            node = null;

	            callback();
	            return;
	        }

	        if(isOldWebKit){
	            // for WebKit < 536
	            if(sheet){
	                isLoaded = true;
	            }
	        }else if(sheet){
	            // for Firefox < 9.0
	            try{
	                if(sheet.cssRules){
	                    isLoaded = true;
	                }
	            }catch(ex){
	                // 火狐特殊版本，通过特定值获知是否下载成功
	                // The value of `ex.name` is changed from "NS_ERROR_DOM_SECURITY_ERR"
	                // to "SecurityError" since Firefox 13.0. But Firefox is less than 9.0
	                // in here, So it is ok to just rely on "NS_ERROR_DOM_SECURITY_ERR"
	                if(ex.name === "NS_ERROR_DOM_SECURITY_ERR"){
	                    isLoaded = true;
	                }
	            }
	        }

	        setTimeout(function() {
	            if(isLoaded){
	                // 延迟20ms是为了给下载的样式留够渲染的时间
	                callback();
	            }else{
	                utils.pollCss(node, callback, step);
	            }
	        }, 20);
	    },
	    transformStr3: function(str){
		    var re=/_(\w)/g;
		    return str.replace(re,function ($0,$1){
		        return $1.toUpperCase();
		    });
		},
		getCookie: function(name){
			var cookies = document.cookie.split(';');
			var cookie = {};
			var cookieItem;
			for (var i = cookies.length - 1; i >= 0; i--) {
				cookieItem = cookies[i].split('=');
				cookie[cookieItem[0]] = cookieItem[1];
			}

			return decodeURIComponent(cookie[name]);
		}

	}


	function resource(){
		var hostMaps = {
			'//js.dev.meixincdn.com:1314/CDN8053/':'pre',
			'//js.meixincdn.com/m/pc/':'online'
		};
		var gomeLocal =  typeof gomeplusCdn !== 'undefined' ? gomeplusCdn : '//js.meixincdn.com/m/pc/';
		this.wrapQueue = [];
		this.loadedSum = 0;
		this.currentHostType = hostMaps[gomeLocal];
		this.token = decodeURIComponent(utils.getCookie('mx_pc_uid_token'));
		switch(this.currentHostType){

			case 'pre':
				this.apiLink = '//api-pluspc.atguat.com.cn/widget/index';
				this.link = gomeLocal + 'dist/';
			break;

			default:
		 	  	this.apiLink = '//api-pluspc.gome.com.cn/widget/index';
				this.link = gomeLocal + 'dist/';
		}

	}
	resource.prototype = {
		constructor: resource,
		loaded: function(options){
			var _this = this;
	    	if( options.loadSum === options.loadedNum ){
	    		var oBox = $('[data-template="'+ options.templateName +'"]');
	    		var callback = window.resourceNiche[utils.transformStr3(options.templateName)];
	    		if(options.type === 'html' && options.html !== ''){
    				oBox[0].innerHTML = options.html;
					options.wrap.trigger(options.templateName);
					var $imgs = oBox.find('img');
					//console.log(oImgs)

					$imgs.error(function(){
                       	$(this).attr('src', '//app.gomein.net.cn/images/grey.gif');
					});

	    		}
	    		_this.loadedSum ++;
	    		oBox.attr('data-loaded', '1').attr('data-loading', '0');
	    		setTimeout(function(){
					oBox.css('height', 'auto');
		    		options.loadSum === 3 && callback && callback();
		    	}, 200);
		    }
	    },
	   	isInScreen: function( selector ){
			var nSt = $(window).scrollTop();
			var nWinHeight = $(window).height();
			var wrapOffTop = selector.offset().top;
			return wrapOffTop - nSt -50 < nWinHeight;
	   	},
		getContent: function( wrap ){
			var html = '';
			var _this = this;
			var loadSum = 2;
			var loadedNum = 0;
			var templateName = wrap.attr('data-template');
			var tplName;
			var path;
			var csslink;
			var jslink;
			var dataName;
			var element;
			var type;
			wrap.attr('data-push', '1');
			wrap.attr('data-loading', '1');
			$.ajax({
		        url: _this.apiLink,
		        type: 'GET',
		        dataType: 'jsonp',
		        data: {
					"tplname": templateName
				},
		        success: function(result){
		        	if( result.code === 200 ){
		        		type = result.data.type;
			        	tplName = utils.transformStr3(result.data.tplName);
			        	path = 'widget/' + tplName + '/css/' + tplName + '.css?version=' + result.data.version;
			        	csslink = _this.link.replace('js.','css.') + path;
			        	jslink = _this.link + path.replace(/css/g,'js');
						loadedNum ++;
		        		if( result.data.type === 'html' ){
							html = result.data.data;
		        		}else{
		        			dataName = tplName + 'Data';
		        			element = tplName + 'Element';
		        			window[dataName] = result;
		        			window[element] = wrap;

		        		}
						//load js
						if( result.data.isScript !== 0 ){
							loadSum = 3;
							$.getScript(jslink, function(){
							  	loadedNum ++;
							  	_this.loaded( {
							  		loadSum: loadSum,
							  		loadedNum: loadedNum,
							  		wrap: wrap,
							  		templateName: templateName,
							  		html: html,
							  		type: type
							  	});
							});
						}
			        	//load css
						utils.loadCss({
							url: csslink,
							callback: function(){
								loadedNum ++;
							  	_this.loaded( {
							  		loadSum: loadSum,
							  		loadedNum: loadedNum,
							  		wrap: wrap,
							  		templateName: templateName,
							  		html: html,
							  		type: type
							  	});
							}
						});
						/**/
		        	}
		        },
		        error:function(msg){

		        }
		    });
		},
		autoAppend: function(selector){
			var $warps = selector ? $(selector) : $('.pluspc_template');
			var wrap;
			for (var i = 0, len = $warps.length; i < len; i++) {
				wrap = $warps.eq(i);
				if(wrap.attr('data-push') !== '1'){
					//推进池子
					this.wrapQueue.push(wrap);
				}
				if(wrap.attr('data-loaded') !== '1' && wrap.attr('data-loading') !== '1' && this.isInScreen(wrap) ){
					this.getContent(wrap);
				}
			}
		},
		render: function( selector ){
			this.autoAppend(selector);
		},
		scroll: function(){
			var _this = this;
			$(window).on('scroll', function(){
				if( _this.loadedSum !== _this.wrapQueue.length ){
					for (var i = _this.wrapQueue.length - 1; i >= 0; i--) {
						$wrap = _this.wrapQueue[i];
						if( _this.isInScreen($wrap) && $wrap.attr('data-loaded') !== '1'  && $wrap.attr('data-loading') !== '1' ){
							_this.getContent( $wrap );
						}
					}
				}

			});
		},
		init: function(){

			this.autoAppend();
			this.scroll();
		}
	}
	$(function(){
		window.resourceNiche = new resource();
		resourceNiche.init();
	});
})(window);

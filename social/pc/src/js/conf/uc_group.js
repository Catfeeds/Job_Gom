webpackJsonp([41],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var main = __webpack_require__(319);
	// 发送统计数据用
	var buriedPoint = __webpack_require__(56);
	buriedPoint.setPageData('uc_circle');

	main.init();

/***/ },

/***/ 210:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG) {'use strict';

	/**
	 * showPic  - tmod helpers
	 * 社交部分显示默认图片
	 * @author Zhengchun Fu
	 */
	var tmod = __webpack_require__(26);
	var showPic = function showPic(pic, defaultpic) {
		if (pic === '') {
			return $_CONFIG.imgpath + '/images/public/' + defaultpic;
		} else {
			return pic;
		}
	};

	module.exports = function () {
		tmod.helper('showPic', showPic);
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },

/***/ 319:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';

	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var alert = __webpack_require__(37);
	var tip = __webpack_require__(36);

	__webpack_require__(210)();

	var tplContent = __webpack_require__(320);
	var no_created = __webpack_require__(321);
	var no_joined = __webpack_require__(322);

	var init = function init() {
		var $content = $('[data-node=content]'),
		    $createdCircle = $content.find('[data-node=createdCircle]'),
		    $joinedCircle = $content.find('[data-node=joinedCircle]'),

		// $createdTitle = $content.find('[data-node=createdTitle]'),
		$loading = $content.find('[data-node=loading]'),

		// $loadMore = $content.find('[data-node=loadMore]'),
		$noMore = $content.find('[data-node=noMore]');

		var showNoData = function showNoData(type) {
			if (type === "joined") {
				$content.append(no_joined({
					url_domain: $_CONFIG.group_domain
				}));
			} else if (type === "created") {
				$content.prepend(no_created({
					url_domain: $_CONFIG.group_domain
				}));
			}
		};

		var contentInit = function contentInit(obj, type) {
			if (obj.length === 0) {
				$loading.hide();
				showNoData(type);
			} else {
				$loading.hide();
				obj.group_domain = $_CONFIG.group_domain;
				if (type === "created") {
					$createdCircle.append(tplContent({
						contents: obj
					})).show();
				} else if (type === "joined") {
					$joinedCircle.append(tplContent({
						contents: obj
					})).show();
				}
			}
		};

		var createActive = function createActive(data) {
			if (data.length >= 10) {
				alert(tip.createCircle.upperLimit);
			} else {
				fetch.get(url.get('canCreate'), {
					async: false
				}).done(function (json /*, textStatus, jqXHR*/) {
					if (json.success) {
						if (json.check == 1) {
							window.open($_CONFIG.group_domain + '/index/create');
						} else {
							alert(tip.createCircle.upperLimit);
						}
					} else {
						alert("数据请求失败 请稍后尝试");
					}
				}).fail(function () /*jqXHR, textStatus, errorThrown*/{
					alert("数据请求失败 请稍后尝试");
				});
			}
		};

		fetch.get(url.get('getJoinedCircle')).done(function (json /*, textStatus, jqXHR*/) {
			if (json.success) {
				var created = json.imaster;
				var joined = json.imember;
				contentInit(created, 'created');
				contentInit(joined, 'joined');
				$('[data-node=btnCreate]').on('click', function () {
					createActive(created);
				});
				$('[data-node=user-name]').on('click', function (event) {
					window.open($_CONFIG.group_domain + 'circle/' + $(event.target).data('id') + '.html');
				});
			} else {
				alert("数据请求失败 请稍后尝试");
				$loading.hide();
				$noMore.show();
			}
		}).fail(function () /*jqXHR, textStatus, errorThrown*/{
			alert("数据请求失败 请稍后尝试");
		});
	};

	module.exports = {
		init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ },

/***/ 320:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/page/uc_group/main/content',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,contents=$data.contents,content=$data.content,index=$data.index,$escape=$utils.$escape,$out='';$each(contents,function(content,index){
	$out+=' <div class="circle-list" data-id="';
	$out+=$escape(content.id);
	$out+='"> <div class="mg-negative"> <div class="user-head"><a href="';
	$out+=$escape(contents.group_domain);
	$out+='circle/';
	$out+=$escape(content.id);
	$out+='.html" target="_blank"><img src="';
	$out+=$escape($helpers. showPic(content.icon , 'circle-default.png'));
	$out+='" alt=""></a></div> <h3 class="user-name" data-node="user-name" data-id ="';
	$out+=$escape(content.id);
	$out+='" >';
	$out+=$escape(content.name);
	$out+='</h3> <div class="user-top-info"> <ul class="clearfix"> <li> <strong>';
	$out+=$escape(content.memberQuantity);
	$out+='</strong> <p>成员</p> </li> <li> <strong>';
	$out+=$escape(content.topicQuantity);
	$out+='</strong> <p>话题</p> </li> </ul> </div> </div> </div> ';
	});
	return new String($out);
	});

/***/ },

/***/ 321:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/page/uc_group/main/no_created','<div data-node="noCreated" class="circle-index-list clearfix"> <div class="usercircle-title"> <h2>我创建的圈子</h2><a href="javascript:;" data-node="btnCreate" class="right">创建圈子</a> </div> <div class="no-topic"> <div class="txt clearfix"><em class="iconn-52"></em> <p> <span>您还没创建圈子，赶快 <a href="javascript:;" data-node="btnCreate">创建圈子 </a>吧！</span></p> </div> </div> </div>');

/***/ },

/***/ 322:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/page/uc_group/main/no_joined',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,url_domain=$data.url_domain,$out='';$out+='<div data-node="noJoined" class="circle-index-list clearfix"> <div class="usercircle-title"> <h2>我加入的圈子</h2> </div> <div class="no-topic"> <div class="txt clearfix"><em class="iconn-52"></em> <p> <span>您还没有加入任何的圈子，赶快 <a href="';
	$out+=$escape(url_domain);
	$out+='index" target="_blank">加入圈子 </a>吧！</span></p> </div> </div> </div>';
	return new String($out);
	});

/***/ }

});
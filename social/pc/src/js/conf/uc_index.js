webpackJsonp([42],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';

	/**
	 * 个人中心首页推荐商品
	 * @author QiaoLi
	 */

	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var goodListTpl = __webpack_require__(323);
	// 发送统计数据用
	var buriedPoint = __webpack_require__(56);
	buriedPoint.setPageData('ucenter');

	var $changeGoods = $('[data-action=changeGoods]');
	var $goodList = $('[data-node=recommendGoodList]');

	var hide = 'hide';
	var page = 2;
	var curIndex = 0;
	var finished = false;

	//加载中
	var load = function load() {
	    if (page == 6) {
	        curIndex = ++curIndex > 4 ? 0 : curIndex;
	        $goodList.children('ul:not(:eq(' + curIndex + '))').addClass(hide);
	        $goodList.children('ul').eq(curIndex).removeClass(hide);
	        return;
	    } else {
	        fetch.post(url.get('getRecommendGoods'), {
	            data: {
	                pageNum: page
	            }
	        }).done(function (data) {
	            if (data.success === true) {
	                page++;
	                curIndex = ++curIndex > 4 ? 0 : curIndex;
	                var loadData = data.data || [];
	                loadData.mallDomain = $_CONFIG.mall_domain;
	                loadData.page = data.page;
	                if (loadData.length == 0) {
	                    finished = true;
	                } else {
	                    var html = goodListTpl({
	                        list: loadData
	                    });
	                    $goodList.append(html);
	                    $goodList.children('ul:not(:eq(' + curIndex + '))').addClass(hide);
	                }
	            }
	        }).fail(function () {
	            alert('加载失败');
	        });
	    }
	};
	var init = function init() {
	    $changeGoods.on('click', load);
	};
	init();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ },

/***/ 323:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/page/uc_index/goodList',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,list=$data.list,$each=$utils.$each,value=$data.value,$index=$data.$index,$out='';$out+='<ul class="clearfix" data-node="dataList" page="';
	$out+=$escape(list.page);
	$out+='"> ';
	$each(list,function(value,$index){
	$out+=' <li id="';
	$out+=$escape(value.id);
	$out+='"> <div class="mg-negative"> <a href="';
	$out+=$escape(list.mallDomain);
	$out+='item/';
	$out+=$escape(value.shopId);
	$out+='-';
	$out+=$escape(value.id);
	$out+='.html" target="_blank"><img src="';
	$out+=$escape(value.mainImage);
	$out+='" onerror="imgError(this)"></a> <div class="btn-box"> <a href="';
	$out+=$escape(list.mallDomain);
	$out+='item/';
	$out+=$escape(value.shopId);
	$out+='-';
	$out+=$escape(value.id);
	$out+='.html" target="_blank" class="pc-btn pc-btnh40">立即购买</a> <a href="';
	$out+=$escape(list.mallDomain);
	$out+='item/';
	$out+=$escape(value.shopId);
	$out+='-';
	$out+=$escape(value.id);
	$out+='.html" target="_blank" class="pc-btn pc-btnh40 pc-bj-fc8753">加入购物车</a> </div> <div class="text"> <a href="';
	$out+=$escape(list.mallDomain);
	$out+='item/';
	$out+=$escape(value.shopId);
	$out+='-';
	$out+=$escape(value.id);
	$out+='.html" target="_blank"> ￥<span>';
	$out+=$escape(value.salePrice);
	$out+='</span> <p>';
	$out+=$escape(value.name);
	$out+='</p> </a> </div> </div> </li> ';
	});
	$out+=' </ul>';
	return new String($out);
	});

/***/ }

});
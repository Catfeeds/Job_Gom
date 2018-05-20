/* css */
import 'css/page/sublist/index.scss';

import toast from 'components/toast.js';
import Scrollload from 'Scrollload';
import fetch from 'io/fetch';
import listTpl from './listTpl.js';
import noLoginTpl from './noLoginTpl.js';
import Like from 'components/action/like.js';
import Collect from 'components/action/collect.js';
import backTop from 'plugin/backTop.js';
import SearchPage from 'widgets/search/search';
import Subscribe from 'components/action/subscribe.js';
//   订阅
new Subscribe({
	delegate:'#subList'
});
//搜索
$('[data-id="search"]').click(()=>{
	new SearchPage();
});
//滚动加载
var isLogin = $CONFIG.isLogin ==1 ?true :false;
var loadMore = $CONFIG.loadMore ==1 ?true :false;
var hasData = $CONFIG.hasData ==1 ?true :false; 
var $subList =isLogin ? $("#listCon") :$("#subList");
$subList.attr("data-currentPage",1);


var pageSize = 10;
var load = function() {
	var page = parseInt($subList.attr("data-currentPage"))+1;
	$subList.attr("data-currentPage",page);
	if(isLogin){
		return fetch.get('/userVideoList.json?page='+page+"&size="+pageSize);
	}else{
		return fetch.get('/publisherList.json?page='+page+"&size="+pageSize);
	}
	
};


// test();
if(hasData && isLogin){

		new Scrollload($subList[0], function(sl) {
			var scrollLoadError = function(){
				sl.throwException();
				toast('网络请求异常');
			};

			if(loadMore){
				load().done(function(json){
					if(json && json.code === 200 && json.data){
						var subList = json.data.multipleImageText;
						let html = listTpl(subList);
						$subList.find(".listConDiv").append($(html));
						if(subList.length < pageSize){
							loadMore = false;
						}
						sl.unLock();
					} else {
						scrollLoadError();
					}
				}).fail(function(){
					scrollLoadError();
				});

			} else {
				sl.noData();
			}

		},{
			isInitLock: false,
			loadingHtml: '<div class="top-line no-more"><p>加载中...</p></div>',
			noDataHtml: '<div class="top-line no-more"><span class="line-left"></span><p>没有更多了</p><span class="line-right"></span></div>',
			exceptionHtml: '<div class="top-line no-more"><p>出错啦请重试</p></div>'
		});

}



if(!isLogin){

	new Scrollload($subList[0], function(sl) {
		var scrollLoadError = function(){
			sl.throwException();
			toast('网络请求异常');
		};

		if(loadMore) {
			load().done(function(json){
				if(json && json.code === 200 && json.data){
					var subList = json.data.publisher;
					if(subList && subList.length >0){
						let html = noLoginTpl(subList);
						$subList.find("ul.subDetails").append($(html));
						if(subList.length < pageSize){
							loadMore = false;
						}
						sl.unLock();

					}else{
						loadMore = false;
					}
					
				} else {
					scrollLoadError();
				}
			}).fail(function(){
				scrollLoadError();
			});

		} else {
			sl.noData();
		}

	},{
		isInitLock: false,
		loadingHtml: '<div class="top-line no-more"><p>加载中...</p></div>',
		noDataHtml: '<div class="top-line no-more"><span class="line-left"></span><p>没有更多了</p><span class="line-right"></span></div>',
		exceptionHtml: '<div class="top-line no-more"><p>出错啦请重试</p></div>'
	});

}

//   返回顶部
new backTop();

new Like({
	delegate:'body'
});

new Collect({
	delegate:'body',
	selector: '[data-action=collect]'
});

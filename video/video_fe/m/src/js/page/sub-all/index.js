/* css */
import 'css/page/sub-all/index.scss';
/* fastclick */
import 'fastclick.js';
import toast from 'components/toast.js';
import Scrollload from 'Scrollload';
import GMP from 'GMP';
import fetch from 'io/fetch';
import listTpl from './indexTpl.js';
import Subscribe from 'components/action/subscribe.js';
import backTop from 'plugin/backTop.js';
import SearchPage from 'widgets/search/search';

//搜索
$('[data-id="search"]').click(()=>{
	new SearchPage();
});

//滚动加载
var $subList = $("#subList");
$subList.attr("data-currentPage",1);
var loadMore = $CONFIG.loadMore == 1 ? true: false;
var pageSize = 10;
var load = function() {
	var page = parseInt($subList.attr("data-currentPage"))+1;
	$subList.attr("data-currentPage",page);
	return fetch.get('/publisherList.json?page='+page+"&size="+pageSize);
};

new Scrollload($subList[0], function(sl) {
	var scrollLoadError = function(){
		sl.throwException();
		toast('网络请求异常');
	};

	if(loadMore) {

		load().done(function(json){
			if(json && json.code === 200){
				var subList = json.data.publisher;
				if(subList && subList.length >0){
					let html = listTpl(subList);
					$subList.find("ul.subDetails").append($(html));
					if(subList.length < pageSize){
						loadMore = false;
					}
					sl.unLock();

				}else{
					loadMore = false;
					sl.noData();
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


//   订阅
new Subscribe({
	delegate:'#subList',
	// 订阅
	afterDoSuccess : function(data){
		var id = data.id;
		var code = data.res.code;
		var $this = $("[data-subscribeid='"+id+"']");
		var $numSpan = $this.parent().find(".msgNav-fans").children("span");
		var num = data.res.data.total;
		if(code===200){
			$this.addClass('active');
			$this.data('status', 1);
			$numSpan.text(num);
			toast('订阅成功');
		}
	},
	// 取消订阅
	afterUndoSuccess : function(data){
		var id = data.id;
		var code = data.res.code;
		var $this = $("[data-subscribeid='"+id+"']");
		var $numSpan = $this.parent().find(".msgNav-fans").children("span");
		var num = data.res.data.total;
		if(code===200){
			$this.removeClass('active');
			$this.data('status', 0);
			$numSpan.text(num);
			toast('已取消订阅');
		}
	}
});

//   返回顶部
new backTop();
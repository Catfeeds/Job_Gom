/* css */
import 'css/page/live/index.scss';
/* fastclick */
import 'fastclick.js';

import GMP from 'GMP';
import fetch from 'io/fetch';

import toast from 'components/toast';
import updateToast from 'components/updateToast';
import PullToRefresh from 'components/pullToRefresh';
import Like from 'components/action/like.js';
import Collect from 'components/action/collect.js';
import formatDate from 'util/formatDate';
import Scrollload from 'Scrollload';
import backTop from 'plugin/backTop.js';
import timeLenFormat from 'util/timeLenFormat';
import fromNow from 'util/fromNow';
import defaultHead from 'util/defaultHead'; // 默认图片

import tpl from './indexTpl.js';
import last from './last.js'; // 上次看到这里
import 'widgets/head/index';
import historyBack from 'util/historyback';

// import 'widgets/openapp/index.js';

historyBack();

//import 'widgets/openapp/index.js';
let PAGE = 2;  // 第一页由php输出,从第二页开始加载
let SIZE = 10; // 每页加载的数量

let total = 0;   // 视频总数
let current = 10; // 当前已经加载的视频数量

var render = function(list) {
    var html = '';
    var fn = GMP.template(tpl);
    for (var i = 0, len = list.length; i < len; i++) {
        var v = list[i];
//      v.flag = v.video_type == 0 ? '直播' : timeLenFormat(v.length);
        if(v.live_status == 1){
        	v.live_status ='<i class="live"></i><span>直播</span>';
        }else if(v.live_status == 2){
        	v.live_status ='<span>未开始</span>';
        }else if(v.live_status == 3){
        	v.live_status ='<span>回看</span>';
        }else{
        	v.live_status ='<span>点播</span>';
        }
//      v.update_time = fromNow(v.update_time);

		v.start_time = formatDate(v.start_time * 1000, 'yyyy-MM-dd hh:mm');
        if(v.publisher.icon == ""){
        	v.publisher.icon = defaultHead();
        }
        // v.category = 1;
//      if(v.category === 1){
//          v.category = '<em class="icon-16"></em>';
//      } else {
//          v.category = '';
//      }
        html += fn(v);
    }
    return html;
};

var load = function() {
    return fetch.get('/liveRecommend.json',{
    	data: {
            page: PAGE,
            size: SIZE
        }
    });
};

var showToast = function(len){
    updateToast(len);
};

var loadMore = $CONFIG.loadMore;
// loadMore = true;
var $videoList = $('#liveList');
var $lastEle = last();
var errMsg = '网络请求异常';


// 下拉加载
var ptr = new PullToRefresh($videoList, {
	text: {
        pending: '下拉刷新'
    }
});


ptr.on('refreshing', function() {
	
	//console.log(ptr.refreshLayer);
	
	location.reload();
//  if (!loadMore) {
//      ptr.noMoreData();
//      ptr.loadDone();
//      return;
//  }
//  load().done(function(json) {
//  	if(json && json.code === 200){
//  		var list = json.data.liveVideoRecommend;
//  		var len = list.length;
//  		if(len){
//  			var html = render(list.reverse());
//  			ptr.refreshLayer.after($lastEle).after(html);
//  			//showToast(len);
//  		} else {
//  			ptr.noMoreData();
//  			loadMore = false;
//  		}
//		} else {
//			toast(errMsg);
//		}
//  }).fail(function(){
//  	toast(errMsg);
//  }).always(function(){
//  	ptr.loadDone();
//  });
});

// 滚动加载
var scrollLoad = new Scrollload($videoList[0], function(sl) {
	var scrollLoadError = function(){
		sl.throwException();
    	toast('网络请求异常');
	};
    if (loadMore) {
    	load().done(function(json) {
    		if(json && json.code === 200){
    			var list = json.data.liveVideoRecommend;
				var html = render(list);
				$(sl.bottomDom).before(html);

				PAGE++;
				current += list.length;
				if(current < json.data.total){
					loadMore = true;
				}else{
					loadMore = false;
					sl.noData();
					$(".no-more").show();
				}
				// showToast(len);  滚动加载不需要toast提示。
				sl.unLock();
    		} else {
    			scrollLoadError();
    		}
	    }).fail(function(){
	    	scrollLoadError();
	    });
	    
    } else {
        sl.noData();
        $(".no-more").hide();
    }
}, {
    isInitLock: false,
    loadingHtml: '<div class="top-line no-more"><p>加载中...</p></div>',
    noDataHtml: '<div class="top-line no-more"><span class="line-left"></span><p>没有更多了</p><span class="line-right"></span></div>',
    exceptionHtml: '<div class="top-line no-more" data-node="errorNode"><p>出错啦，点我重试</p></div>'
});

$(scrollLoad.container).on('click', '[data-node=errorNode]', function(){
    scrollLoad.solveException();
});


new backTop();
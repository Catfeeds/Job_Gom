/* css */
import 'css/page/index/index.scss';

import GMP from 'GMP';
import fetch from 'io/fetch';
import toast from 'components/toast';
import timeLen from 'util/msToDuration';
import indexTpl from './indexTpl.js';
import PullToRefresh from 'components/pullToRefresh';
import Scrollload from 'Scrollload';
import backTop from 'plugin/backTop.js';
import callAppShare from 'widgets/share/callAppShare';
import GomeJSBridge from 'common/GomeBridge-new.js';
 //import 'util/vconsole.min.js';
var curPage = 3;
var pageSize = 5;
var loadMore = $CONFIG.loadMore;
var $videoList = $('#videoList');

function timeLenFormat(dur) {
	var d = parseInt(dur.day);
	var h = parseInt(dur.hour);
	if (d > 0) {
		return dur.day + ':' + dur.hour + ':' + dur.min + ':' + dur.sec;
	} else if (h > 0) {
		return dur.hour + ':' + dur.min + ':' + dur.sec;
	} else {
		return dur.min + ':' + dur.sec;
	}
}

var ptr = new PullToRefresh($('#videoList'));
ptr.on('refreshing', function() {
	Refresh(function(){
		ptr.loadDone();
	});
});

function loadVideos(method, cb, sl) {
	if (!loadMore) {
		ptr.noMoreData();
		cb && cb();
		return false;
	}
	if (typeof sl === 'undefined') {
		sl = {
			unLock:function(){},
			noData:function(){},
			throwException:function(){}
		};
	}

	fetch.get('/channel/index', {
		data: {
			page: curPage,
			size: pageSize
		},
		success: function(data) {
			cb && cb();
			let list = data.data.homeRecommend;
			if (data.code !== 200) {
				toast(data.message);
				cb && cb();
				return false;
			}
			if (list.length < pageSize) {
				sl.noData();
				loadMore = false;
			}

			let newList = list.map(function(v) {
				v.flag = v.video_type == 0 ? '直播' : timeLenFormat(timeLen(v.length));
				return v;
			});

			if (method === 'prepend') {
				newList.reverse();
			}

			let html = GMP.template(indexTpl)({list: newList});
			$videoList.find('ul')[method]($(html));
			curPage++;
			sl.unLock();
		},
		error: function(data) {
			sl.throwException();
			toast('网络请求异常');
			cb && cb();
		}
	});
}

function Refresh(cb) {
	loadVideos('prepend', cb);
}

function Load(sl){
	loadVideos('append',null,sl);
}

new Scrollload($('#videoList')[0], function(sl) {
	if (loadMore) {
		Load(sl);
	}else{
		sl.noData();
	}
}, {
	isInitLock: false,
	loadingHtml: '<div class="infinite-scroll" ><span>加载中...</span></div>',
	noDataHtml: '<div class="infinite-scroll" ><span>没有更多了</span></div>',
	exceptionHtml: '<div class="infinite-scroll"><span>出错啦请重试</span></div>'
});

callAppShare();

new backTop();


new GMP({
	el: '#videoList',
	events: {
		'click a': 'onOpenDetail'
	},
	onOpenDetail(e) {
	    if (GomeJSBridge && GomeJSBridge.pushWindow) {
            e.preventDefault();
            let href = e.currentTarget.href;
            try {
                setTimeout(()=>{
                    GomeJSBridge.pushWindow(null,null,href);
                },0);
            }catch(e) {
                throw new Error('error:'+e);
            }
        }
	}
})

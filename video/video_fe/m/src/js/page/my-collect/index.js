/* css */
import 'css/page/my-collect/index.scss';
/* fastclick */
import 'fastclick.js';
import fetch from 'io/fetch';
import Scrollload from 'Scrollload';
import backTop from 'plugin/backTop.js';
import toast from 'components/toast';
import listTpl from './listTpl.js';
import historyBack from 'util/historyback';
import delCollect from 'widgets/mycollect/delCollect';

historyBack();

var cursor = $CONFIG.cursor;
var pageSize = 10;
var loadMore = $CONFIG.loadMore;
// var loadMore = true;
var $videoList = $('[data-node="mainList"]');
var $empty = $('[data-node="empty"]');

function Load(sl){
	if (!loadMore) {
		return false;
	}

	fetch.get('/collectList.json', {
		data: {
			cursor: cursor,
			size: pageSize,
			order: 'desc'
		},
		success: function(data) {
			cursor = data.data.cursor;
			if (!data.data.collect_data) {
				data.data.collect_data = [];
			}
			let list = data.data.collect_data;
			let itemLen = $videoList.find('a.item').length;
			let code = data.code;
			if (code == 200001) {
				location.href = $CONFIG.loginUrl;
				return false;
			}
			if (code != 200) {
				sl.throwException();
				toast(data.message);
				return false;
			}
			if (list.length < pageSize) {
				if (itemLen < pageSize) {
					sl._options.noDataHtml = '';
				}
				sl.noData();
				loadMore = false;
			}

			let html = listTpl(list);
			$videoList.find('[data-node="listContent"]').append($(html));
			sl.unLock();
		},
		error: function(data) {
			sl.throwException();
			toast('网络请求异常');
		}
	});
}

if (!$empty.length) {
	var scrollLoad = new Scrollload($videoList[0], function(sl) {
		if (loadMore) {
			Load(sl);
		}else{
			sl._options.noDataHtml = '';
			sl.noData();
		}
	}, {
		isInitLock: false,
		loadingHtml: '<div class="top-line no-more"><p>加载中...</p></div>',
		noDataHtml: '<div class="top-line no-more"><span class="line-left"></span><p>没有更多了</p><span class="line-right"></span></div>',
		exceptionHtml: '<div class="top-line no-more" data-node="errorNode"><p>出错啦，点我重试</p></div>'
	});

	$videoList.on('click','[data-node="errorNode"]',function(){
		scrollLoad.solveException();
	});

	$videoList.on('click','[data-action="delOffline"]', function(e){
		var $item = $(this).parents('[data-node="item"]');
		var id = $item.data('id');
		delCollect(id,function(data){
			if (data.code != 200) {
				toast(data.message);
			}else{
				toast('删除成功',{
					onHide: function(){
						location.reload();
					}
				});
				
			}
		});
		return false;
	});
	
	new backTop();

}

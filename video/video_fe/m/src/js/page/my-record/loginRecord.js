/**
 * [登录状态下，观看记录]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */

import fetch from 'io/fetch';
import Scrollload from 'Scrollload';
import backTop from 'plugin/backTop.js';
import toast from 'components/toast';
import listTpl from './loginRecordTpl.js';
import {loginFlag, page} from 'util/phpCommon';
import delRecords from 'widgets/myrecord/delRecords';


var cursor = page.cursor;
var pageSize = 10;
var loadMore = page.loadMore;
var $videoList = $('[data-node="mainList"]');
var $empty = $('[data-node="empty"]');

function Load(sl){
	if (!loadMore) {
		return false;
	}

	fetch.get('/loginHistoryList.json', {
		data: {
			cursor: cursor,
			size: pageSize,
			order: 'desc'
		},
		success: function(data) {
			cursor = data.data.cursor;
			let list = data.data.today.concat(data.data.before);
			let code = data.code;
			let itemLen = 0;
			if (code == 200001) {
				location.href = page.loginUrl;
				return false;
			}
			if (code != 200) {
				sl.throwException();
				toast(data.message);
				return false;
			}

			let html = listTpl(list);
			$videoList.find('[data-node="listContent"]').append($(html));
			
			if (list.length < pageSize) {
				itemLen = $videoList.find('a.item').length;
				if (itemLen < pageSize) {
					sl._options.noDataHtml = '';
				}
				sl.noData();
				loadMore = false;
			}

			sl.unLock();
		},
		error: function(data) {
			sl.throwException();
			toast('网络请求异常');
		}
	});
}

function init(){

	new backTop();

	$videoList.on('click','[data-action="delOffline"]', function(e){
		var $item = $(this).parents('[data-node="item"]');
		var id = $item.data('id');
		delRecords(id,function(data){
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
	
	if ($empty.length || !loadMore) {
		return false;
	}
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

	
}

export default init;
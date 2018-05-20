/**
 * [未登录状态下观看记录]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */

import fetch from 'io/fetch';
import Scrollload from 'Scrollload';
import backTop from 'plugin/backTop.js';
import toast from 'components/toast';
import listTpl from './unloginRecordTpl.js';
import getLocalRecord from 'util/getLocalRecord';
import delRecords from 'widgets/myrecord/delRecords';

var emptyPage = `<div class="no-data no-gk" data-node="empty"><div class="img"></div><p>暂无观看记录</p></div>`;

var curPage = 0;
var pageSize = 10;
var loadMore = true;
var $videoList = $('[data-node="mainList"]');

let localRecord = getLocalRecord();
let defaultRecord = paging(localRecord, pageSize);

function paging(data, limit){
	var arr = data.slice(0);
	var newArr = [];
	var len = arr.length;
	var pages = Math.ceil(len / limit);
	for(let i=0; i<pages; i++){
		newArr.push(arr.splice(0,limit));
	}
	return newArr;
}

function Load(sl){
	if (!loadMore) {
		return false;
	}



	fetch.post('/unLoginHistoryList.json', {
		data: {
			video_seg: defaultRecord[curPage].join(',')
		},
		success: function(data) {
			let list = data.data.today.concat(data.data.before);
			let code = data.code;
			let itemLen = 0;

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

			curPage++;
			sl.unLock();

			if (defaultRecord.length - 1 < curPage) {
				sl.noData();
				loadMore = false;
			}
		},
		error: function(data) {
			sl.throwException();
			toast('网络请求异常');
		}
	});
}

function init(){
	if (!localRecord.length) {
		$('[data-node="listContent"]').html(emptyPage);
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

	new backTop();

	$videoList.on('click','[data-action="delOffline"]', function(){
		var $item = $(this).parents('[data-node="item"]');
		var id = $item.data('id');
		var localStorageKey = 'gm_m_v_record_log';
		var record = localStorage.getItem(localStorageKey);
		record = JSON.parse(record);
		delete record[id];
		localStorage.setItem(localStorageKey, JSON.stringify(record));
		$item.remove();
		toast('删除成功');
		return false;
	});
}

export default init;
import Scrollload from 'Scrollload'

import toast from 'components/toast.js';
import fetch from 'io/fetch.js';
import liveStatus from 'util/liveStatus';
import fromNow from 'util/fromNow.js';
import formatDate from 'util/formatDate.js';
import timeLenFormat from 'util/timeLenFormat.js';
import defaultHead from 'util/defaultHead'; // 默认图片

const listConUl = $('#listCon .list');

let TAGID = $CONFIG['tagId'];
let PAGE = 2;
if (TAGID) {
    let noDataHtml = '';
    let loadingHtml = '';
    let isInitLock = true;
    if ($CONFIG['loadMore']) {
  
        noDataHtml = '<div class="top-line no-more"><span class="line-left"></span><p>没有更多了</p><span class="line-right"></span></div>';
        loadingHtml = '<div class="top-line no-more"><p>加载中...</p></div>';
        isInitLock = false;
    }
    new Scrollload($('#listCon')[0], function(sl) {
        Load(function(err, nomore) {
            if (err) return sl.throwException();
            if (nomore) return sl.noData();
            sl.unLock();
        });
    }, {
        isInitLock: isInitLock,
        loadingHtml: loadingHtml,
        noDataHtml: noDataHtml,
        exceptionHtml: '<div class="top-line no-more"><p>出错啦请重试</p></div>'
    })
}

const tpl = `<div class="list-item">
	<a href="/sub/{{headId}}.html">
		<div class="list-head">
			<div class="fl">
				<img src="{{icon}}"/><span>{{name}}</span>
			</div>
			<div class="fr">
				{{timeFlag}}
			</div>
		</div>
	</a>
	<a href="/v/{{id}}.html">
		<div class="item-img">
			<img src="{{image}}" alt="">
			{{typeFlag}}
		</div>
		<h2 class="item-title">{{title}}</h2>
	</a>
	<div class="item-icon clearfix">
		<div class="fl" data-action="collect" data-collectid="{{id}}" data-status="{{isPraise}}">
			{{typePraise}}
		</div>
		<div class="fl" data-action="like" data-likeid="{{id}}" data-status="{{isCollect}}">
			{{typeCollect}}
		</div>
	</div>
</div>`;


function Load(cb) {
    fetchData({
        id: TAGID,
        page: PAGE
    }, (err, res) => {
        // 异常
        if (err) return cb(err);
        // 无更多数据
        if (res.data.tagToContents.length === 0) return cb(undefined, true);
        let tplResult = '';
        res.data.tagToContents.forEach(item => {
        	
            let timeFlag = fromNow(item.update_time); // update_time 是 s
            let cur = tpl;
            let typeFlag = '';
            let typePraise = '';
            let typeCollect = '';
            let icon = '';
            if (item.video_id) {
                if (item.live_status === '4') {
                    // 直播页
                    typeFlag = `<span class="item-flag">${timeLenFormat(item.length)}</span>`; // length 是 ms
                } else {
                    timeFlag = '';
                    var flagType = liveStatus(item.live_status);
                    // 这期不做 视频详情页，target 虚拟的
                    var startTime = formatDate(parseInt(item.start_time)*1000, 'yyyy-MM-dd hh:mm');
                    typeFlag = `<div class="live-flag "> ${flagType} </div>
                                <span class="item-flag">${startTime}</span>`; // length 是 ms
                }
            }
            if (item.is_praise === '0') {
                typePraise = '<em class="icon-7 active"></em>'
            } else {
                typePraise = `<em class="icon-7"></em>`;
            }
            if (item.is_collect === '0') {
                typeCollect = '<em class="icon-3 active"></em><span>${item.collect_num}</span>'
            } else {
                typeCollect = `<em class="icon-3"></em><span data-node="count">${item.collect_num}</span>`;
            }
            if(item.publisher.icon == ""){
            	icon = defaultHead
            }else{
            	icon = item.publisher.icon
            }
            console.log(item.publisher.icon);
            tplResult += '\n' + cur
                .replace(/{{headId}}/g, item.publisher.id)
                .replace(/{{id}}/g, item.id)
                .replace('{{name}}', item.publisher.name)
                .replace('{{icon}}', icon)
                .replace('{{image}}', item.image)
                .replace('{{tagName}}', item.tagName)
                .replace('{{typeFlag}}', typeFlag)
                .replace('{{typePraise}}', typePraise)
                .replace('{{typeCollect}}', typeCollect)
                .replace('{{isPraise}}', item.is_praise)
                .replace('{{isCollect}}', item.is_collect)
                .replace('{{title}}', item.title)
                .replace('{{subhead}}', item.subhead)
                .replace('{{timeFlag}}', timeFlag);
        });
        updateHTML(tplResult);
        PAGE++;
        cb();
    });
}

function fetchData(options, cb) {
    return fetch.get('/tag.json', {
        data: {
            id: options.id,
            page: options.page || 1,
            size: 10 // 默认 10 条
        },
        success(res) {
            cb(undefined, res);
        },
        error(err) {
            cb(err);
        }
    });
}

function updateHTML(tpl) {
    listConUl.append(tpl);
}

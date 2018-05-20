import Scrollload from 'Scrollload'

import toast from 'components/toast.js';
import fetch from 'io/fetch.js';

import fromNow from 'util/fromNow.js';
import msToDuration from 'util/msToDuration.js';

const listConUl = $('#listCon ul');

let TAGID = $CONFIG['tagId'];
let PAGE = 2;

if (TAGID) {
    let noDataHtml = '';
    let loadingHtml = '';
    let isInitLock = true;
    if ($CONFIG['loadMore']) {
        noDataHtml = '<div class="infinite-scroll"><span>没有更多了</span></div>';
        loadingHtml = '<div class="infinite-scroll" ><span>加载中...</span></div>';
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
        exceptionHtml: '<div class="infinite-scroll"><span>出错啦请重试</span></div>'
    })
}

const tpl = `<li>
    <a href="${$CONFIG['domain']}channel/theme/{{id}}.html">
        <div class="left">
            <img src="{{image}}">
            {{typeFlag}}
        </div>
        <div class="right">
            <h2>{{title}}</h2>
            <span class="time">{{timeFlag}}</span>
        </div>
    </a>
</li>`;

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
            if (item.video_id) {
                if (item.video_type === '0') {
                    // 直播页
                    typeFlag = '<span>直播</span>'
                } else {
                    // 这期不做 视频详情页，target 虚拟的
                    typeFlag = `<span>${formatMsToDuration(msToDuration(item.length))}</span>`; // length 是 ms
                }
            }
            tplResult += '\n' + cur
                .replace('{{id}}', item.id)
                .replace('{{image}}', item.image)
                .replace('{{typeFlag}}', typeFlag)
                .replace('{{title}}', item.title)
                .replace('{{timeFlag}}', timeFlag);
        });
        updateHTML(tplResult);
        PAGE++;
        cb();
    });
}

function fetchData(options, cb) {
    return fetch.get('/tag/index', {
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

function formatMsToDuration(obj) {
    let result = '';
    if (obj.day !== '00') {
        return `${obj.day}:${obj.hour}:${obj.min}:${obj.sec}`;
    } else if (obj.hour !== '00') {
        return `${obj.hour}:${obj.min}:${obj.sec}`;
    } else {
        return `${obj.min}:${obj.sec}`;
    }
}

function updateHTML(tpl) {
    listConUl.append(tpl);
}

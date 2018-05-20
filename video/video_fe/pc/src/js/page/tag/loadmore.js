//import Scrollload from 'Scrollload'
import fetch from 'io/fetch.js';
import fromNow from 'util/fromNow.js';
import {page} from 'util/phpCommon';

const listConUl = $('#listCon ul');

let TAGID = page['tagId'];
let PAGE = 1;

//if (TAGID) {
//  let noDataHtml = '<div class="infinite-scroll"><span>没有更多了</span></div>';
//  let loadingHtml = '<div class="infinite-scroll" ><span>加载中...</span></div>';
//  new Scrollload($('#listCon')[0], function(sl) {
//      Load(function(err, nomore) {
//      	console.log();
//          if (err) return sl.throwException();
//          if (nomore) return sl.noData();
//          sl.unLock();
//      });
//  }, {
//      loadingHtml: loadingHtml,
//      noDataHtml: noDataHtml,
//      exceptionHtml: '<div class="infinite-scroll"><span>出错啦请刷新重试</span></div>'
//  })
//}


const tpl = `<li>
	<div class="img">
		<a href="${page['domain-data']}/v/{{id}}.html">
			<img src="{{image}}"/>
			<em class="icon-13"></em>
			<span class="time">{{typeFlag}}</span>
			<span class="offline">已下线</span>
		</a>
	</div>
	<a href="${page['domain-data']}/v/{{id}}.html" class="list-title">{{title}}</a>
	<p class="desc">{{subhead}}</p>
	<a href="${page['domain-data']}/v/{{userId}}.html" class="list-name">
		<img src="{{icon}}" />
		<span>{{name}}</span>
	</a>
</li>
`;

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
        	console.log(item);
            let timeFlag = fromNow(item.update_time); // update_time 是 s
            let cur = tpl;
            let typeFlag = '';
            if (item.video_id) {
                if (item.video_type === '0') {
                    // 直播页
                    typeFlag = '直播'
                } else {
                    typeFlag = `${item.length}`; // length 是 ms
                }
            }
            tplResult += '\n' + cur
                .replace(/{{id}}/mg, item.id)
                .replace('{{image}}', item.image)
                .replace('{{icon}}', item.publisher.icon)
                .replace('{{name}}', item.publisher.name)
                .replace('{{num}}', item.publisher.subscribe_num)
                .replace('{{userId}}', item.publisher.id)
                .replace('{{typeFlag}}', typeFlag)
                .replace('{{title}}', item.title)
                .replace('{{subhead}}', item.subhead)
                .replace('{{updateTime}}', fromNow(item.update_time))
                .replace('{{timeFlag}}', timeFlag);
        });
        updateHTML(tplResult);
        PAGE++;
        cb();
    });
}

function fetchData(options, cb) {
    return fetch.get('/json/tag.json', {
        domain: 'domain-data',
        data: {
            id: 11,//options.id
            page: 1 || 1,//options.page
            num: 10 // 默认 10 条
        },
        success(res) {
            cb && cb(undefined, res);
        },
        error(err) {
            cb && cb(err);
        }
    });
}

function updateHTML(tpl) {
    listConUl.html(tpl);
}

//Load(function(err, nomore){
//	if (err) return console.log(1);
//  if (nomore) return console.log(2);
//});

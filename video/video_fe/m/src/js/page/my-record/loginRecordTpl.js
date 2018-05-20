/**
 * [登录状态的列表]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
import timeLenFormat from 'util/timeLenFormat';
import liveStatus from 'util/liveStatus';
import formatDate from 'util/formatDate';

let $list = $('[data-node="mainList"]');
let $today = $list.find('[data-node="today"]');
let $before = $list.find('[data-node="before"]');

let hasToday = !!$today.length;
let hasBefore = !!$before.length;

const todayTag = `<div data-node="today" class="card-title">今天</div>`;
const beforeTag = `<div data-node="before" class="card-title">更早</div>`;

let todayTime = (function(){
	var date = new Date();
	date.setHours(0);
	date.setMinutes(0);
	date.setSeconds(0);
	date.setMilliseconds(0);
	return Math.floor(date.getTime()/1000);
})();

function loginListTpl(list){
	var tpl = '';
	
	list.forEach(function(v){
		if (!hasBefore) {
			if (parseInt(v.create_time) < todayTime ) {
				tpl += beforeTag;
				hasBefore = true;
			}
		}
		tpl += getItem(v);
	});

	return tpl;
}

function getItem(data){
	let vInfo = data.video_info;
	let vType = parseInt(vInfo.video_type);
	let href = ['s','v'][vType];
	let flagCls = '';
	// data.flag = vType == 0 ? '直播' : timeLenFormat(vInfo.length);
	if (vType == 0) {
		data.flag = liveStatus(vInfo.live_status);
		flagCls = 'live-flag';
	}else{
		data.flag = timeLenFormat(vInfo.length);
		flagCls = 'item-flag';
	}

	let tpl = `<a data-node="item" data-id="${data.website_id}" class="item" href="/${href}/${vInfo.id}.html">
				<div class="item-img">
					<img src="${vInfo.image}">
					<div class="${flagCls}">${data.flag}</div>
				</div>
				<div class="item-info">
					<h2>${vInfo.title}</h2>`;
		if (vType == 0) {
			tpl += `<p>${formatDate(vInfo.start_time*1000, 'yyyy-MM-dd hh:mm')}</p>`;
		}
		if(vInfo.status != 0){
			tpl += `<div class="over">
						<span class="offline">已下线</span>
						<em data-action="delOffline" class="del icon-27"></em>
					</div>`;
		}
					
		tpl += `</div></a>`;
	return tpl;
}

export default loginListTpl;
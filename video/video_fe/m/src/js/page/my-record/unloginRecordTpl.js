/**
 * [未登录状态的列表]
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
	let date = new Date();
	let y = date.getFullYear()+'';
	let m = date.getMonth()+1;
	let d = date.getDate();
	m = m < 10 ? '0'+m : m+'';
	d = d < 10 ? '0'+d : d+'';
	return parseInt(y + m + d);
})();

function unloginListTpl(list){
	var create_time = 0;
	var isToday;
	var tpl = '';
	
	list.forEach(function(v){		
		create_time = parseInt(v.create_time);
		isToday = create_time == todayTime;
		if (!hasToday) {
			if (!hasBefore && isToday) {
				tpl += todayTag;
				hasToday = true;
			}else{
				if (!hasBefore && !isToday) {
					tpl += beforeTag;
					hasBefore = true;
				}
			}
		}else{
			if (!hasBefore && !isToday) {
				tpl += beforeTag;
				hasBefore = true;
			}
		}
		tpl += getItem(v);
	});

	return tpl;
}

function getItem(data){
	let vType = parseInt(data.video_type);
	let href = ['s','v'][vType];
	let flagCls = '';
	// data.flag = vType == 0 ? '直播' : timeLenFormat(data.length);
	if (vType == 0) {
		data.flag = liveStatus(data.live_status);
		flagCls = 'live-flag';
	}else{
		data.flag = timeLenFormat(data.length);
		flagCls = 'item-flag';
	}

	let tpl = `<a data-node="item" data-id="${data.id}" class="item" href="/${href}/${data.id}.html">
				<div class="item-img">
					<img src="${data.image}">
					<div class="${flagCls}">${data.flag}</div>
				</div>
				<div class="item-info">
					<h2>${data.title}</h2>`;
		if (vType == 0) {
			tpl += `<p>${formatDate(data.start_time*1000, 'yyyy-MM-dd hh:mm')}</p>`;
		}
		if(data.status != 0){
			tpl += `<div class="over">
						<span class="offline">已下线</span>
						<em data-action="delOffline" class="del icon-27"></em>
					</div>`;
		}
		tpl += `</div></a>`;

	return tpl;
}

export default unloginListTpl;